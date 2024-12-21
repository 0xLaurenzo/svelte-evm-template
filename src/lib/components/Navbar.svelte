<script lang="ts">
	import ChainSelector from "./ChainSelector.svelte";
import Wallet from "./Wallet.svelte";

</script>

<nav class="fixed top-0 left-0 right-0 flex justify-between items-center p-1 backdrop-blur-sm border-b border-gray-300">
	<a href="/" class="font-bold text-lg italic px-3 py-1 rounded hover:bg-gray-100">
		Your Thing here
	</a>
	
	<div class="space-x-4">
		<a href="/placeholder1" class="text-black hover:text-gray-600"> Placeholder 1 </a>
		<a href="/placeholder2" class="text-black hover:text-gray-600"> Placeholder 2 </a>
		<a href="/placeholder3" class="text-black hover:text-gray-600"> Placeholder 3 </a>
	</div>
	<div>
		<ChainSelector/>
	</div>
	<div>
		<Wallet/>
	</div>
</nav>