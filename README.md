<p align="center">
  <img 
    src="./icon_img.png" 
    alt="Icon logo">
</p>

# xCall testing dApp

This project contains simple xCall testing dApp written in Typescript. 

## Prerequisites

- Node.js v18 or greater
- Typescript v4 or greater
- ts-node for simple console execution

## Setup & Configuration

Run:
- Icon wallet keystore and password should be put in `/keystore/icon/operator.icx` and `/keystore/icon/operator.pwd`
- Evm wallet private key should be put in `.env` file at project root under `PRIVATE_KEY` variable
- `npm install` in root folder in order to download the dependencies in local `node_modules` folder
- if abi folder is changed execute `/usr/local/bin/npm run generate-types` (linux) to generate typechain types


## dApp

Application should be run by executing `ts-node src/dApp.ts` in project root.

Logic to be run lives inside `main` method of `dApp.ts`.
Mainly local `xCallService` is used to send messages where as behavior is defined by parameters given in.

## Test Reports

When dApp is run test reports are save in `./src/test_reports` directory.

Test report includes all relevant data to the execution as well as transcription of execution process.
