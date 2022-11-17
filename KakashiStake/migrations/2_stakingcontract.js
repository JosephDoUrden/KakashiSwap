const StakingContract = artifacts.require("StakingContract");

module.exports = function (deployer) {
  deployer.deploy(StakingContract);
};
