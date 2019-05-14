const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');

const ERC20 = artifacts.require('CrowdsaleTemplate');

contract('CrowdsaleTemplate', ([sender, receiver]) => {
  beforeEach(async function () {
    this.erc20 = ERC20.new();
    this.value = new BN(1);
  });

//   it('create', async function() {
//       await this.token.buyTokens(msg.sender);
//   })

//   it('reverts when transferring tokens to the zero address', async function () {
//     await shouldFail.reverting(this.erc20.transfer(constants.ZERO_ADDRESS, this.value, { from: sender }));
//   });

//   it('emits a Transfer event on successful transfers', async function () {
//     const { logs } = this.erc20.transfer(receiver, this.value, { from: sender });
//     expectEvent.inLogs(logs, 'Transfer', { from: sender, to: receiver, value: this.value });
//   });

//   it('updates balances on successful transfers', async function () {
//     this.erc20.transfer(receiver, this.value, { from: sender });
//     (await this.token.balanceOf(receiver)).should.be.bignumber.equal(this.value);
//   });
});