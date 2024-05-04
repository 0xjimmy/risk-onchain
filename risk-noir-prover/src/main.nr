use dep::std;

global PLAYER_COUNT = 3;
global MAX_PLACEMENTS = 6;
global MAX_ATTACKS = 6;

global TILE_NEIGHBOURS = [
    [5, 1, 31, 50, 50, 50],
    [0, 5, 6, 8, 50, 50],
    [8, 3, 11, 50, 50, 50],
    [2, 8, 6, 7, 50, 50],
    [5, 6, 7, 14, 50, 50],
    [0, 1, 6, 4, 50, 50],
    [5, 1, 8, 3, 7, 4],
    [4, 6, 3, 50, 50, 50],
    [1, 6, 3, 2, 50, 50],
    [12, 10, 50, 50, 50, 50],
    [11, 12, 9, 24, 50, 50],
    [2, 12, 10, 50, 50, 50],
    [11, 10, 9, 50, 50, 50],
    [14, 16, 15, 19, 50, 50],
    [4, 13, 16, 50, 50, 50],
    [16, 18, 17, 19, 13, 50],
    [14, 18, 15, 13, 50, 50],
    [19, 15, 18, 24, 22, 32],
    [16, 15, 17, 32, 26, 36],
    [13, 15, 17, 24, 50, 50],
    [24, 21, 25, 50, 50, 50],
    [22, 20, 25, 23, 32, 50],
    [17, 24, 21, 32, 50, 50],
    [21, 25, 50, 50, 50, 50],
    [10, 19, 17, 22, 21, 20],
    [20, 21, 23, 50, 50, 50],
    [18, 36, 27, 28, 32, 50],
    [26, 36, 28, 35, 33, 34],
    [32, 26, 27, 34, 50, 50],
    [35, 37, 31, 33, 50, 50],
    [31, 33, 50, 50, 50, 50],
    [37, 29, 33, 30, 0, 50],
    [18, 17, 22, 21, 26, 28],
    [35, 29, 31, 30, 27, 50],
    [28, 27, 40, 50, 50, 50],
    [36, 27, 29, 37, 33, 50],
    [18, 35, 27, 26, 50, 50],
    [35, 29, 31, 50, 50, 50],
    [39, 41, 50, 50, 50, 50],
    [40, 41, 38, 50, 50, 50],
    [34, 39, 41, 50, 50, 50],
    [40, 39, 38, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50],
    [50, 50, 50, 50, 50, 50]
];

struct GameState {
    tileOwners: [u8; 42],
    tilePop: [u32; 42],
    seedNonces: [u32; 3],
    currentTurnId: u8
}

struct Actions {
    placeAmounts: [u32; MAX_PLACEMENTS],
    placeLocations: [u8; MAX_PLACEMENTS],
    attackFrom: [u8; MAX_ATTACKS],
    attackTargets: [u8; MAX_ATTACKS]
}

fn main(
    startState: GameState,
    endState: pub GameState,
    actions: Actions,
    seedHash: [u8; 32]
) {
    // Make sure states have values without bounds of player counts
    validOwnerIds(startState.tileOwners);
    validOwnerIds(endState.tileOwners);
    assert(startState.currentTurnId < PLAYER_COUNT);

    // Create local gamestate to use for stepping through each action
    let mut state: GameState = startState;

    //validatePlacements(&mut state, actions);
    //doPlacements(&mut state, actions);

    //doAttacks(&mut state, actions, seedHash);

    // @TODO
    // Is Win Condition??
    // If Win endState player should === startState player, otherwise next player

    // Does computed state == expectedState
    /*for i in 0..42 {
        assert(state.tilePop[i] == endState.tilePop[i]);
        assert(state.tileOwners[i] == endState.tileOwners[i]);
    }
    for i in 0..3 {
        assert(state.seedNonces[i] == endState.seedNonces[i]);
    }*/
}

fn validOwnerIds(tiles: [u8; 42]) {
    for i in 0..42 {
        assert(tiles[i] < PLAYER_COUNT);
    }
}

fn validatePlacements(state: &mut GameState, actions: Actions) {
    let maxPlacements = getNewPopCount(*state);
    // Need to make sure we account for less than max actions for both amounts and locations
    assert(actions.placeAmounts.fold(0, |a, b| a + b) <= maxPlacements);
}

