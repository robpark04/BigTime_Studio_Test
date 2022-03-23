# Problem 5
## Summary
 ETHPool provides a service where people can deposit ETH and they will receive weekly rewards. Users must be able to take out their deposits along with their portion of rewards at any time. New rewards are deposited manually into the pool by the ETHPool team each week using a contract function.
## Requirements
- Only the team can deposit rewards.
- Deposited rewards go to the pool of users, not to individual users.
- Users should be able to withdraw their deposits along with their share of rewards
considering the time when they deposited.

## 5-a)
Let say we have user *A* and *B* and team *T*. <br/>
*A* deposits 100, and *B* deposits 300 for a total of 400 in the pool. Now *A* has 25% of the pool and *B* has 75%. When *T* deposits 200 rewards, *A* should be able to withdraw 150 and *B* 450 once the period ends.

Given the above specification and scenario, which of the following is true? Explain your answer.

A) *A* deposits then *T* deposits then *B* deposits then *A* withdraws and finally *B* withdraws. <br/>
B) *A* should get their deposit + all the rewards. <br/>
C) *B* should only get their deposit because rewards were sent to the pool before they participated. <br/>
D) *A* and *B* should get their deposit + the corresponding rewards based on the time they have been in the pool.
## Goal
Design and code a contract for ETHPool, take all the assumptions you need to move forward. Think about the most gas-efficient implementation you can. You can use any development tools you prefer: Hardhat, Truffle, Brownie, Solidity, Vyper.

Useful resources:
- Solidity Docs: https://docs.soliditylang.org/en/v0.8.7
- Educational Resource: https://github.com/scaffold-eth/scaffold-eth

# Solution
### Time
1 hour

### Answer of questions
A) true

B) true

C) false

D) true



# Problem 6
Deploy the contract to any Ethereum testnet of your preference. Keep record of the deployed address.

Bonus:
- Add Radspec
- Verify the contract in Etherscan

# Solution
### Time
10 mins

### Answer
<b>Step1: Deploy the contract</b>
```
npx hardhat run scripts/deploy.ts --network rinkeby
```
Result:

Deployed Contract Address: 
0xEF523279DBb732D666DbEFfd295c038E4D009664

<b>Step2: Verify the contract</b>
```
npx hardhat verify --network rinkeby [DEPLOYED_CONTRACT_ADDRESS] [ARGUMENT_LIST]
```
Result:
https://rinkeby.etherscan.io/address/0xEF523279DBb732D666DbEFfd295c038E4D009664#code

# Problem 7
Create a script (or a Hardhat task) to query the total amount of ETH held in the contract and any other thing you find interesting.

You can use any library you prefer: Ethers.js, Web3.js, Web3.py, eth-brownie

# Solution
### Time
20 mins

### Answer

Source Code:
<a>Prob5/tasks/balance.ts</a>

How to test:
```
    npx hardhat balance --account [ACCOUNT_ADDRESS]
```
