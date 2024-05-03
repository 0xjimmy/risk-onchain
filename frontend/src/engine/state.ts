import { batch, computed, signal } from "@preact/signals"

export type GameState = {
  tileOwners: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2],
  tilePop: [bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint, bigint],
  seedNonces: [bigint, bigint, bigint],
  currentTurnId: number
}

export type Actions = {
  placements: { where: number, amount: bigint }[]
  attacks: { from: number, to: number }[]
}


// {
//   tileOwners: [1, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
//   tilePop: [1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n, 1n],
//   seedNonces: [0n, 0n, 0n],
//   currentTurnId: 0
// }
export const startState = signal<GameState>(createGame())
export const currentState = signal<GameState>(startState.value)
export const currentActions = signal<Actions>({ placements: [], attacks: [] })

// Needs user A seeds should be known by all users BUT user A
export const secretSeeds = signal<[bigint, bigint, bigint]>([BigInt(Math.floor(Math.random() * 1000000000)), BigInt(Math.floor(Math.random() * 1000000000)), BigInt(Math.floor(Math.random() * 1000000000))])

// Track how many total and remaining troops to be deployed
export const currentTurnId = computed(() => startState.value?.currentTurnId ?? undefined)
export const turnNewPop = computed(() => {
  if (!startState.value) return 0
  const id = startState.value.currentTurnId
  const tiles = startState.value.tileOwners.filter(x => x === id).length
  const cont = startState.value.tileOwners.reduce((acc, tile, index) => {
    if (tile === id && index < 9) acc[0] += 1
    else if (tile === id && index < 9) acc[0] += 1
    else if (tile === id && index < 13) acc[1] += 1
    else if (tile === id && index < 20) acc[2] += 1
    else if (tile === id && index < 26) acc[3] += 1
    else if (tile === id && index < 38) acc[4] += 1
    else if (tile === id && index < 42) acc[5] += 1
    return acc
  }, [0, 0, 0, 0, 0, 0])

  const regular = tiles < 12 ? 3 : tiles < 15 ? 4 : tiles < 18 ? 5 : 6
  let bonus = 0;
  if (cont[0] === 9) bonus += 5;
  if (cont[1] === 4) bonus += 2;
  if (cont[2] === 7) bonus += 5;
  if (cont[3] === 6) bonus += 3;
  if (cont[4] === 12) bonus += 7;
  if (cont[5] === 4) bonus += 2;

  return bonus + regular
})

export const remainingDeploy = computed(() => turnNewPop.value - Number(currentActions.value.placements.reduce((acc, curr) => acc + curr.amount, 0n)))

// Setup Game 
// - Tile data
// - player randomnes seeds 
// - clear turn actions 
export function createGame() {
  const makePopAmounts = (o: 0 | 1 | 2): [bigint, 0 | 1 | 2][] => [[1n, o], [1n, o], [1n, o], [1n, o], [2n, o], [2n, o], [2n, o], [3n, o], [3n, o], [3n, o], [3n, o], [4n, o], [4n, o], [5n, o]]
  const allPopulatedWithoutTile = [...makePopAmounts(0), ...makePopAmounts(1), ...makePopAmounts(2)]
  const newState: GameState = {
    currentTurnId: 0,
    seedNonces: [0n, 0n, 0n],
    tilePop: [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n],
    tileOwners: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  }
  for (let index = 0; index < 42; index++) {
    const itemIndex = Math.floor(Math.random() * 100000) % allPopulatedWithoutTile.length
    newState.tilePop[index] = allPopulatedWithoutTile[itemIndex][0]
    newState.tileOwners[index] = allPopulatedWithoutTile[itemIndex][1]
  }
  batch(() => {
    startState.value = newState
    currentState.value = newState
    currentActions.value = { placements: [], attacks: [] }
  })
  return newState
}


export function deployTroops(location: number, amount: bigint) {
  batch(() => {
    if ((currentState.value.currentTurnId === currentState.value.tileOwners[location])) {
      currentState.value.tilePop[location] += amount;
      currentState.value = currentState.value
      currentActions.value = { attacks: currentActions.value.attacks, placements: [...currentActions.value.placements, { where: location, amount }] }
    }
  })
}

function rollForUser(user: 0 | 1 | 2): bigint {

}

export function attack(location: number, amount: bigint) {
  batch(() => {
    // currentState.value.tilePop[location] += amount;
    // currentState.value = currentState.value
    // currentActions.value = { attacks: currentActions.value.attacks, placements: [...currentActions.value.placements, { where: location, amount }] }
  })
}
