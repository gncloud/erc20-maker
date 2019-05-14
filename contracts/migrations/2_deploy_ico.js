var MintableTokenTemplate = artifacts.require("./MintableTokenTemplate.sol");
var CrowdsaleTemplate = artifacts.require("./CrowdsaleTemplate.sol");

console.log('MintableTokenTemplate >>', MintableTokenTemplate)
console.log('CrowdsaleTemplate >>', CrowdsaleTemplate)

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};

module.exports = async function(deployer, network, accounts) {
    // string memory name,
    // string memory symbol,
    // uint8 decimals,
    // uint256 totalSupply
  deployer.deploy(MintableTokenTemplate, "Test Token", "TTC", 18, 10000000000).then(async () => {
    const deployedToken = await MintableTokenTemplate.deployed();
    console.log(deployedToken.address)
    
    const rate = 1000;
    const wallet = accounts[0];
    const timeNow = Math.floor(Date.now() / 1000);
    const openingTime = timeNow  + duration.seconds(30);
    const closingTime = timeNow  + duration.years(1);
    const cap = 100000;
    
    // uint256 _rate,
    // address payable _wallet,
    // ERC20 _token,
    // uint256 _openingTime,
    // uint256 _closingTime,
    // uint256 _cap
    await deployer.deploy(CrowdsaleTemplate, rate, wallet, deployedToken.address, openingTime, closingTime, cap);
    const deployedCrowdsale = await CrowdsaleTemplate.deployed();
    console.log('aa', deployedCrowdsale.address);
    await deployedToken.transferOwnership(deployedCrowdsale.address);
    console.log('Contracts deployed: \n', deployedCrowdsale.address, deployedToken.address)
    return true;
  })
//   aa 0xFB421C2E475DE4b37f4C033Aed0eF056b2D7Ee42
//   Contracts deployed:
//    0xFB421C2E475DE4b37f4C033Aed0eF056b2D7Ee42 0xEE577E3D6BD897edbf205961F29f15E0B27210CE


};