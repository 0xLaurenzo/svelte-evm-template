import type { State } from "@wagmi/core"
import type { Hex, Address } from "viem"

/**
 * Represents a hexadecimal address with a "0x" prefix.
 */
export type EvmAddress = Address

export type UserAddressEvm = {
    canonical: Address
    normalized: string
    normalized_prefixed: Address
  }
  

// shared types between wallets configs
export type ChainWalletStore<TChainSource extends  "evm"> = {
  chain:
    | (TChainSource extends "evm" ? "sepolia" : TChainSource extends "aptos" ? "aptos" : "cosmos")
    | String
  hoverState: "hover" | "none"
  address: TChainSource extends "evm"
    ? EvmAddress | undefined
    : TChainSource extends "aptos"
      ? Hex | undefined
      : string | undefined
  rawAddress?: TChainSource extends "cosmos" ? Uint8Array | undefined : undefined
  connectionStatus: State["status"]
  connectedWallet: string | undefined
}
