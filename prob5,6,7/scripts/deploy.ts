// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers, upgrades } from "hardhat";


async function main() {
  const poolFactory = await ethers.getContractFactory('ETHPoolManager')
  const poolContract = await poolFactory.deploy();
  await poolContract.deployed()
  console.log("ETHPoolManagerContract deployed address: ", poolContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});