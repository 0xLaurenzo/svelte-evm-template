# Svelte EVM Template

A modern SvelteKit template for building EVM-compatible dApps with professional wallet connections powered by AppKit (Reown/WalletConnect).

## Features

- **Professional Wallet UI** - AppKit provides a polished, tested wallet connection experience
- **400+ Wallet Support** - MetaMask, WalletConnect, Coinbase Wallet, and many more
- **Mobile Responsive** - Works seamlessly on desktop and mobile devices
- **Built-in Chain Switching** - Automatic chain switching UI with no custom implementation needed
- **ENS Integration** - Name resolution and avatar support out of the box
- **Themeable** - Customizable to match your app's design
- **Latest Stack** - SvelteKit 5, TypeScript, Tailwind CSS, Viem, Wagmi

## Quick Start

1. **Clone the template**
   ```bash
   git clone https://github.com/0xLaurenzo/svelte-evm-template.git
   cd svelte-evm-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   ```
   
   Get your WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com) and add it to `.env`:
   ```
   VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## Adding New Chains

Chains are configured in `src/lib/wallet/appkit.ts`. To add a new EVM chain:

1. Import the chain from `viem/chains`
2. Add it to the `networks` array in the AppKit configuration

```typescript
import { newChain } from 'viem/chains'

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [
    mainnet,
    sepolia,
    // ... existing chains
    newChain  // Add your new chain here
  ]
})
```

AppKit automatically handles the chain switching UI - no additional configuration needed!

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Navbar.svelte          # Navigation with wallet button
│   │   └── WalletButton.svelte    # AppKit wallet connection
│   ├── constants/
│   │   ├── app.ts                 # App metadata
│   │   └── keys.ts               # API keys configuration
│   └── wallet/
│       ├── appkit.ts             # AppKit configuration
│       └── index.ts              # Wallet exports
└── routes/
    ├── +layout.svelte            # Root layout
    └── +page.svelte              # Home page
```

## Documentation

For detailed setup instructions and architecture information, see [CLAUDE.md](./CLAUDE.md).

## Acknowledgments

- AppKit by [Reown](https://reown.com) for the wallet infrastructure
- Original wallet logic inspiration from [Union](https://github.com/unionlabs/union)
