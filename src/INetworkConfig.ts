import {IconService, Wallet} from 'icon-sdk-js';
import {Utils} from "./utils/Utils";
import {ethers} from "ethers";
const {IconWallet} = IconService;
import {JsonRpcProvider} from "@ethersproject/providers";
import {INetworkConfig} from "./models/interfaces/INetworkConfig";
import {Network} from "./models/enums/Network";


// load .env
require('dotenv').config({ path: "./.env"})

export function loadIconWallet(networkName: string): Wallet {
    const keystore = Utils.readFile(`keystore/${networkName}/operator.icx`);
    const keypass = Utils.readFile(`keystore/${networkName}/operator.pwd`)
    return IconWallet.loadKeystore(keystore, keypass, false);
}

export const NETWORK_CONFIG: Record<Network, INetworkConfig> = {
    [Network.icon]: {
        network: Network.icon,
        dAppScoreAddress: "cx83c0ea9de3dab8efa455b72a7a8b29ba9cf855f3",
        rpcUrl: "https://berlin.net.solidwallet.io/api/v3/icon_dex",
        xCallAddress: "cxf4958b242a264fc11d7d8d95f79035e35b21c1bb",
        signerWallet: loadIconWallet("icon")
    },
    [Network.eth2]: {
        network: Network.eth2,
        dAppScoreAddress: "0xFc696C383e9AF26dB2F221f0Ca680982e5cC8fB5",
        rpcUrl: "https://sepolia.infura.io/v3/ffbf8ebe228f4758ae82e175640275e0",
        xCallAddress: "0x9B68bd3a04Ff138CaFfFe6D96Bc330c699F34901",
        signerWallet: new ethers.Wallet(process.env.PRIVATE_KEY as string, new JsonRpcProvider(
            "https://sepolia.infura.io/v3/ffbf8ebe228f4758ae82e175640275e0",
            parseInt("0xaa36a7", 16)))
    },
    [Network.bsc]: {
        network: Network.bsc,
        dAppScoreAddress: "0x900a56CC3E50F6200ffC18F897cda39B04cFbdc3",
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
        xCallAddress: "0x6193c0b12116c4963594761d859571b9950a8686",
        signerWallet: new ethers.Wallet(process.env.PRIVATE_KEY as string, new JsonRpcProvider(
            "https://data-seed-prebsc-1-s1.binance.org:8545",
            parseInt("0x61", 16)))
    },
}
