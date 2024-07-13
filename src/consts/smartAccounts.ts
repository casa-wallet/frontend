import { KernelSmartAccountLib } from '@/lib/smart-accounts/KernelSmartAccountLib'
import { SafeSmartAccountLib } from '@/lib/smart-accounts/SafeSmartAccountLib'
import {
  goerli,
  polygonMumbai,
  sepolia,
  // CASA
  arbitrumSepolia,
  baseSepolia,
  celoAlfajores,
  scrollSepolia,
  neonDevnet,
  rootstockTestnet,
  zircuitTestnet,
} from 'viem/chains'

import { defineChain } from 'viem'


const apechainJenkins = defineChain({
  id: 1798,
  name: "ApeChain Jenkins Testnet",
  nativeCurrency: { name: 'ApeCoin', symbol: 'APE', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://jenkins.rpc.caldera.xyz/http'],
    },
  },
  testnet: true
})

const morphHolesky = defineChain({
  id: 2810,
  name: 'Morph Holesky',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-holesky.morphl2.io'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Morph Testnet Explorer',
      url: 'https://explorer-holesky.morphl2.io',
      apiUrl: 'https://explorer-api-holesky.morphl2.io/api',
    },
  },
  testnet: true,
})

const zeroSepolia = defineChain({
  id: 4457845,
  name: 'ZERϴ Testnet Sepolia',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.zerion.io/v1/zero-sepolia'],
    },
  },
  testnet: true,
})



// Types
export const allowedChains = [
  sepolia,
  polygonMumbai,
  goerli,
  arbitrumSepolia,
  baseSepolia,
  celoAlfajores,
  scrollSepolia,
  apechainJenkins,
  morphHolesky,
  zeroSepolia,
  neonDevnet,
  rootstockTestnet,
  zircuitTestnet
]
// build chains so I can access them by id
export const chains = allowedChains.reduce((acc, chain) => {
  acc[chain.id] = chain
  return acc
}, {} as Record<Chain['id'], Chain>)
export type Chain = typeof allowedChains[number]

export const availableSmartAccounts = {
  safe: SafeSmartAccountLib,
  kernel: KernelSmartAccountLib
}
