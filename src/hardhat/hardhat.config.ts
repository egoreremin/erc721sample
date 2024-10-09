import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import secrets from "../secrets";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks:{
    amoy: {
      url: secrets.amoy.node_url,
      chainId: 80002,
      gasPrice: "auto",
      accounts: [secrets.amoy.private_key]
    }
  },

  etherscan: {
    apiKey: secrets.etherscan_api_key,
  },
};

export default config;
