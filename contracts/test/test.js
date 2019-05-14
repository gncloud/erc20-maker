const Crowdsale = artifacts.require("CrowdsaleTemplate");
const TokenTemplate = artifacts.require("MintableTokenTemplate");

contract("Crowdsale test", async accounts => {

    before(async () => {
        const duration = {
            seconds: function (val) { return val; },
            minutes: function (val) { return val * this.seconds(60); },
            hours: function (val) { return val * this.minutes(60); },
            days: function (val) { return val * this.hours(24); },
            weeks: function (val) { return val * this.days(7); },
            years: function (val) { return val * this.days(365); },
        };
        const timeNow = Math.floor(Date.now() / 1000);
        const openingTime = timeNow - duration.seconds(30);
        const closingTime = timeNow + duration.years(1);

        token = await TokenTemplate.new('ABC','ABC', 0, 100000000)
        
        crowdsale = await Crowdsale.new(
          1000,
          accounts[0],
          token.address,
          openingTime,
          closingTime,
          1000000
        )

        await token.transferOwnership(crowdsale.address)
     
    })

  it("First", async () => {
    let crowdsale = await Crowdsale.deployed();
    console.log('crowdsale:', crowdsale)
    // let token = await Token.deployed();
    console.log("accounts[0]:", accounts[0])
    ret = await crowdsale.send(2, {from: accounts[0]})
    // ret = await crowdsale.methods.buyTokens(accounts[0]).value(2).call()
    console.log("---------------")
    console.log(ret)
    console.log("===============")

  });  
});