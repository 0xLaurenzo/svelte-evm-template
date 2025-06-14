# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands
- `npm run dev` - Start development server with HMR
- `npm run build` - Build production version
- `npm run preview` - Preview production build locally
- `npm run check` - Run svelte-check for type checking
- `npm run check:watch` - Run svelte-check in watch mode
- `npm run fmt` - Format code using Prettier

### Development Flow
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Before committing: `npm run check` and `npm run fmt`

## Architecture Overview

This is a SvelteKit 5 template for building EVM-compatible dApps with TypeScript, Tailwind CSS, and AppKit (by Reown/WalletConnect) for wallet connections.

### Key Architectural Decisions

1. **Web3 Integration**: Uses AppKit with wagmi/viem adapter for wallet connections and blockchain interactions
2. **Multi-chain Support**: Configured for multiple EVM chains via AppKit configuration in `src/lib/wallet/appkit.ts`
3. **Wallet UI**: AppKit provides professional wallet connection UI with built-in chain switching
4. **Component Structure**: Uses AppKit's `<appkit-button>` web component for wallet connections

### AppKit Configuration

AppKit is configured in `src/lib/wallet/appkit.ts` with:
- WagmiAdapter for blockchain interactions
- Multi-chain support (mainnet, testnets, L2s)
- Custom metadata and feature flags
- Automatic reconnection on page load

### Adding New Chains

To add support for new EVM chains:
1. Import the chain from `viem/chains`
2. Add it to the networks array in `src/lib/wallet/appkit.ts` 
3. AppKit automatically handles chain switching UI

### Environment Variables

Required environment variable in `.env`:
- `VITE_WALLETCONNECT_PROJECT_ID` - Get from https://cloud.walletconnect.com

### Project Structure

- `/src/routes/` - SvelteKit pages and layouts
- `/src/lib/wallet/appkit.ts` - AppKit configuration and setup
- `/src/lib/wallet/chains.ts` - Legacy chain configurations (can be removed)
- `/src/lib/components/` - Reusable Svelte components
- `/src/lib/components/WalletButton.svelte` - AppKit wallet button component
- Build outputs to `/.svelte-kit/` and `/build/`