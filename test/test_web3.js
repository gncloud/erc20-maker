const abi = require('./tokenABI')
const Web3 = require('web3')

const web3 = new Web3('https://ropsten.infura.io/v3/34808b9f35c641dd873d0b9f89f4e9e7');
const token = web3.eth.contract(abi).at('0x93Ab43dFb51Baf5b2915E91CebabcCDA455dB44C')
console.log(token.name())
