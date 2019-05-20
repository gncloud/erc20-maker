const CrowdSaleTemplate = artifacts.require("CrowdsaleTemplate");
const MintableTokenTemplate = artifacts.require("MintableTokenTemplate");

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
  };

contract("Crowdsale test", async accounts => {
    
    before(async () => {
        const timeNow = Math.floor(Date.now() / 1000);
        const openingTime = timeNow  + duration.seconds(30);
        const closingTime = timeNow  + duration.years(1);
        const rate = 1000;
        const wallet = accounts[1];
        const cap = 1000000000;

        const name = 'TEST TOKEN'
        const symbol = 'TTT'
        const decimals = 0
        const totalSupply = 1000000

        const token = await MintableTokenTemplate.new(name,symbol, decimals, totalSupply)
        
        const crowdsale = await CrowdSaleTemplate.new(
            rate,
            wallet,
            openingTime,
            closingTime,
            cap,
            token.address
        )
        
        const tokenAddress = await crowdsale.token()
        const tokenInstance = await MintableTokenTemplate.at(tokenAddress)
        tokenInstance.addMinter(crowdsale.address)
        // await token.transferOwnership(crowdsale.address)
     
    })

  it("First", async () => {
    let crowdsale = await CrowdSaleTemplate.deployed();
    let token = await MintableTokenTemplate.deployed();
    
    // let before = await token.balanceOf(accounts[2])
    // console.log('token 거래전 >> ', before.toString(10))
    // console.log('Wallet >> ', await web3.eth.getBalance(accounts[2]))

    // await crowdsale.sendTransaction({ from: accounts[2], value: web3.utils.toWei('1', "ether")})
    await crowdsale.buyTokens(accounts[2], {value: web3.utils.toWei('1', "ether"), from : accounts[2]});

    // after = await token.balanceOf(accounts[2])
    // console.log('token 거래후 >> ', after.toString(10))
    // console.log('Wallet >> ', await web3.eth.getBalance(accounts[2]))
    
    
  });  
});
