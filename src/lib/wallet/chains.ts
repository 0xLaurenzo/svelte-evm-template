import {
	sepolia,
	berachainTestnetbArtio,
	arbitrumSepolia,
	scrollSepolia,
	mainnet,
	arbitrum,
	optimism,
	polygon
} from '@wagmi/core/chains';
import { unstable_connector, fallback, http } from '@wagmi/core';
import { injected } from '@wagmi/connectors';
import { KEY } from '$lib/constants/keys';

export const chains = [
	sepolia,
	berachainTestnetbArtio,
	arbitrumSepolia,
	scrollSepolia,
	mainnet,
	arbitrum,
	optimism,
	polygon
] as const;

export const chainMap = chains.reduce(
	(acc, chain) => {
		acc[chain.id] = chain;
		return acc;
	},
	{} as Record<number, (typeof chains)[number]>
);

export const chainTransports = {
	[sepolia.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-sepolia',
			name: 'unstable_connector-injected-sepolia'
		}),
		http(`https://special-summer-film.ethereum-sepolia.quiknode.pro/${KEY.RPC.QUICK_NODE}/`, {
			name: 'QuickNode - Sepolia'
		}),
		http(sepolia.rpcUrls.default.http.at(0), { name: 'default Sepolia RPC' })
	]),
	[berachainTestnetbArtio.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-berachain',
			name: 'unstable_connector-injected-berachain'
		}),
		http(berachainTestnetbArtio.rpcUrls.default.http.at(0), { name: 'default Berachain RPC' })
	]),
	[arbitrumSepolia.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-arbitrum',
			name: 'unstable_connector-injected-arbitrum'
		}),
		http(arbitrumSepolia.rpcUrls.default.http.at(0), { name: 'default Arbitrum Sepolia RPC' })
	]),
	[scrollSepolia.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-scroll-sepolia',
			name: 'unstable_connector-injected-scroll-sepolia'
		}),
		http(
			'https://sparkling-shy-hill.scroll-testnet.quiknode.pro/71674ce271d10786bb3e2fb69e8f788b784c2e89/',
			{ name: 'QuickNode - Scroll Sepolia' }
		),
		http(scrollSepolia.rpcUrls.default.http.at(0), { name: 'default Scroll Sepolia RPC' })
	]),
	[mainnet.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-mainnet',
			name: 'unstable_connector-injected-mainnet'
		}),
		http(`https://eth-mainnet.g.alchemy.com/v2/${KEY.RPC.ALCHEMY}`, {
			name: 'Alchemy - Mainnet'
		}),
		http(mainnet.rpcUrls.default.http[0], { name: 'default Mainnet RPC' })
	]),
	[arbitrum.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-arbitrum',
			name: 'unstable_connector-injected-arbitrum'
		}),
		http(`https://arb-mainnet.g.alchemy.com/v2/${KEY.RPC.ALCHEMY}`, {
			name: 'Alchemy - Arbitrum'
		}),
		http(arbitrum.rpcUrls.default.http[0], { name: 'default Arbitrum RPC' })
	]),
	[optimism.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-optimism',
			name: 'unstable_connector-injected-optimism'
		}),
		http(optimism.rpcUrls.default.http[0], { name: 'default Optimism RPC' })
	]),
	[polygon.id]: fallback([
		unstable_connector(injected, {
			retryCount: 3,
			retryDelay: 100,
			key: 'unstable_connector-injected-polygon',
			name: 'unstable_connector-injected-polygon'
		}),
		http(polygon.rpcUrls.default.http[0], { name: 'default Polygon RPC' })
	])
};
