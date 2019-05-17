const Crowdsale = artifacts.require("Crowdsale");
const TokenTemplate = artifacts.require("MintableTokenTemplate");

contract("Crowdsale test", function(accounts) {
    let token = null
    let crowdsale = null
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

    before(async function() {
        token = await TokenTemplate.new('ABC','ABC', 18, 100000000)
        console.log('token', token)
        crowdsale = await Crowdsale.new(
            1000, 
            accounts[0], 
            token.address
            
        )
        let crowd = await Crowdsale.deployed();
        console.log(crowd)
        await token.transferOwnership(crowdsale.address)
    })

    
  it("First", async function() {
    // assert.equal(await token.owner(), accounts[0])

      
    let crowd = await Crowdsale.deployed();
    console.log('crowdsale:', Object.keys(crowd))
    
    console.log("accounts[0]:", accounts[0])
    
    ret = await crowd.send(2, {from: accounts[0]})
    // ret = await crowdsale.send(accounts[0]).call()
    console.log("---------------")
    console.log(ret)
    console.log("===============")
    assert.equal(await token.owner(), accounts[0])

  });  
});



