import fs from 'fs';
import {IconService, Wallet} from 'icon-sdk-js';
import {loadIconWallet} from "../INetworkConfig";
import {INetworkConfig} from "../models/interfaces/INetworkConfig";

const {IconWallet, HttpProvider} = IconService;

export class IconNetwork {
  iconService: IconService;
  nid: number;
  wallet: Wallet;
  private static instances: Map<string, IconNetwork> = new Map();

  constructor(_iconService: IconService, _nid: number, _wallet: Wallet) {
    this.iconService = _iconService;
    this.nid = _nid;
    this.wallet = _wallet;
  }

  public static getNetwork(config: INetworkConfig) {
    const entry = this.instances.get(config.network);

    if (entry) {
      return entry;
    }

    const httpProvider = new HttpProvider(config.rpcUrl);
    const iconService = new IconService(httpProvider);
    const networkName = config.network.split(".")[1];
    const wallet = loadIconWallet(networkName);
    const nid = parseInt(config.network.split(".")[0], 16);
    const network = new this(iconService, nid, wallet);
    this.instances.set(config.network, network);
    return network;
  }

  async getTotalSupply() {
    return this.iconService.getTotalSupply().execute();
  }

  async getLastBlock() {
    return this.iconService.getLastBlock().execute();
  }

  async getBTPNetworkInfo(nid: string) {
    return this.iconService.getBTPNetworkInfo(nid).execute();
  }

  async getBTPHeader(nid: string, height: string) {
    return this.iconService.getBTPHeader(nid, height).execute();
  }
}
