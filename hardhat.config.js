require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/deploy");
require("./tasks/deploy-tokens");
require("./tasks/mint-tokens");
require("./tasks/test-protocol");
require("./tasks/test-nft");

const GWEI = 1000 * 1000 * 1000;
const MNEMONIC_PATH = "m/44'/60'/0'/0";
const MNEMONIC = process.env.MNEMONIC || "december expect soft goat cabin chunk mixture dance idea between arrow dress";

const getCommonNetworkConfig = (networkName, networkId) => ({
  url: networkName,
  hardfork: "istanbul",
  blockGasLimit: 8000000,
  gasMultiplier: 5,
  gasPrice: 35 * GWEI,
  chainId: networkId,
  accounts: {
    mnemonic: MNEMONIC,
    path: MNEMONIC_PATH,
    initialIndex: 0,
    count: 20,
  },
});
// If you are using MetaMask, be sure to change the chainId to 1337
module.exports = {
  solidity: "0.6.12",
  networks: {
    hardhat: {
      chainId: 31337
    },
    local: {
      url: 'http://127.0.0.1:7545',
      chainId: 1337,
    },
    mumbai: getCommonNetworkConfig("https://rpc-mumbai.maticvigil.com", 80001),
  }
};
