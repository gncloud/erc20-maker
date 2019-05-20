const CrowdSaleTemplate = artifacts.require("GustavoCoinCrowdsale");
const MintableTokenTemplate = artifacts.require("GustavoCoin");

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

        console.log(openingTime, closingTime)

        
        const rate = 1000;
        const wallet = accounts[1];
        const cap = 1000000000;

        const name = 'TEST TOKEN'
        const symbol = 'TTT'
        const decimals = 0
        const totalSupply = 1000000
        console.log('accounts >>', accounts)


        this.token = await MintableTokenTemplate.new()

        this.crowdsale = await CrowdSaleTemplate.new(
            openingTime,
            closingTime,
            rate,
            accounts[0],
            this.token.address
        )
        
        const tokenAddress = await this.crowdsale.token()
        this.tokenInstance = await MintableTokenTemplate.at(tokenAddress)
        this.tokenInstance.addMinter(this.crowdsale.address)
        // await token.transferOwnership(crowdsale.address)
     
    })

  it("First", async () => {
    // let crowdsale = await CrowdSaleTemplate.deployed();
    // let token = await MintableTokenTemplate.deployed();
    
    // let before = await token.balanceOf(accounts[2])
    // console.log('token 거래전 >> ', before.toString(10))
    // console.log('Wallet >> ', await web3.eth.getBalance(accounts[2]))

    await this.crowdsale.sendTransaction({ from: accounts[2], value: web3.utils.toWei('1', "ether")})
    // await crowdsale.buyTokens(accounts[2], {value: web3.utils.toWei('1', "ether"), from : accounts[2]});

    // after = await token.balanceOf(accounts[2])
    // console.log('token 거래후 >> ', after.toString(10))
    // console.log('Wallet >> ', await web3.eth.getBalance(accounts[2]))
    
    
  });  
});
