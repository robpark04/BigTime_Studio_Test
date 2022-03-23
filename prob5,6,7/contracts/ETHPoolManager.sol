//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract ETHPoolManager is Ownable {
    using SafeMath for uint256;
    uint256 totalAmount = 0;
    uint256 rewardAmount = 0;
    uint256 lastAddRewardTime = 0;
    mapping (address => uint256) public _userPool;
    mapping (address => uint256) public _rewardPool;
    address[] _team;
    uint256 tempReward = 0;
    
    event UserDeposited(address account, uint256 amount);
    event UserWithdrawed(address account, uint256 amount);

    /// @notice Check that `msg.sender` is in the team member list
    modifier onlyTeam() {
        bool isTeam = false;
        for(uint256 i = 0;i<_team.length;i++) {
            if(_team[i] == msg.sender){
                isTeam = true;
                break;
            }
        }
        require(isTeam, "Msg.sender must be team member");
        _;
    }

    /// @notice Get the team member list
    function getTeamMember() public view returns(address[] memory) {
        return _team;
    }

    /// @notice Get the team deposited reward amount
    function getRewardAmount() public view returns (uint256) {
        return rewardAmount;
    }

    /// @notice Only owner can add member `account` to team member list
    function addTeamMember(address account) public onlyOwner {
        bool isInTeam = false;
        for(uint256 i = 0;i<_team.length;i++){
            if(_team[i] == account){
                isInTeam = true;
                break;
            }
        }
        if(!isInTeam) {
            _team.push(account);
        }
    }

    /// @notice Only team can add `msg.value` reward to pool
    function addReward() external payable onlyTeam() {
        require((rewardAmount == 0 && lastAddRewardTime == 0) || block.timestamp - lastAddRewardTime >= 3600*24*7, "LockTime is not finished");
        rewardAmount = rewardAmount.add(msg.value);
        lastAddRewardTime = block.timestamp;
    }

    /// @notice User deposit `msg.value`ETH to pool
    function deposit() external payable {
        _userPool[msg.sender] = _userPool[msg.sender].add(msg.value);
        totalAmount = totalAmount.add(msg.value);
        
        emit UserDeposited(msg.sender, msg.value);
    }

    /// @notice User withdraw their deposits and corresponding reward
    function withdraw() external {
        require(_userPool[msg.sender] > 0, "Deposited amount is 0");
        uint256 reward = _userPool[msg.sender].mul(rewardAmount).div(totalAmount);
        // send reward to user
        (bool success, ) = payable(msg.sender).call{value: reward + _userPool[msg.sender]}("");
        require(success, "Failed to withdraw");
        totalAmount = totalAmount.sub(_userPool[msg.sender]);
        _userPool[msg.sender] = 0;
        rewardAmount = rewardAmount.sub(reward);
        emit UserWithdrawed(msg.sender, reward);
        tempReward = reward;
    }

    /// @notice Get last user withdrawn reward : Temporary function
    function getTempReward() external view returns(uint256) {
        return tempReward;
    }

    /// @notice Get balance of contract
    function getBalance() external view returns(uint256) {
        return address(this).balance;
    }

    receive() external payable {}

    fallback() external payable {}
}