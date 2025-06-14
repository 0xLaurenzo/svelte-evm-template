import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { reconnect } from '@wagmi/core'
import { 
  mainnet, 
  sepolia,
  goerli,
  arbitrum,
  arbitrumSepolia,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  base,
  baseSepolia
} from 'viem/chains'

// Get project ID from WalletConnect Cloud
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || ''

// Setup wagmi adapter
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [
    mainnet,
    sepolia,
    goerli,
    arbitrum,
    arbitrumSepolia,
    optimism,
    optimismSepolia,
    polygon,
    polygonAmoy,
    base,
    baseSepolia
  ]
})

// Create modal instance
export const appkit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [
    mainnet,
    sepolia,
    goerli,
    arbitrum,
    arbitrumSepolia,
    optimism,
    optimismSepolia,
    polygon,
    polygonAmoy,
    base,
    baseSepolia
  ],
  metadata: {
    name: 'Svelte EVM Template',
    description: 'Svelte EVM Template with AppKit',
    url: 'https://example.com',
    icons: ['/logo.png']
  },
  features: {
    analytics: true,
    email: false,
    socials: false
  }
})

// Reconnect on init
if (typeof window !== 'undefined') {
  reconnect(wagmiAdapter.wagmiConfig)
}