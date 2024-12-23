import type { State } from '@wagmi/core';
import type { Hex, Address } from 'viem';
import type { chains } from '$lib/wallet/chains';


export type UserAddress = {
	canonical: Address;
	normalized: string;
	normalized_prefixed: Address;
};

export type ConfiguredChainId = (typeof chains)[number]['id'];
export type ChainMap = {
	[K in ConfiguredChainId]: (typeof chains)[number] & { id: K };
};

export interface EvmWalletStore {
	availableChains: ConfiguredChainId[];
	activeChain: ConfiguredChainId;
	chainSwitchingStatus: 'idle' | 'switching' | 'error';
	chainSpecificStates: Record<
		ConfiguredChainId,
		{
			connectionStatus: string;
			lastConnected?: Date;
		}
	>;
	chain: String;
	hoverState: 'hover' | 'none';
	address: Address | undefined;
	connectionStatus: State['status'];
	connectedWallet: string | undefined;
}
