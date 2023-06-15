import {NETWORK_CONFIG} from "../INetworkConfig";
import {BigNumber} from "ethers";
import {EvmXCallService} from "./EvmXCallService";
import {IconXCallService} from "./IconXCallService";
import {TransactionResult} from "icon-sdk-js";
import {TestReport} from "../models/classes/TestReport";
import {Utils} from "../utils/Utils";
import {TxReceipt} from "../models/types/IconTypes";
import {INetworkConfig} from "../models/interfaces/INetworkConfig";
import {Network} from "../models/enums/Network";

export class XCallService {

    /**
     * @description Verify CallMessageSent event on source chain
     * @param srcChainConfig - Source chain configuration
     * @param receipt - Transaction receipt
     * @return Promise<BigNumber> - The serial number of the request
     */
    public async verifyCallMessageSent(
        srcChainConfig: INetworkConfig,
        receipt: TxReceipt
    ): Promise<BigNumber> {
        if (receipt instanceof TransactionResult) {
            return IconXCallService.verifyCallMessageSent(srcChainConfig, receipt);
        } else {
            return EvmXCallService.verifyCallMessageSent(srcChainConfig, receipt)
        }
    }

    /**
     * @description Verify CallMessageSent event on source chain
     * @param dstChainConfig - Destination chain configuration
     * @param receipt - Transaction receipt
     * @param reqId - Request ID
     * @param expectRevert - boolean flag indicating whether we expect revert or not
     * @return Promise<void>
     */
    public async checkCallExecuted(
        dstChainConfig: INetworkConfig,
        receipt: TxReceipt,
        reqId: BigNumber,
        expectRevert: boolean
    ): Promise<void> {
        if (receipt instanceof TransactionResult) {
            return IconXCallService.checkCallExecuted(dstChainConfig, receipt, reqId, expectRevert);

        } else {
            return EvmXCallService.checkCallExecuted(dstChainConfig, receipt, reqId, expectRevert);
        }
    }

    /**
     * @description Check RollBackExecuted event on source chain
     * @param srcChainConfig - Source chain configuration
     * @param receipt - Transaction receipt
     * @param sn - Serial number of request
     * @return Promise<void>
     */
    public async checkRollbackExecuted(
        srcChainConfig: INetworkConfig,
        receipt: TxReceipt,
        sn: BigNumber
    ): Promise<void> {
        if (receipt instanceof TransactionResult) {
            return IconXCallService.checkRollbackExecuted(srcChainConfig, receipt, sn);
        } else {
            return EvmXCallService.checkRollbackExecuted(srcChainConfig, receipt, sn);
        }
    }

    /**
     * @description Send message from the source chain to the destination chain
     * @param srcChainConfig - Source chain config
     * @param dstChainConfig - Destination chain config
     * @param message - Message to be sent
     * @param rollback - Rollback data
     * @return Promise<TxReceipt> - Transaction receipt
     */
    public async sendMessage(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        message: string,
        rollback: string | undefined = undefined
    ): Promise<TxReceipt> {
        if (Utils.isIconChain(srcChainConfig.network)) {
            return IconXCallService.sendMessage(srcChainConfig, dstChainConfig, message, rollback);
        } else {
            return EvmXCallService.sendMessage(srcChainConfig, dstChainConfig, message, rollback);
        }
    }

    /**
     * @description Check CallMessage event on the destination chain
     * @param srcChainConfig - Source chain config
     * @param dstChainConfig - Destination chain config
     * @param sn - Serial number of request
     * @return Promise<{ reqId: BigNumber, blockHeight: number }> - request ID and block height of event
     */
    public async checkCallMessage(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        sn: BigNumber
    ): Promise<{ reqId: BigNumber, blockHeight: number }> {
        if (Utils.isIconChain(dstChainConfig.network)) {
            return IconXCallService.checkCallMessage(srcChainConfig, dstChainConfig, sn);
        } else {
            return EvmXCallService.checkCallMessage(srcChainConfig, dstChainConfig, sn);
        }
    }

