<script lang="ts">
	import { writable } from 'svelte/store';
	import { chainMap, chains } from '$lib/wallet/chains';
	import { type ConfiguredChainId } from '$lib/wallet/types';
	import { slide } from 'svelte/transition';
	import { evmWalletStore } from '$lib/wallet';

	let isOpen = false;
	let selectedChain: ConfiguredChainId | null = null;

	// Toggle the dropdown menu
	function toggleDropdown() {
		isOpen = !isOpen;
	}

	// Handle chain selection
	async function handleChainSelection(chainId: ConfiguredChainId) {
		try {
			evmWalletStore.switchChain(chainId);
			selectedChain = chainId;
			isOpen = false;
		} catch (error) {
			console.error('Failed to switch chain:', error);
		}
	}

	function getChainLogoUrl(chainName: string) {
		const formattedChainName = chainName.toLowerCase();

		const baseUrl = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains';
		const logoUrl = `${baseUrl}/${formattedChainName}/info/logo.png`;

		return logoUrl;
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
		{#if selectedChain}
			<img
				src={getChainLogoUrl(chainMap[selectedChain].name)}
				alt={`Logo for ${chainMap[selectedChain].name}`}
				class="mr-2 inline-block h-6 w-6"
				on:error={(event) => (event.target.style.display = 'none')}
			/>
			<span>{chainMap[selectedChain].name}</span>
		{:else}
			Select Chain
		{/if}
	</button>

	{#if isOpen}
		<div
			transition:slide
			class="absolute left-1/2 top-full z-10 mt-2 max-h-[80vh] w-56 -translate-x-1/2 overflow-y-auto
                   rounded-lg border border-gray-200 bg-white py-1 shadow-lg
                   [&:has(>:last-child)]:-right-0 [&:has(>:last-child)]:left-auto [&:has(>:last-child)]:translate-x-0
                   sm:[&:has(>:last-child)]:left-1/2 sm:[&:has(>:last-child)]:right-auto sm:[&:has(>:last-child)]:-translate-x-1/2"
		>
			{#each chains as chain}
				<button
					class="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors
                           duration-200 hover:bg-gray-50"
					on:click={() => handleChainSelection(chain.id)}
				>
					<span class="text-gray-700">{chain.name}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
