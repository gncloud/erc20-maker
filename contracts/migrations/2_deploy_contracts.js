const GustavoCoinCrowdsale = artifacts.require('./GustavoCoinCrowdsale.sol');
const GustavoCoin = artifacts.require('./GustavoCoin.sol');


const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  };

module.exports = function(deployer, network, accounts) {
    const timeNow = Math.floor(Date.now() / 1000);
    const openingTime = timeNow  + duration.seconds(30);
    const closingTime = timeNow  + duration.years(1);
    // const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
    // const closingTime = openingTime + 86400 * 20; // 20 days
    // const rate = new web3.BigNumber(1000);
    const rate = 1000;
    const wallet = accounts[1];


    const name = 'TEST TOKEN'
    const symbol = 'TTT'
    const decimals = 0
    const totalSupply = 1000000
    const cap = web3.utils.toWei('1000', 'ether')
    return deployer
        .then(() => {
            return deployer.deploy(
                GustavoCoin,
                name,
                symbol,
                decimals,
                totalSupply
                );
        })
        .then(() => {
            return deployer.deploy(
                GustavoCoinCrowdsale,
                openingTime,
                closingTime,
                rate,
                wallet,
                cap,
                GustavoCoin.address
            );
        });
};