import type { State } from "@wagmi/core"
import type { Hex, Address } from "viem"
import type { chains } from "$lib/wallet/chains"

/**
 * Represents a hexadecimal address with a "0x" prefix.
 */
export type EvmAddress = Address

export type UserAddressEvm = {
    canonical: Address
    normalized: string
    normalized_prefixed: Address
  }
  
  export type ConfiguredChainId = (typeof chains)[number]["id"];
  export type ChainMap = {
    [K in ConfiguredChainId]: (typeof chains)[number] & { id: K };
  };

  export interface EvmChainWalletStore extends ChainWalletStore<"evm"> {
    availableChains: ConfiguredChainId[];
    activeChain: ConfiguredChainId;
    chainSwitchingStatus: 'idle' | 'switching' | 'error';
    chainSpecificStates: Record<ConfiguredChainId, {
        connectionStatus: string;
        lastConnected?: Date;
    }>;
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
