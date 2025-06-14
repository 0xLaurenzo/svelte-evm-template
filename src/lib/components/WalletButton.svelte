<script lang="ts">
  import { onMount } from 'svelte'
  import '../wallet/appkit'
  
  onMount(() => {
    // AppKit is initialized via the import above
  })
</script>

<appkit-button></appkit-button>

<style>
  /* AppKit button styling overrides if needed */
</style>