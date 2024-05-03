global PLAYER_COUNT = 3;
global MAX_PLACEMENTS = 6;
global MAX_ATTACKS = 6;

struct GameState {
    tileOwners: [u8; 42],
    tilePop: [u32; 42],
    seedNonces: [u32; 3],
    currentTurnId: u8
}

struct Actions {
    placeAmounts: [u8; MAX_PLACEMENTS],
    placeLocations: [u8; MAX_PLACEMENTS],
    attactLocations: [u8; MAX_ATTACKS]
}

fn main(startState: pub GameState, endState: pub GameState, actions: Actions, seedHashes: pub [Field; 3]) {
    // Make sure states have values without bounds of player counts
    validOwnerIds(startState.tileOwners);
    validOwnerIds(endState.tileOwners);
    assert(startState.currentTurnId < PLAYER_COUNT);
    
    // Create local gamestate to use for stepping through each action
    let mut state: GameState = startState;

    validatePlacements(&mut state, actions);

    // validate attacks and outcomes
    
    // Is Win Condition??
    // If Win endState player should === startState player, otherwise next player

    // Does computed state == expectedState
}

fn validOwnerIds(tiles: [u8; 42]) {
    for i in 0..41 {
        assert(tiles[i] < PLAYER_COUNT);
    }
}

fn validatePlacements(state: &mut GameState, actions: Actions) {
    let maxPlacements = getNewPopCount(*state);
    // Need to make sure we account for less than max actions for both amounts and locations
    assert(actions.placeAmounts.fold(0, |a, b| a + b) == maxPlacements);
}

fn getNewPopCount(state: GameState) -> u8 {
    let mut tilesOwned: u8 = 0;
    let mut naOwned: u8 = 0;
    let mut saOwned: u8 = 0;
    let mut euOwned: u8 = 0;
    let mut afOwned: u8 = 0;
    let mut asOwned: u8 = 0;
    let mut auOwned: u8 = 0;
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
    let mut regular: u8 = 0;
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
    let mut bonus: u8 = 0;
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

// #[test]
// fn test_succeed() {
//     main();
// }
// fn test_fail() {
//     main(1, 1);
// }
