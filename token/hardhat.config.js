require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
require('@nomiclabs/hardhat-etherscan');


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.6.12",
  networks: {
    bsctest: {
        url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
        chainId: 97,
        accounts: [process.env.PRIV_KEY],
        gasPrice: 10000000000,
        blockGasLimit: 1000000
    }
},
etherscan:{
  apiKey: process.env.API_KEY
}
};