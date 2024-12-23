# Svelte EVM template

A simple svelte EVM template setup to easily start sending transactions to basic EVM chains. The template is setup to easily allow for simple projects to create a frontend. It comes with a preset navbar and wallet selector.

## Setting up new chains
The chains are setup in `src/lib/wallet/chains.ts`. To add a new chain, it should be added via to the `chains` array and a transport in the `chainTransports` transport. Once those are added, the wallet connection should work immediately.

-----
Shout out to [Union](https://github.com/unionlabs/union) for most of the actual wallet logic