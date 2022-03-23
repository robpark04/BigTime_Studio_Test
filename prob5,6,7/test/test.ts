import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { solidity } from 'ethereum-waffle'
import { expect } from "chai"
import { ethers } from "hardhat"

import { ETHPoolManager } from "../typechain";
import { Address } from "cluster"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber } from "@ethersproject/bignumber"
chai.use(solidity)
chai.use(chaiAsPromised)

import hre from "hardhat";


describe ("ETHPoolManager Test", function() {
  let poolContract : ETHPoolManager;

  let accountList : SignerWithAddress[];
  let ownerAddress : SignerWithAddress;

  const networkName = hre.network.name;
  const chainId = hre.network.config.chainId;

  console.log("HRE : ", networkName, " - ", chainId);

  this.beforeAll(async function () {
    accountList = await hre.ethers.getSigners();
    ownerAddress = accountList[0];
    const poolFactory = await hre.ethers.getContractFactory('ETHPoolManager', ownerAddress);
    poolContract = await poolFactory.deploy() as ETHPoolManager;
    await poolContract.deployed();
  });

  it ("Owner can add team member", async () => {
    await poolContract.addTeamMember(accountList[0].address);
    expect((await poolContract.getTeamMember()).length).to.eq(1);
  })

  it("Normal user cannot add team member", async () => {
    await expect(poolContract.connect(accountList[1]).addTeamMember(accountList[2].address)).to.revertedWith("Ownable: caller is not the owner");
  })

  it("Team member add reward to pool", async () => {
    // console.log("Teammember:", await poolContract.getTeamMember())
    await poolContract.addReward({value:ethers.utils.parseEther("200")});
    expect(await poolContract.connect(accountList[0]).getRewardAmount()).to.eq(ethers.utils.parseEther("200"));
  })

  it("Normal User cannot add reward to the pool", async () => {
    await expect(poolContract.connect(accountList[1]).addReward({value: ethers.utils.parseEther("100")})).to.revertedWith("Msg.sender must be team member");
  })

  it("Deposit ", async () => {
    // console.log("accountList[1].getBalance", await accountList[1].getBalance());
    // console.log("accountList[2].getBalance", await accountList[2].getBalance());
    await poolContract.connect(accountList[1]).deposit({value: ethers.utils.parseEther("100")});
    await poolContract.connect(accountList[2]).deposit({value: ethers.utils.parseEther("300")});
    // console.log("=== After deposit ===");
    // console.log("accountList[1].getBalance", await accountList[1].getBalance());
    // console.log("accountList[2].getBalance", await accountList[2].getBalance());
    // console.log("PoolContract balance = ", await poolContract.getBalance());
    const res1 = await poolContract.connect(accountList[1]).withdraw();
    // console.log("=== After Account[1] withdraw ===");
    // console.log("PoolContract balance = ", await poolContract.getBalance());
    expect(await poolContract.getTempReward()).to.eq(ethers.utils.parseEther("50"));
    const res2 = await poolContract.connect(accountList[2]).withdraw();
    expect(await poolContract.getTempReward()).to.eq(ethers.utils.parseEther("150"));
  })

});