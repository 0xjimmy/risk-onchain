// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.4;

import './Verifier.sol';

struct GameState {
  address player0;
  address player1;
  address player2;
  bool started;
}

contract OnchainRisk {
  UltraVerifier public verifier;
  constructor() {
    verifier = new UltraVerifier();
  }

  function verifyProof(bytes calldata _proof, bytes32[] calldata _publicInputs) external view returns (bool) {
    return verifier.verify(_proof, _publicInputs);
  }

  event CreateGame(uint256 gameId, uint256 turnLength);
  event JoinGame(uint256 gameId, address player);
  event TurnStart(uint256 gameId, address player);

  uint256 nextGameId = 0;
  mapping(uint256 => GameState) gameState;
  mapping(uint256 => uint8) boards;

  function createGame(uint256 turnLength /*, GameBoard calldata startingBoard */) external {
    uint256 id = nextGameId;

    emit CreateGame(id, turnLength);
    emit JoinGame(id, msg.sender);
    nextGameId++;
  }

  function joinGame(uint256 id) external {
    require(gameState[id].player0 != address(0), "Game does not exist");
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

//  function completeTurn(GameBoard calldata newBoard, Actions calldata actions, bytes32 seed) {
    // arre you the current turn address
  //
    // make zk verification
//    v    // update board
 // }

}
