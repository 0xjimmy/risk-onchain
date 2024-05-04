// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import "./Verifier.sol";

struct GameState {
  address player0;
  address player1;
  address player2;
  uint256 turnId;
  bool started;
}

struct Board {
  uint256[42] owners;
  uint256[42] population;
}

contract OnchainRisk {

  UltraVerifier public verifier;

  uint256 public nextGameId;

  event CreateGame(uint256 gameId);
  event JoinGame(uint256 gameId, address player);
  event TurnStart(uint256 gameId, address player);
  
  mapping(uint256 => GameState) public gameState;
  mapping(uint256 => Board) boards;

  constructor(UltraVerifier _verifier) {
    verifier = _verifier;

  }
  
  function createGame(uint256[42] calldata _owners, uint256[42] calldata _population) external {
    uint256 id = nextGameId;

    gameState[id].player0 = msg.sender;
    boards[id].owners = _owners;
    boards[id].population = _population;

    emit CreateGame(id);
    emit JoinGame(id, msg.sender);

    nextGameId++;

  }

  function joinGame(uint256 id) external {
    require(gameState[id].player0 != address(0), "Game does not exist");
    require(gameState[id].player0 != msg.sender && gameState[id].player1 != msg.sender, "Player already joined");
    require(gameState[id].started == false, "Game already started");

    emit JoinGame(id, msg.sender);

    if (gameState[id].player1 == address(0)) {
      gameState[id].player1 = msg.sender;

    } else if (gameState[id].player2 == address(0)) {

      gameState[id].player2 = msg.sender;
      gameState[id].started = true;

      emit TurnStart(id, gameState[id].player0);

    }
  }

  function completeTurn(uint256 gameId, bytes calldata _proof, bytes32[] calldata _publicInputs) external {
    require(verifier.verify(_proof, _publicInputs), "Invalid Turn");

    for (uint256 i; i < 84; i++) { // tile owners + tile pop
      
      if (i < 42) {
        boards[gameId].owners[i] = uint256(_publicInputs[i]);
        
      } else {
        boards[gameId].population[i - 42] = uint256(_publicInputs[i]);
      } 
    }

    gameState[gameId].turnId = uint256(_publicInputs[87]);

  }
}
