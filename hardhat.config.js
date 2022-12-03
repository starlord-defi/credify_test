require("@nomiclabs/hardhat-waffle");

// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/deploy");
require("./tasks/deploy-tokens");
require("./tasks/mint-tokens");
require("./tasks/test-protocol");
require("./tasks/test-nft");


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
    }
  }
};
