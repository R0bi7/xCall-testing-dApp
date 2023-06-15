import {BigNumber} from "ethers";
import {DAppProxy, IconNetwork, XCall} from "../icon";
import IconService, {TransactionResult} from "icon-sdk-js";
import {Utils} from "../utils/Utils";
import {ICallMessageSent} from "../models/interfaces/ICallMessageSent";
import {INetworkConfig} from "../models/interfaces/INetworkConfig";
const {IconConverter} = IconService;

export class IconXCallService {

    public static async checkRollbackExecuted(srcChainConfig: INetworkConfig, receipt: TransactionResult, sn: BigNumber) {
        let event;

        const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
        const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);
        const logs = xcallSrc.filterEvent(receipt.eventLogs, "RollbackExecuted(int,int,str)", xcallSrc.address);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackExecuted"`);
        }
        console.log(logs);
        const indexed = logs[0].indexed || [];
        const data = logs[0].data || [];
        event = {
            _sn: BigNumber.from(indexed[1]),
            _code: BigNumber.from(data[0]),
            _msg: data[1]
        }

        if (!sn.eq(event._sn)) {
            throw new Error(`DApp: received serial number (${event._sn}) is different from the sent one (${sn})`);
        }
        if (!event._code.isZero()) {
            throw new Error(`DApp: not the expected execution result`);
        }
    }
    public static async verifyCallMessageSent(srcChainConfig: INetworkConfig, receipt: TransactionResult): Promise<BigNumber> {
        const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
        const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);
        const logs = xcallSrc.filterEvent(receipt.eventLogs,
            'CallMessageSent(Address,str,int,int)', xcallSrc.address);

        if (logs.length == 0) {
            throw new Error(`[verifyCallMessageSent] DApp: could not find event: "CallMessageSent"`);
        }

        const indexed = logs[0].indexed || [];
        const data = logs[0].data || [];
        const event: ICallMessageSent = {
            _from: indexed[1],
            _to: indexed[2],
            _sn: BigNumber.from(indexed[3]),
            _nsn: BigNumber.from(data[0])
        };

        console.log(`[verifyCallMessageSent] The serial number of the request = ${event._sn}`);
        return event._sn;
    }

    public static async checkCallExecuted(dstChainConfig: INetworkConfig, receipt: TransactionResult, reqId: BigNumber, expectRevert: boolean) {
        const iconNetwork = IconNetwork.getNetwork(dstChainConfig);
        const xcallDst = new XCall(iconNetwork, dstChainConfig.xCallAddress);
        const logs = xcallDst.filterEvent(receipt.eventLogs,'CallExecuted(int,int,str)', xcallDst.address);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "CallExecuted"`);
        }
        console.log(logs);
        const indexed = logs[0].indexed || [];
        const data = logs[0].data || [];
        const event = {
            _reqId: BigNumber.from(indexed[1]),
            _code: BigNumber.from(data[0]),
            _msg: data[1]
        }

        console.log(`_reqId = `, indexed[1]);
        console.log(`_code = `, data[0]);
        console.log(`_msg = `, data[1]);

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

    public static async invokeExecuteCall(dstChainConfig: INetworkConfig, reqId: BigNumber): Promise<TransactionResult> {
        const iconNetwork = IconNetwork.getNetwork(dstChainConfig);
        const xcallDst = new XCall(iconNetwork, dstChainConfig.xCallAddress);

        return await xcallDst.executeCall(reqId.toHexString())
            .then((txHash) => xcallDst.getTxResult(txHash))
            .then((receipt) => {
                if (receipt.status != 1) {
                    throw new Error(`DApp: failed to executeCall: ${receipt.txHash}`);
                }
                return receipt;
            });
    }

    public static async checkResponseMessage(
        srcChainConfig: INetworkConfig,
        sn: BigNumber,
        sendMessageReceipt: TransactionResult,
        expectRevert: boolean
    ) {
        let event;

        const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
        const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);
        const { events, height } = await xcallSrc.waitEvent("ResponseMessage(int,int,str)",
            sendMessageReceipt.blockHeight);

        if (events.length == 0) {
            throw new Error(`DApp: could not find event: "ResponseMessage"`);
        }

        const indexed = events[0].indexed || [];
        const data = events[0].data || [];
        event = {
            _sn: BigNumber.from(indexed[1]),
            _code: BigNumber.from(data[0]),
            _msg: data[1]
        }

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

    public static async checkRollbackMessage(srcChainConfig: INetworkConfig, sendMessageReceipt: TransactionResult) {
        const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
        const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);
        const { events, height } = await xcallSrc.waitEvent("RollbackMessage(int)", sendMessageReceipt.blockHeight);

        if (events.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackMessage"`);
        }

        console.log(events[0]);
        const indexed = events[0].indexed || [];
        return BigNumber.from(indexed[1]);
    }

    public static async sendMessage(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        message: string,
        rollback: string | undefined = undefined
    ): Promise<TransactionResult> {
        try {
            const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
            const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);

            // try fetching fee
            const fee = await xcallSrc.getFee(dstChainConfig.network, rollback != undefined);
            console.log('[sendMessage] fee = ' + Number.parseInt(fee, 16) / 1e18);

            const dappSrc = new DAppProxy(iconNetwork, srcChainConfig.dAppScoreAddress);
            const to = Utils.constructBtpAddress(dstChainConfig.network, dstChainConfig.dAppScoreAddress);
            const data = IconConverter.toHex(message);
            const rbData = rollback ? IconConverter.toHex(rollback) : undefined;

            // send message
            console.log(`[sendMessage] Sending message '${message}' from ${srcChainConfig.network} to ${dstChainConfig.network}...`);
            return await dappSrc.sendMessage(to, data, rbData, fee)
                .then((txHash) => dappSrc.getTxResult(txHash))
                .then((receipt) => {
                    if (receipt.status != 1) {
                        throw new Error(`[sendMessage] DApp: failed to sendMessage: ${receipt.txHash}`);
                    }
                    return receipt;
                }).finally(() => console.log("[sendMessage] sendMessageFromIcon finished.."));
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
        const iconNetwork = IconNetwork.getNetwork(dstChainConfig);
        const xcallDst = new XCall(iconNetwork, dstChainConfig.xCallAddress);
        const { events, height } = await xcallDst.waitEvent("CallMessage(str,str,int,int)");

        if (events.length == 0) {
            throw new Error(`[checkIconCallMessage] DApp: could not find event: "CallMessage"`);
        }

        const indexed = events[0].indexed || [];
        const data = events[0].data || [];
        const event = {
            _from: indexed[1],
            _to: indexed[2],
            _sn: BigNumber.from(indexed[3]),
            _reqId: BigNumber.from(data[0])
        };
        if (!sn.eq(event._sn)) {
            throw new Error(`[checkIconCallMessage] DApp: serial number mismatch (${sn} != ${event._sn})`);
        }

        return { reqId: event._reqId, blockHeight: height };
    }

    public static async invokeExecuteRollback(srcChainConfig: INetworkConfig, sn: BigNumber): Promise<TransactionResult> {
        const iconNetwork = IconNetwork.getNetwork(srcChainConfig);
        const xcallSrc = new XCall(iconNetwork, srcChainConfig.xCallAddress);
        return await xcallSrc.executeRollback(sn.toHexString())
            .then((txHash) => xcallSrc.getTxResult(txHash))
            .then((receipt) => {
                if (receipt.status != 1) {
                    throw new Error(`DApp: failed to executeRollback: ${receipt.txHash}`);
                }
                return receipt;
            });
    }

    public static async verifyReceivedMessage(dstChainConfig: INetworkConfig, receipt: TransactionResult, msg: string) {
        let event;

        const iconNetwork = IconNetwork.getNetwork(dstChainConfig);
        const dappDst = new DAppProxy(iconNetwork, dstChainConfig.dAppScoreAddress);
        const logs = dappDst.filterEvent(receipt.eventLogs,'MessageReceived(str,bytes)', dappDst.address);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "MessageReceived"`);
        }
        console.log(logs);
        const data = logs[0].data || [];
        event = {_from: data[0], _data: data[1]}

        const receivedMsg = Utils.hexToString(event._data)
        console.log(`From: ${event._from}`);
        console.log(`Data: ${event._data}`);
        console.log(`Msg: ${receivedMsg}`);
        if (msg !== receivedMsg) {
            throw new Error(`DApp: received message is different from the sent message`);
        }
    }

    public static async verifyRollbackDataReceivedMessage(srcChain: INetworkConfig, receipt: TransactionResult, rollback: string | undefined) {
        let event;

        const iconNetwork = IconNetwork.getNetwork(srcChain);
        const dappSrc = new DAppProxy(iconNetwork, srcChain.dAppScoreAddress);
        const logs = dappSrc.filterEvent(receipt.eventLogs,"RollbackDataReceived(str,int,bytes)", dappSrc.address);
        if (logs.length == 0) {
            throw new Error(`DApp: could not find event: "RollbackDataReceived"`);
        }
        console.log(logs)
        const data = logs[0].data || [];
        event = {_from: data[0], _ssn: data[1], _rollback: data[2]}

        const receivedRollback = Utils.hexToString(event._rollback)
        console.log(`From: ${event._from}`);
        console.log(`Ssn: ${event._ssn}`);
        console.log(`Data: ${event._rollback}`);
        console.log(`Rollback: ${receivedRollback}`);
        if (rollback !== receivedRollback) {
            throw new Error(`DApp: received rollback is different from the sent data`);
        }
    }
}
