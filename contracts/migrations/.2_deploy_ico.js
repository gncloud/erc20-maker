// const Web3 = require('web3')
// var MintableTokenTemplate = artifacts.require("./MintableTokenTemplate.sol");
// var CrowdsaleTemplate = artifacts.require("./CrowdsaleTemplate.sol");

// // console.log('MintableTokenTemplate >>', MintableTokenTemplate)
// // console.log('CrowdsaleTemplate >>', CrowdsaleTemplate)

// const duration = {
//   seconds: function (val) { return val; },
//   minutes: function (val) { return val * this.seconds(60); },
//   hours: function (val) { return val * this.minutes(60); },
//   days: function (val) { return val * this.hours(24); },
//   weeks: function (val) { return val * this.days(7); },
//   years: function (val) { return val * this.days(365); },
// };
// // 100000000000000000000
// // 99999579999999999998

// module.exports = async function(deployer, network, accounts) {
//   console.log('deployer >> ', deployer, network, accounts)
//   const name = 'TESTCOIN'
//   const symbol = 'TTC'
//   const decimals = 0
//   const rate = 1;
//   const wallet = accounts[0];
//   const timeNow = Math.floor(Date.now() / 1000);
//   const openingTime = timeNow  + duration.seconds(30);
//   const closingTime = timeNow  + duration.years(1);
//   const cap = 1000000000000;

//   await deployer.deploy(MintableTokenTemplate, name, symbol, decimals, cap)
//   const deployedToken = await MintableTokenTemplate.deployed();

//   await deployer.deploy(CrowdsaleTemplate, rate, wallet, deployedToken.address, openingTime, closingTime, cap)
//   const deployedCrowdsale = await CrowdsaleTemplate.deployed();
//   await deployedToken.transferOwnership(deployedCrowdsale.address);

//   console.log('token address >>', deployedToken.address)
//   console.log('crowdsale >> ', deployedCrowdsale.address)
// };
