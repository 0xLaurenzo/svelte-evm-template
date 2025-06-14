<script lang="ts">
	import WalletButton from '$lib/components/WalletButton.svelte';
</script>

<nav
	class="fixed left-0 right-0 top-0 flex items-center justify-between border-b border-gray-300 p-1 backdrop-blur-sm"
>
	<a href="/" class="rounded px-3 py-1 text-lg font-bold italic hover:bg-gray-100">
		<img src="/logo.png" alt="Logo" class="inline-block mr-2" style="width: 42px; height: 24px;" />
		Your Thing here
	</a>

	<div class="space-x-4">
		<a href="/placeholder1" class="text-black hover:text-gray-600"> Placeholder 1 </a>
		<a href="/placeholder2" class="text-black hover:text-gray-600"> Placeholder 2 </a>
		<a href="/placeholder3" class="text-black hover:text-gray-600"> Placeholder 3 </a>
	</div>
	<div>
		<WalletButton />
	</div>
</nav>
