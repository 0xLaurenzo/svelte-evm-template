<script lang="ts">
    import { evmWalletsArray, evmWalletStore } from "$lib/wallet";
    import type { EvmWalletId } from "$lib/wallet";
    import { slide } from 'svelte/transition';
    
    let isOpen = false;
    
    // Reactive statements to track wallet address and connection status
    $: address = $evmWalletStore.address;
    $: isConnected = $evmWalletStore.connectionStatus === 'connected';

    // Precomputed list of wallets
    const wallets = evmWalletsArray;

    // Format the wallet address for display
    function formatAddress(addr: string | undefined): string {
        return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : 'Connect Wallet';
    }

    // Handle wallet connection
    async function handleWalletConnection(walletId: EvmWalletId) {
        try {
            evmWalletStore.connect(walletId, 111_55_111) // Default chain ID
            isOpen = false;
        } catch (error) {
            console.error("Failed to connect wallet:", error);
        }
    }

    // Toggle the dropdown menu
    function toggleDropdown() {
        isOpen = !isOpen;
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
        {isConnected ? formatAddress(address) : 'Connect Wallet'}
    </button>

    {#if isOpen}
        <div 
            transition:slide
            class="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 rounded-lg bg-white shadow-lg 
                   border border-gray-200 py-1 z-10 max-h-[80vh] overflow-y-auto
                   [&:has(>:last-child)]:left-auto [&:has(>:last-child)]:-right-0 [&:has(>:last-child)]:translate-x-0
                   sm:[&:has(>:last-child)]:left-1/2 sm:[&:has(>:last-child)]:-translate-x-1/2 sm:[&:has(>:last-child)]:right-auto"
        >
            {#each wallets as wallet}
                <button 
                    class="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50
                           transition-colors duration-200"
                    on:click={() => handleWalletConnection(wallet.id)}
                >
                    <img 
                        src={wallet.icon} 
                        alt={wallet.name}
                        class="w-6 h-6 object-contain"
                    />
                    <span class="text-gray-700">{wallet.name}</span>
                </button>
            {/each}
        </div>
    {/if}
</div>