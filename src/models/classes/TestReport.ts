import fs from "fs";
import {Utils} from "../../utils/Utils";
import {INetworkConfig} from "../interfaces/INetworkConfig";

export class TestReport {
    srcChainConfig: INetworkConfig;
    dstChainConfig: INetworkConfig;
    processRollback: boolean;
    rollbackData: string | undefined;
    transcript: string[];
    startTime: string;
    sendMessageTxHash: string | undefined;
    sendMessageSerialNumber: string | undefined;
    requestId: string | undefined;
    executeCallTxHash: string | undefined;
    checkCallExecutedDone: boolean = false;
    checkResponseMessageDone: boolean = false;
    rollbackMessageSerialNumber: string | undefined;
    rollbackReceiptTxHash: string | undefined;
    verifyRollbackDataReceivedMessageDone: boolean = false;
    checkRollbackExecutedDone: boolean = false;
    exceptionMessage: string | undefined;

    constructor(
        srcChainConfig: INetworkConfig,
        dstChainConfig: INetworkConfig,
        processRollback: boolean,
        rollbackData: string | undefined) {
        this.srcChainConfig = srcChainConfig;
        this.dstChainConfig = dstChainConfig;
        this.processRollback = processRollback;
        this.rollbackData = rollbackData;
        this.startTime = Utils.getDateTime();
        this.transcript = [];

        this.saveTestReport();
    }

    public saveTestReport() {
        const fileName = `./src/test_reports/${this.srcChainConfig.network}_${this.dstChainConfig.network}_${this.startTime}.json`
        fs.writeFileSync(fileName, JSON.stringify(this, (key, value) => {
            if (key == "signerWallet") {
                return value.address;
            }

            return value;
        }, 4));
    }

    public saveSendMessageTxHash(sendMessageTxHash: string) {
        this.sendMessageTxHash = sendMessageTxHash;
        this.saveTestReport();
    }

    public saveExecuteCallTxHash(executeCallTxHash: string) {
        this.executeCallTxHash = executeCallTxHash;
        this.saveTestReport();
    }

    public saveRollbackReceiptTxHash(txHash: string) {
        this.rollbackReceiptTxHash = txHash;
        this.saveTestReport();
    }

    public saveSendMessageSerialNumber(sendMessageSerialNumber: string) {
        this.sendMessageSerialNumber = sendMessageSerialNumber;
        this.saveTestReport();
    }

    public saveRollbackMessageSerialNumber(rollbackMessageSerialNumber: string) {
        this.rollbackMessageSerialNumber = rollbackMessageSerialNumber;
        this.saveTestReport();
    }

    public saveRequestId(reqId: string) {
        this.requestId = reqId;
        this.saveTestReport();
    }

    public setCheckCallExecuted() {
        this.checkCallExecutedDone = true;
        this.saveTestReport();
    }

    public setCheckResponseMessage() {
        this.checkResponseMessageDone = true;
        this.saveTestReport();
    }

    public setVerifyRollbackDataReceivedMessageDone() {
        this.verifyRollbackDataReceivedMessageDone = true;
        this.saveTestReport();
    }

    public setCheckRollbackExecutedDone() {
        this.checkRollbackExecutedDone = true;
        this.saveTestReport();
    }

    public saveExceptionMessage(msg: string) {
        this.exceptionMessage = msg;
        this.saveTestReport();
    }

    public saveAndLogTranscriptMessage(msg: string) {
        const transcriptMessage = `${Utils.getDateTime()} ` + msg;
        this.transcript.push(transcriptMessage);
        console.log(transcriptMessage);

        this.saveTestReport();
    }
}