    /**
     * @description Invoke executeCall method on the destination chain
     * @param dstChainConfig - Destination chain config
     * @param reqId - Request ID
     * @return Promise<TxReceipt> - Transaction receipt
     */
    public async invokeExecuteCall(
        dstChainConfig: INetworkConfig,
        reqId: BigNumber
    ): Promise<TxReceipt> {
        if (Utils.isIconChain(dstChainConfig.network)) {
            return IconXCallService.invokeExecuteCall(dstChainConfig, reqId);
        } else {
            return EvmXCallService.invokeExecuteCall(dstChainConfig, reqId);
        }
    }

    /**
     * @description Check ResponseMessage event on the source chain
     * @param srcChainConfig - Source chain config
     * @param sn - Serial number of request
     * @param sendMessageReceipt - Transaction receipt of send message call
     * @param expectRevert - boolean flag indicating whether we expect revert or not
     * @return Promise<void>
     */
    public async checkResponseMessage(
        srcChainConfig: INetworkConfig,
        sn: BigNumber,
        sendMessageReceipt: TxReceipt,
        expectRevert: boolean
    ): Promise<void> {
        if (sendMessageReceipt instanceof TransactionResult) {
            return IconXCallService.checkResponseMessage(srcChainConfig, sn, sendMessageReceipt, expectRevert);
        } else {
            return EvmXCallService.checkResponseMessage(srcChainConfig, sn, sendMessageReceipt, expectRevert);
        }
    }

    /**
     * @description Check RollbackMessage event on the source chain
     * @param srcChainConfig - Source chain config
     * @param sendMessageReceipt - Transaction receipt of send message call
     * @return Promise<BigNumber> - Serial number of request
     */
    public async checkRollbackMessage(
        srcChainConfig: INetworkConfig,
        sendMessageReceipt: TxReceipt
    ): Promise<BigNumber> {
        if (sendMessageReceipt instanceof TransactionResult) {
            return IconXCallService.checkRollbackMessage(srcChainConfig, sendMessageReceipt);
        } else {
            return EvmXCallService.checkRollbackMessage(srcChainConfig, sendMessageReceipt);
        }
    }

    /**
     * @description Invoke executeRollback method on the source chain
     * @param srcChainConfig - Source chain config
     * @param sn - Serial number of request
     * @return Promise<TxReceipt> - Transaction receipt
     */
    public async invokeExecuteRollback(
        srcChainConfig: INetworkConfig,
        sn: BigNumber
    ): Promise<TxReceipt> {
        if (Utils.isIconChain(srcChainConfig.network)) {
            return IconXCallService.invokeExecuteRollback(srcChainConfig, sn);
        } else {
            return EvmXCallService.invokeExecuteRollback(srcChainConfig, sn);
        }
    }

    /**
     * @description Invoke executeRollback method on the source chain
     * @param srcChainConfig - Source chain config
     * @param receipt - Execute rollback transaction receipt
     * @param rollback - Rollback message
     * @return Promise<void>
     */
    public async verifyRollbackDataReceivedMessage(
        srcChainConfig: INetworkConfig,
        receipt: TxReceipt,
        rollback: string | undefined
    ): Promise<void> {
        if (receipt instanceof TransactionResult) {
            return IconXCallService.verifyRollbackDataReceivedMessage(srcChainConfig, receipt, rollback);
        } else {
            return EvmXCallService.verifyRollbackDataReceivedMessage(srcChainConfig, receipt, rollback);
        }
    }

