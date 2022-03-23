import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "./tasks/balance";

dotenv.config();

const privateKey = process.env.PRIVATE_KEY
const mnemonic = process.env.MNEMONIC

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: { 
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: 
      { mnemonic: mnemonic}
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/fc74ee7ccb324a9c84c2b83e5e3185b4',
      accounts: privateKey !== undefined ? [privateKey] : []
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/fc74ee7ccb324a9c84c2b83e5e3185b4',
      accounts: privateKey !== undefined ? [privateKey] : []
    },
    mainnet: {
      url: 'https://mainnet.infura.io/v3/fc74ee7ccb324a9c84c2b83e5e3185b4',
      accounts: privateKey !== undefined ? [privateKey] : []
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // etherscan api key: You should replace it to your own api
    apiKey: "FU1AS6EIA7CMEYS2SFP7Q4R4HEC2B33KV3",
  },
};

export default config;
