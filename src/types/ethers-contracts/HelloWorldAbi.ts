/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "./common";

export interface HelloWorldAbiInterface extends utils.Interface {
  functions: {
    "handleCallMessage(string,bytes)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "sendMessage(string,bytes,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "handleCallMessage" | "initialize" | "sendMessage"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "handleCallMessage",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "sendMessage",
    values: [string, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "handleCallMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendMessage",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "MessageReceived(string,bytes)": EventFragment;
    "RollbackDataReceived(string,uint256,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MessageReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RollbackDataReceived"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface MessageReceivedEventObject {
  _from: string;
  _data: string;
}
export type MessageReceivedEvent = TypedEvent<
  [string, string],
  MessageReceivedEventObject
>;

export type MessageReceivedEventFilter = TypedEventFilter<MessageReceivedEvent>;

export interface RollbackDataReceivedEventObject {
  _from: string;
  _ssn: BigNumber;
  _rollback: string;
}
export type RollbackDataReceivedEvent = TypedEvent<
  [string, BigNumber, string],
  RollbackDataReceivedEventObject
>;

export type RollbackDataReceivedEventFilter =
  TypedEventFilter<RollbackDataReceivedEvent>;

export interface HelloWorldAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: HelloWorldAbiInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    handleCallMessage(
      _from: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    initialize(
      _callService: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    sendMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  handleCallMessage(
    _from: string,
    _data: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  initialize(
    _callService: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sendMessage(
    _to: string,
    _data: BytesLike,
    _rollback: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    handleCallMessage(
      _from: string,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(_callService: string, overrides?: CallOverrides): Promise<void>;

    sendMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "MessageReceived(string,bytes)"(
      _from?: null,
      _data?: null
    ): MessageReceivedEventFilter;
    MessageReceived(_from?: null, _data?: null): MessageReceivedEventFilter;

    "RollbackDataReceived(string,uint256,bytes)"(
      _from?: null,
      _ssn?: null,
      _rollback?: null
    ): RollbackDataReceivedEventFilter;
    RollbackDataReceived(
      _from?: null,
      _ssn?: null,
      _rollback?: null
    ): RollbackDataReceivedEventFilter;
  };

  estimateGas: {
    handleCallMessage(
      _from: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    initialize(
      _callService: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    sendMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    handleCallMessage(
      _from: string,
      _data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    initialize(
      _callService: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    sendMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
