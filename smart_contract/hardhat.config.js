require("@nomiclabs/hardhat-waffle");

// https://eth-ropsten.alchemyapi.io/v2/WaH98anALGNVtN3fEZsBSVac74Vjersp

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/WaH98anALGNVtN3fEZsBSVac74Vjersp',
      accounts:['8172b98537bc0a090aa34b18a0104e79a5de1bb15822af4b61d4d28caa4c693a']
    }
  }
}