var MintableTokenTemplate = artifacts.require("./MintableTokenTemplate.sol");
var CrowdsaleTemplate = artifacts.require("./CrowdsaleTemplate.sol");

// console.log('MintableTokenTemplate >>', MintableTokenTemplate)
// console.log('CrowdsaleTemplate >>', CrowdsaleTemplate)

const duration = {
  seconds: function (val) { return val; },
  minutes: function (val) { return val * this.seconds(60); },
  hours: function (val) { return val * this.minutes(60); },
  days: function (val) { return val * this.hours(24); },
  weeks: function (val) { return val * this.days(7); },
  years: function (val) { return val * this.days(365); },
};
// 100000000000000000000
// 99999579999999999998

module.exports = async function(deployer, network, accounts) {
    // string memory name,
    // string memory symbol,
    // uint8 decimals,
    // uint256 totalSupply
  deployer.deploy(MintableTokenTemplate, "Test Token", "TTC", 18, 1000000000000).then(async () => {
    const deployedToken = await MintableTokenTemplate.deployed();
    console.log(deployedToken.address)
    
    const rate = 1;
    const wallet = accounts[0];
    const timeNow = Math.floor(Date.now() / 1000);
    const openingTime = timeNow  + duration.seconds(30);
    const closingTime = timeNow  + duration.years(1);
    const cap = 1000000000000;
    
    await deployer.deploy(CrowdsaleTemplate, rate, wallet, deployedToken.address, openingTime, closingTime, cap);
    const deployedCrowdsale = await CrowdsaleTemplate.deployed();
    console.log('deployedCrowdsale address: \n', deployedCrowdsale.address);
    await deployedToken.transferOwnership(deployedCrowdsale.address);
    console.log('Contracts deployed: \n', deployedCrowdsale.address, deployedToken.address)
    return true;
  })
//   aa 0xFB421C2E475DE4b37f4C033Aed0eF056b2D7Ee42
//   Contracts deployed:
//    0xFB421C2E475DE4b37f4C033Aed0eF056b2D7Ee42 0xEE577E3D6BD897edbf205961F29f15E0B27210CE


};








// MintableTokenTemplate >> function TruffleContract() {
//     this.constructor = temp;
//     return Contract.apply(this, arguments);
//   }
// CrowdsaleTemplate >> function TruffleContract() {
//     this.constructor = temp;
//     return Contract.apply(this, arguments);
//   }

// Deploying 'MintableTokenTemplate'
// ---------------------------------
// > transaction hash:    0x261105065573565e57b54ff4e726916619d724e0fdc31e661ce1edc2102b2cc2
// > Blocks: 0            Seconds: 0
// > contract address:    0x79Eb921C6916C512311BcE22349Dd1aB13EbF5f7
// > block number:        3
// > block timestamp:     1557800510
// > account:             0x15A8bE32C164FE5BFe014da926bf14252D38EB46
// > balance:             99.95738208
// > gas used:            1815706
// > gas price:           20 gwei
// > value sent:          0 ETH
// > total cost:          0.03631412 ETH

// 0x79Eb921C6916C512311BcE22349Dd1aB13EbF5f7

// Deploying 'CrowdsaleTemplate'
// -----------------------------
// > transaction hash:    0x54c8d5a1dd5b8cfc408814ed8962969a1378166ec725b848bc1f9ab8879cef90
// > Blocks: 0            Seconds: 0
// > contract address:    0x2868159552e69A20c9C28F5ca5A97a8232877f37
// > block number:        4
// > block timestamp:     1557800510
// > account:             0x15A8bE32C164FE5BFe014da926bf14252D38EB46
// > balance:             99.942506
// > gas used:            743804
// > gas price:           20 gwei
// > value sent:          0 ETH
// > total cost:          0.01487608 ETH

// aa 0x2868159552e69A20c9C28F5ca5A97a8232877f37
// Contracts deployed:
// 0x2868159552e69A20c9C28F5ca5A97a8232877f37 0x79Eb921C6916C512311BcE22349Dd1aB13EbF5f7

// > Saving migration to chain.
// > Saving artifacts
// -------------------------------------
// > Total cost:           0.0511902 ETH


// Summary
// =======
// > Total deployments:   3
// > Final cost:          0.05665344 ETH


// token
// sale