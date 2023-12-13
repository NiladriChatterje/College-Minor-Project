/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.17',
    defaultNetwork: 'sepolia',
    networks: {
      hardhat: {},
      sepolia: {
        url: 'https://sepolia.rpc.thirdweb.com',
        accounts: [`0xf26a4c1752abb614dfb9acb7ccc687b67edd1b6499981dcde48806ea07735767`]
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
