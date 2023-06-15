import fs from "fs";
import {ethers} from "ethers";
import {TransactionResult} from "icon-sdk-js";
import {Network} from "../INetworkConfig";
import {TxReceipt} from "../models/types/IconTypes";

export abstract class Utils {
    public static readFile(path: string) {
        return fs.readFileSync(path).toString();
    }

    public static hexToString(data: string) {
        const hexArray = ethers.utils.arrayify(data);
        let msg = '';
        for (const element of hexArray) {
            msg += String.fromCharCode(element);
        }
        return msg;
    }

    public static sleep(millis: number) {
        return new Promise(resolve => setTimeout(resolve, millis));
    }

    public static constructBtpAddress(network: string, dapp: string) {
        return `btp://${network}/${dapp}`;
    }

    public static isIconChain(network: Network) {
        return network.includes('icon');
    }

    public static isEVMChain(network: Network) {
        return network.includes('hardhat') || network.includes('eth2');
    }

    public static extractTxHash(receipt: TxReceipt): string {
        if (receipt instanceof TransactionResult) {
            return receipt.txHash;
        } else {
            return receipt.transactionHash;
        }
    }

    public static getDateTime(): string {
        return new Date().toJSON().slice(0,16);
    }

}
