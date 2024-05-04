import { signal } from "@preact/signals"
import { Address } from "viem"
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts"

// Store game ID, player address mappings and if game has started, active or complete
export type Game = {
  gameId: bigint,
  players: {
    0: Address | undefined,
    1: Address | undefined,
    2: Address | undefined
  },
  status: 'active' | 'lobby' | 'finished'
}

export const game = signal<Game | undefined>(undefined)

export function createLobby() {
  // Create starting state
  // Get ID
  // Submit request to create lobby
  // @TODO: Do on chain
  const gameId = BigInt(Math.floor(Math.random() * 1000))
  const userAddress = privateKeyToAddress(generatePrivateKey())

  game.value = {
    gameId,
    players: {
      0: userAddress,
      1: undefined,
      2: undefined
    },
    status: 'lobby'
  }
}