    /**
     * @description Send call message from source to destination chain
     * @param src - Source chain/network
     * @param dst - Destination chain/network
     * @param message - Message to be sent
     * @param processRollback - Boolean flag indicating whether to process rollback or not
     * @param expectRevert - Boolean flag indicating whether to expect revert or not
     */
    public async sendCallMessage(
        src: Network,
        dst: Network,
        message: string,
        processRollback = false,
        expectRevert = false
    ) {
        let step = 1;
        const srcChainConfig = NETWORK_CONFIG[src];
        const dstChainConfig = NETWORK_CONFIG[dst];

        const rollbackData = processRollback ? `ThisIsRollbackMessage_${srcChainConfig.network}_${dstChainConfig.network}` : undefined;

        // init test report
        const testReport = new TestReport(srcChainConfig, dstChainConfig, processRollback, rollbackData);

        try {
            testReport.saveAndLogTranscriptMessage(`[${step++}] sending message '${message}' from ${srcChainConfig.network} to ${dstChainConfig.network} chain..`);

            // send message and return transaction result
            const sendMessageReceipt: TxReceipt = await this.sendMessage(srcChainConfig, dstChainConfig, message, rollbackData);

            // save txHash in TestReport
            testReport.saveSendMessageTxHash(Utils.extractTxHash(sendMessageReceipt));

            testReport.saveAndLogTranscriptMessage(`[${step++}] verify CallMessageSent event on ${srcChainConfig.network} chain..`);

            // use transaction result to filter out CallMessageSent event and return the serial number
            let sn: BigNumber = await this.verifyCallMessageSent(srcChainConfig, sendMessageReceipt);

            // save send message serial number in TestReport
            testReport.saveSendMessageSerialNumber(sn.toString());

            testReport.saveAndLogTranscriptMessage(`[${step++}] check CallMessage event on ${dstChainConfig.network} chain..`);

            // use serial number to check for CallMessage Event in xCall Smart Contract on destination chain
            const { reqId, blockHeight } = await this.checkCallMessage(srcChainConfig, dstChainConfig, sn);

            testReport.saveAndLogTranscriptMessage(`reqId = ${reqId}`);

            // save send message request id in TestReport
            testReport.saveRequestId(reqId.toString());

            testReport.saveAndLogTranscriptMessage(`[${step++}] invoke executeCall with reqId=${reqId} on ${dstChainConfig.network} chain..`);

            const executeCallReceipt: TxReceipt = await this.invokeExecuteCall(dstChainConfig, reqId);

            // save execute call tx hash in TestReport
            testReport.saveExecuteCallTxHash(Utils.extractTxHash(executeCallReceipt));

            testReport.saveAndLogTranscriptMessage(`[${step++}] check CallExecuted event on ${dstChainConfig.network} chain`);

            await this.checkCallExecuted(dstChainConfig, executeCallReceipt, reqId, expectRevert);

            // save boolean flag for check call executed
            testReport.setCheckCallExecuted();

            if (processRollback) {
                // ResponseMessage contain information about rollback

                testReport.saveAndLogTranscriptMessage(`[${step++}] check ResponseMessage event on ${srcChainConfig.network} chain`);

                await this.checkResponseMessage(srcChainConfig, sn, sendMessageReceipt, expectRevert);

                // save boolean flag for check response message
                testReport.setCheckResponseMessage();

                if (expectRevert) {
                    testReport.saveAndLogTranscriptMessage(`[${step++}] check RollbackMessage event on ${srcChainConfig.network} chain`);

                    sn = await this.checkRollbackMessage(srcChainConfig, sendMessageReceipt);

                    // save rollback message serial number in TestReport
                    testReport.saveRollbackMessageSerialNumber(sn.toString());

                    testReport.saveAndLogTranscriptMessage(`[${step++}] invoke executeRollback with sn=${sn} on ${srcChainConfig.network} chain`);

                    const executeRollbackReceipt: TxReceipt = await this.invokeExecuteRollback(srcChainConfig, sn);

                    // save rollback receipt tx hash
                    testReport.saveRollbackReceiptTxHash(Utils.extractTxHash(executeRollbackReceipt));

                    testReport.saveAndLogTranscriptMessage(`[${step++}] verify rollback data received message on ${srcChainConfig.network} chain`);

                    await this.verifyRollbackDataReceivedMessage(srcChainConfig, executeRollbackReceipt, rollbackData);

                    // save boolean flag for rollback data received message
                    testReport.setVerifyRollbackDataReceivedMessageDone();

                    testReport.saveAndLogTranscriptMessage(`[${step++}] check RollbackExecuted event on ${srcChainConfig.network} chain`);

                    await this.checkRollbackExecuted(srcChainConfig, executeRollbackReceipt, sn);

                    // save boolean flag for rollback executed
                    testReport.setCheckRollbackExecutedDone();
                }
            }
        } catch (e: any) {
            testReport.saveExceptionMessage(e.message ?? "Unknown error");
            throw e;
        }

        testReport.saveAndLogTranscriptMessage("Successful execution!")
    }
}