fn doPlacements(state: &mut GameState, actions: Actions) {
    for i in 0..5 {
        if (actions.placeLocations[i] > 41) {
            // Make sure there are no troops out of bounds
            assert(actions.placeAmounts[i] == 0);
        } else {
            // Ensure placing on owned tiles
            assert(state.tileOwners[actions.placeLocations[i]] == state.currentTurnId);
            state.tilePop[actions.placeLocations[i]] = state.tilePop[actions.placeLocations[i]] + actions.placeAmounts[i];
        }
    }
}

fn getNewPopCount(state: GameState) -> u32 {
    let mut tilesOwned: u32 = 0;
    let mut naOwned: u32 = 0;
    let mut saOwned: u32 = 0;
    let mut euOwned: u32 = 0;
    let mut afOwned: u32 = 0;
    let mut asOwned: u32 = 0;
    let mut auOwned: u32 = 0;
    // NA
    for i in 0..8 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            naOwned = naOwned + 1;
        }
    }
    // SA
    for i in 9..12 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            saOwned = saOwned + 1;
        }
    }
    // EU
    for i in 13..19 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            euOwned = euOwned + 1;
        }
    }
    // AF
    for i in 20..25 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            afOwned = afOwned + 1;
        }
    }
    // AS
    for i in 26..37 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            asOwned = asOwned + 1;
        }
    }
    // AU
    for i in 38..41 {
        if state.tileOwners[i] == state.currentTurnId {
            tilesOwned = tilesOwned + 1;
            auOwned = auOwned + 1;
        }
    }

    // Territory Brackets
    let mut regular: u32 = 0;
    if tilesOwned < 12 {
        regular = 3;
    } else if tilesOwned < 15 {
        regular = 4;
    } else if tilesOwned < 18 {
        regular = 5;
    } else {
        regular = 6;
    }
    // Bonuses
    let mut bonus: u32 = 0;
    if naOwned == 9 {
        bonus = bonus + 5;
    }
    if saOwned == 4 {
        bonus = bonus + 2;
    }
    if euOwned == 7 {
        bonus = bonus + 5;
    }
    if afOwned == 6 {
        bonus = bonus + 3;
    }
    if asOwned == 12 {
        bonus = bonus + 7;
    }
    if auOwned == 4 {
        bonus = bonus + 2;
    }

    // Return sum
    regular + bonus
}

unconstrained fn rollForUser(seed: [u8; 32], state: GameState) -> u32 {
    let mut startHash = std::hash::keccak256(seed, 32);

    for _ in 1..state.seedNonces[state.currentTurnId] {
        startHash = std::hash::keccak256(startHash, 32);
    }

    let mut result: u32 = 0;

    for i in 0..7 {
        result = (result << 4) | (startHash[i] as u32);
    }

    let x = result;
    x
}

fn doAttacks(state: &mut GameState, actions: Actions, seed: [u8; 32]) {
    for i in 0..5 {
        if (actions.attackFrom[i] < 42) {
            if (actions.attackTargets[i] < 42) {
                // Ownership
                assert(state.tileOwners[actions.attackFrom[i]] == state.currentTurnId);
                assert(state.tileOwners[actions.attackTargets[i]] != state.currentTurnId);

                // Is Adjacent
                assert(TILE_NEIGHBOURS[actions.attackFrom[i]].any(|a| a == actions.attackTargets[i]));

                state.seedNonces[state.currentTurnId] = state.seedNonces[state.currentTurnId] + 1;
                let mut newAttackerTroops = rollForUser(seed, *state) % (state.tilePop[actions.attackFrom[i]] - 1);
                state.seedNonces[state.currentTurnId] = state.seedNonces[state.currentTurnId] + 1;
                let mut newDefenderTroops = rollForUser(seed, *state) % state.tilePop[actions.attackTargets[i]];
                let mut min: u32 = 0;
                if (newAttackerTroops < newDefenderTroops) {
                    min = newAttackerTroops;
                } else {
                    min = newDefenderTroops;
                }
                newAttackerTroops -= min;
                newDefenderTroops -= min;

                state.tilePop[actions.attackFrom[i]] = 1;
                if (newAttackerTroops == newDefenderTroops) {
                    // 1 all, no win
                    state.tilePop[actions.attackTargets[i]] = 1;
                } else if (newAttackerTroops > newDefenderTroops) {
                    // Attacker win
                    state.tilePop[actions.attackTargets[i]] = newDefenderTroops;
                    state.tileOwners[actions.attackTargets[i]] = state.currentTurnId;
                } else {
                    // Attacker lose
                    state.tilePop[actions.attackTargets[i]] = newDefenderTroops;
                }
            }
        }
    }
}

// #[test]
// fn test_succeed() {
//     main();
// }
// fn test_fail() {
//     main(1, 1);
// }
