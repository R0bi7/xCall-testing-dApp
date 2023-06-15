import {XCallService} from "./services/XCallService";
import {ethers} from "ethers";
import {Network} from "./models/enums/Network";

const xCallService = new XCallService();

/**
 * @description Main function is an entry point of application where testing scenarios should be defined
 */
async function main() {
    const abiCoder = new ethers.utils.AbiCoder();

    // EXAMPLE: icon to bsc no rollback
    // let message = abiCoder.encode([ "uint8", "bytes" ], [ 0, ethers.utils.toUtf8Bytes("Hello World") ]);
    // await xCallService.sendCallMessage(Network.icon, Network.bsc, message, true , true);

    // EXAMPLE: icon to bsc with rollback
    // let message = abiCoder.encode([ "uint8", "bytes" ], [ 0, ethers.utils.toUtf8Bytes("revertMessage") ]);
    // await xCallService.sendCallMessage(Network.icon, Network.bsc, message, true , true);

    // EXAMPLE: icon to bsc with concatenation on receiving end
    // let message = abiCoder.encode([ "uint8", "bytes" ], [ 1, ethers.utils.toUtf8Bytes("hello w") ]);
    // await xCallService.sendCallMessage(Network.icon, Network.bsc, message);

    // EXAMPLE: icon to bsc with multiple messages in single message
    // const stringArray = ["hello world 1", "hello world 2", "hello world 3"];
    // const encodedArray = ethers.utils.defaultAbiCoder.encode(["string[]"], [stringArray]);
    // let message = abiCoder.encode([ "uint8", "bytes" ], [ 2, encodedArray ]);
    // await xCallService.sendCallMessage(Network.icon, Network.bsc, message);
}

async function show_banner() {
    const banner = `
    ___       ___       ___       ___       ___   
   /\\__\\     /\\  \\     /\\  \\     /\\__\\     /\\__\\  
  |::L__L   /::\\  \\   /::\\  \\   /:/  /    /:/  /  
 /::::\\__\\ /:/\\:\\__\\ /::\\:\\__\\ /:/__/    /:/__/   
 \\;::;/__/ \\:\\ \\/__/ \\/\\::/  / \\:\\  \\    \\:\\  \\   
  |::|__|   \\:\\__\\     /:/  /   \\:\\__\\    \\:\\__\\  
   \\/__/     \\/__/     \\/__/     \\/__/     \\/__/  
`;
    console.log(banner);
}

show_banner().then(() => main())
