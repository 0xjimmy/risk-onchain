import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const Game = buildModule("OnchainRisk", (m) => {
  const lock = m.contract("OnchainRisk");
  return { lock };
});

export default Game;
