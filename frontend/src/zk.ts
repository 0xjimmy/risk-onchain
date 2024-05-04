import circuit from '../../risk-noir-prover/target/risk_game.json';
import { BarretenbergBackend, CompiledCircuit } from '@noir-lang/backend_barretenberg';
import { Noir, keccak256 } from '@noir-lang/noir_js';
import { GameState, currentState, startState } from './engine/state';
import { numberToBytes } from 'viem';

const setup = async () => {
  await Promise.all([
    import("@noir-lang/noirc_abi").then(module =>
      module.default(new URL("@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm", import.meta.url).toString())
    ),
    import("@noir-lang/acvm_js").then(module =>
      module.default(new URL("@noir-lang/acvm_js/web/acvm_js_bg.wasm", import.meta.url).toString())
    )
  ]);
}

function generateZKStates(start: GameState, end: GameState) {
  const startState = {
    seedNonces: start.seedNonces.map(x => Number(x)),
    currentTurnId: start.currentTurnId,
    tileOwners: start.tileOwners,
    tilePop: start.tilePop.map(x => Number(x)),
  }
  const endState = {
    seedNonces: start.seedNonces.map(x => Number(x)),
    currentTurnId: (start.currentTurnId + 1) % 3,
    tileOwners: end.tileOwners,
    tilePop: end.tilePop.map(x => Number(x)),
  }

  return {
    startState,
    endState
  }
}

function makeInput() {
  const proofInput = {
    // Start and end states
    ...generateZKStates(startState.value, currentState.value),
    actions: {
      placeAmounts: [0, 0, 0, 0, 0, 0],
      placeLocations: [50, 50, 50, 50, 50, 50],
      attackFrom: [50, 50, 50, 50, 50, 50],
      attackTargets: [50, 50, 50, 50, 50, 50]
    },
    seedHash: Array.from(keccak256(numberToBytes(100))),
  }
  console.log(proofInput)
  return proofInput
}

export async function doZK() {
  try {
    console.log(circuit)
    await setup();
    const input = makeInput()
    const backend = new BarretenbergBackend(circuit as CompiledCircuit);
    const noir = new Noir(circuit as CompiledCircuit, backend);

    const proof = await noir.generateProof(input);
    console.log('results', proof.proof);
    const verification = await noir.verifyProof(proof);
    console.log('verification:', verification)
  } catch (e) {
    console.log('ZK Error', e)
  }
}
