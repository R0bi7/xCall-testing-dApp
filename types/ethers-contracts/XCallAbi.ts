/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
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

export interface XCallAbiInterface extends utils.Interface {
  functions: {
    "admin()": FunctionFragment;
    "executeCall(uint256)": FunctionFragment;
    "executeRollback(uint256)": FunctionFragment;
    "getBtpAddress()": FunctionFragment;
    "getFee(string,bool)": FunctionFragment;
    "getProtocolFee()": FunctionFragment;
    "getProtocolFeeHandler()": FunctionFragment;
    "handleBTPError(string,string,uint256,uint256,string)": FunctionFragment;
    "handleBTPMessage(string,string,uint256,bytes)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "sendCallMessage(string,bytes,bytes)": FunctionFragment;
    "setAdmin(address)": FunctionFragment;
    "setProtocolFee(uint256)": FunctionFragment;
    "setProtocolFeeHandler(address)": FunctionFragment;
    "tryHandleCallMessage(address,string,string,bytes)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "admin"
      | "executeCall"
      | "executeRollback"
      | "getBtpAddress"
      | "getFee"
      | "getProtocolFee"
      | "getProtocolFeeHandler"
      | "handleBTPError"
      | "handleBTPMessage"
      | "initialize"
      | "sendCallMessage"
      | "setAdmin"
      | "setProtocolFee"
      | "setProtocolFeeHandler"
      | "tryHandleCallMessage"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "admin", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "executeCall",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "executeRollback",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBtpAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFee",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "getProtocolFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getProtocolFeeHandler",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "handleBTPError",
    values: [string, string, BigNumberish, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "handleBTPMessage",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "sendCallMessage",
    values: [string, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "setAdmin", values: [string]): string;
  encodeFunctionData(
    functionFragment: "setProtocolFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setProtocolFeeHandler",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "tryHandleCallMessage",
    values: [string, string, string, BytesLike]
  ): string;

  decodeFunctionResult(functionFragment: "admin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "executeCall",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "executeRollback",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBtpAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getProtocolFeeHandler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleBTPError",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleBTPMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "sendCallMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setProtocolFeeHandler",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tryHandleCallMessage",
    data: BytesLike
  ): Result;

  events: {
    "CallExecuted(uint256,int256,string)": EventFragment;
    "CallMessage(string,string,uint256,uint256)": EventFragment;
    "CallMessageSent(address,string,uint256,int256)": EventFragment;
    "Initialized(uint8)": EventFragment;
    "ResponseMessage(uint256,int256,string)": EventFragment;
    "RollbackExecuted(uint256,int256,string)": EventFragment;
    "RollbackMessage(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CallExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CallMessage"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CallMessageSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResponseMessage"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RollbackExecuted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RollbackMessage"): EventFragment;
}

export interface CallExecutedEventObject {
  _reqId: BigNumber;
  _code: BigNumber;
  _msg: string;
}
export type CallExecutedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  CallExecutedEventObject
>;

export type CallExecutedEventFilter = TypedEventFilter<CallExecutedEvent>;

export interface CallMessageEventObject {
  _from: string;
  _to: string;
  _sn: BigNumber;
  _reqId: BigNumber;
}
export type CallMessageEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  CallMessageEventObject
>;

export type CallMessageEventFilter = TypedEventFilter<CallMessageEvent>;

export interface CallMessageSentEventObject {
  _from: string;
  _to: string;
  _sn: BigNumber;
  _nsn: BigNumber;
}
export type CallMessageSentEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  CallMessageSentEventObject
>;

export type CallMessageSentEventFilter = TypedEventFilter<CallMessageSentEvent>;

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface ResponseMessageEventObject {
  _sn: BigNumber;
  _code: BigNumber;
  _msg: string;
}
export type ResponseMessageEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  ResponseMessageEventObject
>;

export type ResponseMessageEventFilter = TypedEventFilter<ResponseMessageEvent>;

export interface RollbackExecutedEventObject {
  _sn: BigNumber;
  _code: BigNumber;
  _msg: string;
}
export type RollbackExecutedEvent = TypedEvent<
  [BigNumber, BigNumber, string],
  RollbackExecutedEventObject
>;

export type RollbackExecutedEventFilter =
  TypedEventFilter<RollbackExecutedEvent>;

export interface RollbackMessageEventObject {
  _sn: BigNumber;
}
export type RollbackMessageEvent = TypedEvent<
  [BigNumber],
  RollbackMessageEventObject
>;

export type RollbackMessageEventFilter = TypedEventFilter<RollbackMessageEvent>;

export interface XCallAbi extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: XCallAbiInterface;

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
    admin(overrides?: CallOverrides): Promise<[string]>;

    executeCall(
      _reqId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    executeRollback(
      _sn: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    getBtpAddress(overrides?: CallOverrides): Promise<[string]>;

    getFee(
      _net: string,
      _rollback: boolean,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getProtocolFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getProtocolFeeHandler(overrides?: CallOverrides): Promise<[string]>;

    handleBTPError(
      _src: string,
      _svc: string,
      _sn: BigNumberish,
      _code: BigNumberish,
      _msg: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    handleBTPMessage(
      _from: string,
      _svc: string,
      _sn: BigNumberish,
      _msg: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    initialize(
      _bmc: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    sendCallMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<ContractTransaction>;

    setAdmin(
      _address: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setProtocolFee(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    setProtocolFeeHandler(
      _addr: string,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;

    tryHandleCallMessage(
      toAddr: string,
      to: string,
      from: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<ContractTransaction>;
  };

  admin(overrides?: CallOverrides): Promise<string>;

  executeCall(
    _reqId: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  executeRollback(
    _sn: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  getBtpAddress(overrides?: CallOverrides): Promise<string>;

  getFee(
    _net: string,
    _rollback: boolean,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

  getProtocolFeeHandler(overrides?: CallOverrides): Promise<string>;

  handleBTPError(
    _src: string,
    _svc: string,
    _sn: BigNumberish,
    _code: BigNumberish,
    _msg: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  handleBTPMessage(
    _from: string,
    _svc: string,
    _sn: BigNumberish,
    _msg: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  initialize(
    _bmc: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  sendCallMessage(
    _to: string,
    _data: BytesLike,
    _rollback: BytesLike,
    overrides?: PayableOverrides & { from?: string }
  ): Promise<ContractTransaction>;

  setAdmin(
    _address: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setProtocolFee(
    _value: BigNumberish,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  setProtocolFeeHandler(
    _addr: string,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  tryHandleCallMessage(
    toAddr: string,
    to: string,
    from: string,
    data: BytesLike,
    overrides?: Overrides & { from?: string }
  ): Promise<ContractTransaction>;

  callStatic: {
    admin(overrides?: CallOverrides): Promise<string>;

    executeCall(_reqId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    executeRollback(
      _sn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getBtpAddress(overrides?: CallOverrides): Promise<string>;

    getFee(
      _net: string,
      _rollback: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    getProtocolFeeHandler(overrides?: CallOverrides): Promise<string>;

    handleBTPError(
      _src: string,
      _svc: string,
      _sn: BigNumberish,
      _code: BigNumberish,
      _msg: string,
      overrides?: CallOverrides
    ): Promise<void>;

    handleBTPMessage(
      _from: string,
      _svc: string,
      _sn: BigNumberish,
      _msg: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(_bmc: string, overrides?: CallOverrides): Promise<void>;

    sendCallMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAdmin(_address: string, overrides?: CallOverrides): Promise<void>;

    setProtocolFee(
      _value: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    setProtocolFeeHandler(
      _addr: string,
      overrides?: CallOverrides
    ): Promise<void>;

    tryHandleCallMessage(
      toAddr: string,
      to: string,
      from: string,
      data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CallExecuted(uint256,int256,string)"(
      _reqId?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): CallExecutedEventFilter;
    CallExecuted(
      _reqId?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): CallExecutedEventFilter;

    "CallMessage(string,string,uint256,uint256)"(
      _from?: string | null,
      _to?: string | null,
      _sn?: BigNumberish | null,
      _reqId?: null
    ): CallMessageEventFilter;
    CallMessage(
      _from?: string | null,
      _to?: string | null,
      _sn?: BigNumberish | null,
      _reqId?: null
    ): CallMessageEventFilter;

    "CallMessageSent(address,string,uint256,int256)"(
      _from?: string | null,
      _to?: string | null,
      _sn?: BigNumberish | null,
      _nsn?: null
    ): CallMessageSentEventFilter;
    CallMessageSent(
      _from?: string | null,
      _to?: string | null,
      _sn?: BigNumberish | null,
      _nsn?: null
    ): CallMessageSentEventFilter;

    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "ResponseMessage(uint256,int256,string)"(
      _sn?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): ResponseMessageEventFilter;
    ResponseMessage(
      _sn?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): ResponseMessageEventFilter;

    "RollbackExecuted(uint256,int256,string)"(
      _sn?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): RollbackExecutedEventFilter;
    RollbackExecuted(
      _sn?: BigNumberish | null,
      _code?: null,
      _msg?: null
    ): RollbackExecutedEventFilter;

    "RollbackMessage(uint256)"(
      _sn?: BigNumberish | null
    ): RollbackMessageEventFilter;
    RollbackMessage(_sn?: BigNumberish | null): RollbackMessageEventFilter;
  };

  estimateGas: {
    admin(overrides?: CallOverrides): Promise<BigNumber>;

    executeCall(
      _reqId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    executeRollback(
      _sn: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    getBtpAddress(overrides?: CallOverrides): Promise<BigNumber>;

    getFee(
      _net: string,
      _rollback: boolean,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getProtocolFee(overrides?: CallOverrides): Promise<BigNumber>;

    getProtocolFeeHandler(overrides?: CallOverrides): Promise<BigNumber>;

    handleBTPError(
      _src: string,
      _svc: string,
      _sn: BigNumberish,
      _code: BigNumberish,
      _msg: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    handleBTPMessage(
      _from: string,
      _svc: string,
      _sn: BigNumberish,
      _msg: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    initialize(
      _bmc: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    sendCallMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<BigNumber>;

    setAdmin(
      _address: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setProtocolFee(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    setProtocolFeeHandler(
      _addr: string,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;

    tryHandleCallMessage(
      toAddr: string,
      to: string,
      from: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    admin(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    executeCall(
      _reqId: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    executeRollback(
      _sn: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    getBtpAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getFee(
      _net: string,
      _rollback: boolean,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getProtocolFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getProtocolFeeHandler(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    handleBTPError(
      _src: string,
      _svc: string,
      _sn: BigNumberish,
      _code: BigNumberish,
      _msg: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    handleBTPMessage(
      _from: string,
      _svc: string,
      _sn: BigNumberish,
      _msg: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    initialize(
      _bmc: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    sendCallMessage(
      _to: string,
      _data: BytesLike,
      _rollback: BytesLike,
      overrides?: PayableOverrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setAdmin(
      _address: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setProtocolFee(
      _value: BigNumberish,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    setProtocolFeeHandler(
      _addr: string,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;

    tryHandleCallMessage(
      toAddr: string,
      to: string,
      from: string,
      data: BytesLike,
      overrides?: Overrides & { from?: string }
    ): Promise<PopulatedTransaction>;
  };
}
