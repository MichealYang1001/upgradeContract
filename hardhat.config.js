require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

const PRIVATE_KEY = ""; // 您的私钥
const INFURA_PROJECT_ID = "YOUR_INFURA_PROJECT_ID"; // 您的 Infura 项目 ID
const BSC_TESTNET_RPC_URL = `https://data-seed-prebsc-1-s1.binance.org:8545`; // BSC Testnet RPC 地址

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    testnet: {
      url: BSC_TESTNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
