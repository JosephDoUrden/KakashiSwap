// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract StakingContract {
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    address public owner;

    uint constant public rewardPerToken = 1;

    mapping(address => uint) public balanceOf;

    mapping(address => uint) public durations;

    mapping(address => uint) public rewards;

    constructor() {
        owner = msg.sender;
        stakingToken = IERC20(0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd);
        rewardsToken = IERC20(0xC160F01f157Bd24B4673CfF1C1B088bC8eF946cA);
    }

    modifier updateReward(address _account) {
        rewards[_account] += calculateReward(_account);
        durations[_account] = block.timestamp;
        _;
    }

    function calculateReward(address _account) view internal returns(uint){
        uint duration = block.timestamp - durations[_account];
        return balanceOf[_account] * duration * rewardPerToken;
    }

    function stake(uint _amount) external updateReward(msg.sender){
        require(_amount > 0, "amount = 0");
        balanceOf[msg.sender] += _amount;
        stakingToken.transferFrom(msg.sender, address(this), _amount);
    }

    function withdraw(uint _amount) external updateReward(msg.sender){
        require(_amount > 0, "amount = 0");
        require(balanceOf[msg.sender] > 0, "Your balance = 0");
        balanceOf[msg.sender] -= _amount;
        stakingToken.transfer(msg.sender, _amount);
    }

    function getReward() external updateReward(msg.sender){
        uint reward = rewards[msg.sender];
        require(reward > 0, "You dont have rewards");
        rewards[msg.sender] = 0;
        rewardsToken.transfer(msg.sender, reward);
    }
}


interface IERC20 {
    function totalSupply() external view returns (uint);

    function balanceOf(address account) external view returns (uint);

    function transfer(address recipient, uint amount) external returns (bool);

    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint value);
    event Approval(address indexed owner, address indexed spender, uint value);
}
