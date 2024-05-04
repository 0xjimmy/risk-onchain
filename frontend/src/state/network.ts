import { signal } from '@preact/signals'
import { createWalletClient, custom } from 'viem'
import { mainnet, polygonZkEvmCardona, baseSepolia, mantleTestnet, localhost } from 'viem/chains'

export const provider = signal<ReturnType<typeof createWalletClient> | undefined>(undefined)

export function connectWallet() {
  const p = createWalletClient({
    chain: localhost,
    // @ts-ignore
    transport: custom(window.ethereum!)
  })
  p.requestAddresses().then(() => provider.value = p)
}


