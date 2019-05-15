const { expectThrow } = require("./helpers/expectThrow");
const { EVMRevert } = require("./helpers/EVMRevert");
const BigNumber = web3.utils.BN;
require("chai")
  .use(require("chai-bignumber")(BigNumber))
  .should();

const SampleToken = artifacts.require("./MintableTokenTemplate.sol");
const CrowdsaleTemplate = artifacts.require("./CrowdsaleTemplate.sol");

const duration = {
    seconds: function (val) { return val; },
    minutes: function (val) { return val * this.seconds(60); },
    hours: function (val) { return val * this.minutes(60); },
    days: function (val) { return val * this.hours(24); },
    weeks: function (val) { return val * this.days(7); },
    years: function (val) { return val * this.days(365); },
};

contract("SampleToken", function([_, owner, investor]) {
  let token;
  let sale;
  const _name = "SampleToken";
  const _symbol = "STK";
  const _decimals = 18;
  const _total_supply = new BigNumber(1000000);

  const rate = 10;
  const cap = 1000000000;
  
  
  console.log('owner >> ', owner)
  console.log('investor >> ', investor)
  
  beforeEach(async function() {
    console.log(`
      ====================== Create Token ===========================
    `)
    token = await SampleToken.new(_name, _symbol, _decimals, _total_supply, { from: owner });
    console.log('token owner',   await token.contract.methods.owner().call())
    console.log('token address', await token.address)
    console.log(`Created Token.`)

    console.log(`
      ====================== Create Sale ===========================
    `)
    const timeNow = Math.floor(Date.now() / 1000);
    const openingTime = timeNow  + duration.seconds(30);
    const closingTime = timeNow  + duration.years(1);
    
    sale = await CrowdsaleTemplate.new(
      1000,
      owner,
      token.address,
      openingTime,
      closingTime,
      1000000
    )

    await token.transferOwnership(sale.address)
 



  });
  
  it("", true)



});