import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24", 
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, 
      }
    }
  },
  networks: {
    mantleSepolia: {
      url: 'https://rpc.sepolia.mantle.xyz'
    },
    polygonCardona: {
      url: 'https://rpc.cardona.zkevm-rpc.com'
    },
    base: {
      url: 'wss://base-rpc.publicnode.com'
    }
    }
  

};

export default config;
