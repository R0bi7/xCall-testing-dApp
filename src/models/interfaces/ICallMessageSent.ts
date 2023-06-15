import {Address} from "../types/IconTypes";
import {BigNumber} from "ethers";

/**
 * Interface of CallMessageSent Event of xCall Service
 * @property _from  The chain-specific address of the caller
 * @property _to    The BTP address of the callee on the destination chain
 * @property _sn    The serial number of the request
 * @property _nsn   The network serial number of the BTP message
 */
export interface ICallMessageSent {
    _from: Address;
    _to: string;
    _sn: BigNumber;
    _nsn: BigNumber;
}
