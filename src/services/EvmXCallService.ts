import {BaseContract, BigNumber, ContractReceipt, ethers} from "ethers";
import {HelloWorldAbi__factory, XCallAbi__factory} from "../types/ethers-contracts";
import {Utils} from "../utils/Utils";
import {TypedEvent, TypedEventFilter} from "../types/ethers-contracts/common";
import {MessageReceivedEvent} from "../types/ethers-contracts/HelloWorldAbi";
import IconService, {TransactionResult} from "icon-sdk-js";
import {INetworkConfig} from "../models/interfaces/INetworkConfig";
const {IconConverter} = IconService;

export abstract class EvmXCallService {

    public static async checkRollbackExecuted(srcChainConfig: INetworkConfig, receipt: ContractReceipt, sn: BigNumber) {
        let event;

        const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
        const logs = this.filterEvent(xcallSrc, xcallSrc.filters.RollbackExecuted(), receipt);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackExecuted"`);
        }
        console.log(logs)
        event = logs[0].args;

        if (!sn.eq(event._sn)) {
            throw new Error(`DApp: received serial number (${event._sn}) is different from the sent one (${sn})`);
        }
        if (!event._code.isZero()) {
            throw new Error(`DApp: not the expected execution result`);
        }

        if (!sn.eq(event._sn)) {
            throw new Error(`DApp: received serial number (${event._sn}) is different from the sent one (${sn})`);
        }
        if (!event._code.isZero()) {
            throw new Error(`DApp: not the expected execution result`);
        }
    }

    public static async verifyCallMessageSent(srcChainConfig: INetworkConfig, receipt: ContractReceipt): Promise<BigNumber> {
        const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
        const logs = EvmXCallService.filterEvent(xcallSrc, xcallSrc.filters.CallMessageSent(), receipt);

        if (logs.length == 0) {
            throw new Error(`[verifyEvmCallMessageSent] DApp: could not find event: "CallMessageSent"`);
        }
        console.log(logs);
        const event = logs[0].args;

        console.log(`[verifyCallMessageSent] The serial number of the request = ${event._sn}`);
        return event._sn;
    }

    public static async checkCallExecuted(dstChainConfig: INetworkConfig, receipt: ContractReceipt, reqId: BigNumber, expectRevert: boolean) {
        const xcallDst = XCallAbi__factory.connect(dstChainConfig.xCallAddress, dstChainConfig.signerWallet);
        const logs = this.filterEvent(xcallDst, xcallDst.filters.CallExecuted(), receipt);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "CallExecuted"`);
        }

        const event = logs[0].args;

        console.log(`_reqId = `, event._reqId);
        console.log(`_code = `, event._code);

        if (!reqId.eq(event._reqId)) {
            throw new Error(`[checkCallExecuted] DApp: reqId miss match with found event!`);
        }

        if (expectRevert && event._code.isZero()) {
            throw new Error(`[checkCallExecuted] DApp: expectRevert set to true but event._code is ZERO!`);
        }

        if (!expectRevert && !event._code.isZero()) {
            throw new Error(`[checkCallExecuted] DApp: expectRevert set to false but event._code is non ZERO (unhandled error?)!!`);
        }
    }

    public static async invokeExecuteCall(dstChainConfig: INetworkConfig, reqId: BigNumber): Promise<ethers.ContractReceipt> {
        const xcallDst = XCallAbi__factory.connect(dstChainConfig.xCallAddress, dstChainConfig.signerWallet);

        return await xcallDst.executeCall(reqId, { gasLimit: 1500000 }) // TODO handle gas limit properly
            .then((tx) => tx.wait(1))
            .then((receipt) => {
                if (receipt.status != 1) {
                    throw new Error(`DApp: failed to executeCall: ${receipt.transactionHash}`);
                }
                return receipt;
            })
    }

    public static async invokeExecuteRollback(srcChainConfig: INetworkConfig, sn: BigNumber): Promise<ContractReceipt> {
        const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
        return await xcallSrc.executeRollback(sn, {gasLimit: 1500000}) // TODO handle gas limit properly
            .then((tx) => tx.wait(1))
            .then((receipt) => {
                if (receipt.status != 1) {
                    throw new Error(`DApp: failed to executeRollback: ${receipt.transactionHash}`);
                }
                return receipt;
            });
    }

    public static async sendMessage(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        message: string,
        rollback: string | undefined = undefined
    ): Promise<ContractReceipt> {
        try {
            const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
            // try fetching fee
            const fee = await xcallSrc.getFee(dstChainConfig.network, rollback != undefined);
            console.log('[sendMessageFromEvm] fee = ' + fee);

            const dappSrc = HelloWorldAbi__factory.connect(srcChainConfig.dAppScoreAddress, srcChainConfig.signerWallet);
            const to = Utils.constructBtpAddress(dstChainConfig.network, dstChainConfig.dAppScoreAddress);
            const data = IconConverter.toHex(message);
            const rbData = rollback ? IconConverter.toHex(rollback) : "0x";

            return await dappSrc.sendMessage(to, data, rbData, {value: fee})
                .then((tx) => tx.wait(1))
                .then((receipt) => {
                    if (receipt.status != 1) {
                        throw new Error(`[sendMessageFromEvm] DApp: failed to sendMessage: ${receipt.transactionHash}`);
                    }
                    return receipt;
                })
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    public static async checkCallMessage(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        sn: BigNumber
    ): Promise<{ reqId: BigNumber, blockHeight: number }> {
        const xcallDst = XCallAbi__factory.connect(dstChainConfig.xCallAddress, dstChainConfig.signerWallet);

        const filterCM = xcallDst.filters.CallMessage(
            Utils.constructBtpAddress(srcChainConfig.network, srcChainConfig.dAppScoreAddress),
            dstChainConfig.dAppScoreAddress,
            sn
        );

        const { events, height } = await this.waitEvent(xcallDst, filterCM);

        if (events.length == 0) {
            throw new Error(`DApp: could not find event: "CallMessage"`);
        }

        const reqSn = events[0].args._sn

        if (!sn.eq(reqSn)) {
            throw new Error(`DApp: serial number mismatch (${sn} != ${reqSn})`);
        }

        console.log(`CallMessage event found, returning reqId..`);

        return { reqId: events[0].args._reqId, blockHeight: height};
    }

    public static async verifyReceivedMessage(dstChainConfig: INetworkConfig, receipt: ContractReceipt, msg: string): Promise<void> {
        let event;

        const dappDst = HelloWorldAbi__factory.connect(dstChainConfig.dAppScoreAddress, dstChainConfig.signerWallet);

        const logs: MessageReceivedEvent[] = this.filterEvent(dappDst, dappDst.filters.MessageReceived(), receipt);

        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "MessageReceived"`);
        }

        console.log(logs);
        event = logs[0].args;

        const receivedMsg = Utils.hexToString(event._data)
        console.log(`From: ${event._from}`);
        console.log(`Data: ${event._data}`);
        console.log(`Msg: ${receivedMsg}`);
        if (msg !== receivedMsg) {
            throw new Error(`DApp: received message is different from the sent message`);
        }
    }

    public static async verifyRollbackDataReceivedMessage(srcChainConfig: INetworkConfig, receipt: ContractReceipt, rollback: string | undefined) {
        let event;

        const dappSrc = HelloWorldAbi__factory.connect(srcChainConfig.dAppScoreAddress, srcChainConfig.signerWallet);
        const logs = this.filterEvent(dappSrc, dappSrc.filters.RollbackDataReceived(), receipt);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackDataReceived"`);
        }
        console.log(logs)
        event = logs[0].args;

        const receivedRollback = Utils.hexToString(event._rollback)
        console.log(`From: ${event._from}`);
        console.log(`Ssn: ${event._ssn}`);
        console.log(`Data: ${event._rollback}`);
        console.log(`Rollback: ${receivedRollback}`);
        if (rollback !== receivedRollback) {
            throw new Error(`DApp: received rollback is different from the sent data`);
        }
    }

    public static async checkResponseMessage(
        srcChainConfig: INetworkConfig,
        sn: BigNumber,
        sendMessageReceipt: ContractReceipt,
        expectRevert: boolean
    ) {
        let event;

        const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
        const { events, height } = await this.waitEvent(xcallSrc,
            xcallSrc.filters.ResponseMessage(), sendMessageReceipt.blockNumber);

        if (events.length == 0) {
            throw new Error(`DApp: could not find event: "ResponseMessage"`);
        }
        console.log(events)
        event = events[0].args;

        if (!sn.eq(event._sn)) {
            throw new Error(`[checkResponseMessage] DApp: received serial number (${event._sn}) is different from the sent one (${sn})`);
        }

        if (expectRevert && event._code.isZero()) {
            throw new Error(`[checkResponseMessage] DApp: expectRevert set to true but event._code is ZERO!`);
        }

        if (!expectRevert && !event._code.isZero()) {
            throw new Error(`[checkResponseMessage] DApp: expectRevert set to false but event._code is non ZERO (unhandled error?)!!`);
        }
    }

    public static async checkRollbackMessage(srcChainConfig: INetworkConfig, sendMessageReceipt: ContractReceipt) {
        const xcallSrc = XCallAbi__factory.connect(srcChainConfig.xCallAddress, srcChainConfig.signerWallet);
        const { events, height } = await this.waitEvent(xcallSrc,
            xcallSrc.filters.RollbackMessage(), sendMessageReceipt.blockNumber);

        if (events.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackMessage"`);
        }
        console.log(events[0]);
        return events[0].args._sn;
    }

    public async waitEvent<TEvent extends TypedEvent>(ctr : BaseContract, filter: TypedEventFilter<TEvent>) : Promise<Array<TEvent>> {
        let height = await ctr.provider.getBlockNumber();
        let next = height + 1;
        while (true) {
            for (;height < next;height++){
                const events = await ctr.queryFilter(filter, height);
                if (events.length > 0) {
                    return events as Array<TEvent>;
                }
            }
            await Utils.sleep(1000);
            next = await ctr.provider.getBlockNumber() + 1;
        }
    }

    public static filterEvent<TEvent extends TypedEvent>(
        ctr : BaseContract,
        filter: TypedEventFilter<TEvent>,
        receipt: ContractReceipt) : Array<TEvent> {
        const inf = ctr.interface;
        const address = ctr.address;
        const topics = filter.topics || [];
        if (receipt.events && typeof topics[0] === "string") {
            const fragment = inf.getEvent(topics[0]);
            return receipt.events
                .filter((evt) => {
                    if (evt.address == address) {
                        return topics.every((v, i) => {
                            if (!v) {
                                return true
                            } else if (typeof v === "string") {
                                return v == evt.topics[i]
                            } else {
                                return v.includes(evt.topics[i])
                            }
                        })
                    }
                    return false
                })
                .map((evt) => {
                    return { args : inf.decodeEventLog(fragment, evt.data, evt.topics) } as TEvent
                });
        }
        return [];
    }

    public static async waitEvent<TEvent extends TypedEvent>(
        ctr : BaseContract,
        filter: TypedEventFilter<TEvent>,
        startBlockHeight?: number,
    ) : Promise<{ events: Array<TEvent>, height: number }> {
        let height = startBlockHeight ? startBlockHeight: await ctr.provider.getBlockNumber();
        let next = height + 1;
        while (true) {
            for (;height < next;height++){
                const events = await ctr.queryFilter(filter, height);
                if (events.length > 0) {
                    return { events: (events as Array<TEvent>), height};
                }
            }
            await Utils.sleep(1000);
            next = await ctr.provider.getBlockNumber() + 1;
        }
    }
}
