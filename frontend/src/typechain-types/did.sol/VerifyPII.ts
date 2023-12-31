/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface VerifyPIIInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "VerifyMessage"
      | "getEthSignedMessageHashV1"
      | "getMessageHashV2"
      | "getSignerAddressFromSignatureV1"
      | "getVerifiedIdentityStatus"
      | "recoverSigner"
      | "splitSignature"
      | "verifySignatureV1"
      | "verifySignatureV2"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "VerifyMessage",
    values: [BytesLike, BigNumberish, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getEthSignedMessageHashV1",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getMessageHashV2",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "getSignerAddressFromSignatureV1",
    values: [string, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getVerifiedIdentityStatus",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "recoverSigner",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "splitSignature",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifySignatureV1",
    values: [string, BytesLike, AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "verifySignatureV2",
    values: [string, BytesLike, AddressLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "VerifyMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEthSignedMessageHashV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMessageHashV2",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSignerAddressFromSignatureV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getVerifiedIdentityStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recoverSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "splitSignature",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifySignatureV1",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifySignatureV2",
    data: BytesLike
  ): Result;
}

export interface VerifyPII extends BaseContract {
  connect(runner?: ContractRunner | null): VerifyPII;
  waitForDeployment(): Promise<this>;

  interface: VerifyPIIInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  VerifyMessage: TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [string],
    "view"
  >;

  getEthSignedMessageHashV1: TypedContractMethod<
    [_messageHash: BytesLike],
    [string],
    "view"
  >;

  getMessageHashV2: TypedContractMethod<[_message: string], [string], "view">;

  getSignerAddressFromSignatureV1: TypedContractMethod<
    [_message: string, signature: BytesLike],
    [string],
    "view"
  >;

  getVerifiedIdentityStatus: TypedContractMethod<
    [_signer: AddressLike],
    [boolean],
    "view"
  >;

  recoverSigner: TypedContractMethod<
    [_ethSignedMessageHash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;

  splitSignature: TypedContractMethod<
    [sig: BytesLike],
    [[string, string, bigint] & { r: string; s: string; v: bigint }],
    "view"
  >;

  verifySignatureV1: TypedContractMethod<
    [_message: string, signature: BytesLike, _signer: AddressLike],
    [boolean],
    "view"
  >;

  verifySignatureV2: TypedContractMethod<
    [_message: string, signature: BytesLike, _signer: AddressLike],
    [boolean],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "VerifyMessage"
  ): TypedContractMethod<
    [_hashedMessage: BytesLike, _v: BigNumberish, _r: BytesLike, _s: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getEthSignedMessageHashV1"
  ): TypedContractMethod<[_messageHash: BytesLike], [string], "view">;
  getFunction(
    nameOrSignature: "getMessageHashV2"
  ): TypedContractMethod<[_message: string], [string], "view">;
  getFunction(
    nameOrSignature: "getSignerAddressFromSignatureV1"
  ): TypedContractMethod<
    [_message: string, signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getVerifiedIdentityStatus"
  ): TypedContractMethod<[_signer: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "recoverSigner"
  ): TypedContractMethod<
    [_ethSignedMessageHash: BytesLike, _signature: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "splitSignature"
  ): TypedContractMethod<
    [sig: BytesLike],
    [[string, string, bigint] & { r: string; s: string; v: bigint }],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifySignatureV1"
  ): TypedContractMethod<
    [_message: string, signature: BytesLike, _signer: AddressLike],
    [boolean],
    "view"
  >;
  getFunction(
    nameOrSignature: "verifySignatureV2"
  ): TypedContractMethod<
    [_message: string, signature: BytesLike, _signer: AddressLike],
    [boolean],
    "nonpayable"
  >;

  filters: {};
}
