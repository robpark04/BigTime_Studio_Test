import "@nomiclabs/hardhat-web3";
import { task } from "hardhat/config";
import Web3 from "web3";

task("balance", "Prints an account's balance")
.addParam("account", "The account's address")
.setAction(async(taskArgs) => {
    const web3 = new Web3(Web3.givenProvider || "https://rinkeby.infura.io/v3/fc74ee7ccb324a9c84c2b83e5e3185b4");
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    
    const balance = await web3.eth.getBalance(account);

    console.log(Web3.utils.fromWei(balance, "ether"), "ETH");
})

