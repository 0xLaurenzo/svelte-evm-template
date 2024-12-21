<script lang="ts">
    import { writable } from 'svelte/store';
    import { chainMap, chains, type ConfiguredChainId } from '$lib/wallet/chains';
    import { slide } from 'svelte/transition';
	import { evmWalletStore } from '$lib/wallet/wallet';

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
            console.error("Failed to switch chain:", error);
        }
    }

    function getChainLogoUrl(chainName: string) {
        const formattedChainName = chainName.toLowerCase();
        
        const baseUrl = 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains';
        const logoUrl = `${baseUrl}/${formattedChainName}/info/logo.png`;

        return logoUrl;
    }
</script>

<div class="relative inline-block group">
    <button 
        class="px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
               transition-colors duration-200"
        on:click={toggleDropdown}
        aria-expanded={isOpen}
    >
        {#if selectedChain}
            <img 
                src={getChainLogoUrl(chainMap[selectedChain].name)} 
                alt={`Logo for ${selectedChain}`} 
                class="inline-block w-6 h-6 mr-2"
                on:error={event => event.target.style.display = 'none'}
            />
            <span>{selectedChain}</span>
        {:else}
            Select Chain
        {/if}
    </button>

    {#if isOpen}
        <div 
            transition:slide
            class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-lg bg-white shadow-lg 
                   border border-gray-200 py-1 z-10 max-h-[80vh] overflow-y-auto
                   [&:has(>:last-child)]:left-auto [&:has(>:last-child)]:-right-0 [&:has(>:last-child)]:translate-x-0
                   sm:[&:has(>:last-child)]:left-1/2 sm:[&:has(>:last-child)]:-translate-x-1/2 sm:[&:has(>:last-child)]:right-auto"
        >
            {#each chains as chain}
                <button 
                    class="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50
                           transition-colors duration-200"
                    on:click={() => handleChainSelection(chain.id)}
                >
                    <span class="text-gray-700">{chain.name}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>
