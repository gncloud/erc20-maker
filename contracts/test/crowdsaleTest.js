// const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
// const ERC20 = artifacts.require('CrowdsaleTemplate');

// contract('CrowdsaleTemplate', ([sender, receiver]) => {
  
//   let token = null;
//   let sale = null;
//   const _name = "SampleToken";
//   const _symbol = "STK";
//   const _decimals = 18;
//   const _total_supply = new BN(1000000);
//   const _over_total_supply = new BN(1100000000000000000000000);

//   // 토큰 만듬.
//   beforeEach(async function () {
//     token = await SampleToken.new(_name, _symbol, _decimals, _total_supply, {
//       from: owner
//     });
//     sale = await SampleToken.new(_name, _symbol, _decimals, _total_supply, {
//       from: owner
//     });
//   });


//   describe("", () => {
//       it('reverts when transferring tokens to the zero address', async function () {
//         await shouldFail.reverting(this.erc20.transfer(constants.ZERO_ADDRESS, this.value, { from: sender }));
//       });
//   })

// //   it('reverts when transferring tokens to the zero address', async function () {
// //     await shouldFail.reverting(this.erc20.transfer(constants.ZERO_ADDRESS, this.value, { from: sender }));
// //   });

// //   it('emits a Transfer event on successful transfers', async function () {
// //     const { logs } = this.erc20.transfer(receiver, this.value, { from: sender });
// //     expectEvent.inLogs(logs, 'Transfer', { from: sender, to: receiver, value: this.value });
// //   });

// //   it('updates balances on successful transfers', async function () {
// //     this.erc20.transfer(receiver, this.value, { from: sender });
// //     (await this.token.balanceOf(receiver)).should.be.bignumber.equal(this.value);
// //   });
// });