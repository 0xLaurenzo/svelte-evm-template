<script lang="ts">
	import { evmWalletsArray, evmWalletStore } from '$lib/wallet';
	import type { EvmWalletId } from '$lib/wallet';
	import { slide } from 'svelte/transition';

	let isOpen = false;

	$: address = $evmWalletStore.address;
	$: isConnected = $evmWalletStore.connectionStatus === 'connected';

	// Precomputed list of wallets
	const wallets = evmWalletsArray;

	function formatAddress(addr: string | undefined): string {
		return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Connect Wallet';
	}

	async function handleWalletConnection(walletId: EvmWalletId) {
		try {
			evmWalletStore.connect(walletId, 111_55_111); // Default chain ID
			isOpen = false;
		} catch (error) {
			console.error('Failed to connect wallet:', error);
		}
	}

	async function disconnect() {
		evmWalletStore.disconnect();
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}
</script>

<div class="group relative inline-block">
	<button
		class="rounded-lg border border-gray-300 bg-white px-4 py-2 transition-colors
               duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2
               focus:ring-indigo-500 focus:ring-offset-2"
		on:click={toggleDropdown}
		aria-expanded={isOpen}
	>
		{isConnected ? formatAddress(address) : 'Connect Wallet'}
	</button>

	{#if isOpen}
		<div
			transition:slide
			class="absolute left-1/2 top-full z-10 mt-2 max-h-[80vh] w-56 -translate-x-1/2 overflow-y-auto
                   rounded-lg border border-gray-200 bg-white py-1 shadow-lg
                   [&:has(>:last-child)]:-right-0 [&:has(>:last-child)]:left-auto [&:has(>:last-child)]:translate-x-0
                   sm:[&:has(>:last-child)]:left-1/2 sm:[&:has(>:last-child)]:right-auto sm:[&:has(>:last-child)]:-translate-x-1/2"
		>
			{#if isConnected}
				<button
					class="flex items-center justify-center gap-3 px-4 py-2 text-center transition-colors
               duration-200 hover:bg-gray-50"
					on:click={() => disconnect()}
				>
					<span class="text-lg text-gray-700">disconnect</span>
				</button>
			{:else}
				{#each wallets as wallet}
					<button
						class="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors
                           duration-200 hover:bg-gray-50"
						on:click={() => handleWalletConnection(wallet.id)}
					>
						<img src={wallet.icon} alt={wallet.name} class="h-6 w-6 object-contain" />
						<span class="text-gray-700">{wallet.name}</span>
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>
