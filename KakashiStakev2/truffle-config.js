const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = '';
require('dotenv').config();

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */
   plugins: ['truffle-plugin-verify'],
   contracts_build_directory: './frontend/src/contracts',

  networks: {
    bsc: {
      provider: () => new HDWalletProvider(
        process.env.PRIV_KEY, 
        'https://data-seed-prebsc-2-s1.binance.org:8545/'
      ),
      network_id: 97,
      skipDryRun: true
    }
  },

  api_keys: {
    bscscan: process.env.API_KEY
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
