import {Contract} from "./contract";
import {IconNetwork} from "./network";

export class DAppProxy extends Contract {
  constructor(iconNetwork: IconNetwork, address: string) {
    super(iconNetwork, address)
  }

  /**
   * @description Sends a call message to the contract on the destination chain.
   * @param to The BTP address of the callee on the destination chain
   * @param data The calldata specific to the target contract
   * @param rollback (Optional) The data for restoring the caller state when an error occurred
   * @param value (Optional) Value of ICX to be send
   * @return The serial number of the request
   */
  sendMessage(to: string, data: string, rollback?: string, value?: string) {
    const _params = rollback
      ? {_to: to, _data: data, _rollback: rollback}
      : {_to: to, _data: data}
    return this.invoke({
      method: 'sendMessage',
      value: value ? value : '0x0',
      params: _params
    })
  }
}
