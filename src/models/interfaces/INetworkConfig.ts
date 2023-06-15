import {Network} from "../../INetworkConfig";

export interface INetworkConfig {
    network: Network,
    dAppScoreAddress: string;
    rpcUrl: string;
    xCallAddress: string;
    signerWallet: any;
}
