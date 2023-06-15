import {ContractReceipt} from "ethers";
import {TransactionResult} from "icon-sdk-js";

export type Address = String;
export type TxReceipt = ContractReceipt | TransactionResult;
