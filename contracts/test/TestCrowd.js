// const Crowdsale = artifacts.require("CrowdsaleTemplate");
// const testCrowd = artifacts.require("TestCrowd");
const testCrowd = artifacts.require("Solution");

contract("Crowdsale test", async accounts => {
    let crowd
    before(async () => {
        // crowd = await testCrowd.new(accounts[0])
        crowd = await testCrowd.new()
        console.log("contract address", crowd.address)
        
        // await web3.eth.sendTransaction(
        //     {
        //         from: accounts[1], 
        //         to: accounts[0], 
        //         value: web3.utils.toWei('1'), 
        //         gas: 6721975, 
        //         gasPrice: 20000000000
        //     }
        // )
        // console.log('accounts[0] 보유량: \n', await web3.eth.getBalance(accounts[0]))
        
        // console.log('accounts[0] 보유량: \n', await web3.eth.getBalance(accounts[0]))
        
        // console.log('crowd >>>', crowd)

    })

  it("First", async () => {
    // let crowdsale = await testCrowd.deployed();
    // console.log('crowdsale:', crowd)
    // walletAddress = await crowd.getWallet()
    // console.log('accounts[0] 보유량: ', await web3.eth.getBalance(accounts[0]))
    // console.log('walletAddress 전송전 보유량: ', await web3.eth.getBalance(walletAddress))
    
    console.log('accounts[0] 보유량: ', await web3.eth.getBalance(accounts[0]))
    console.log('accounts[1] 보유량: ', await web3.eth.getBalance(accounts[1]))
    // web3.eth.sendTransaction(
    //     {
    //         from: accounts[1], 
    //         to: crowd.address, 
    //         value: web3.utils.toWei('1'), 
    //         gas: 6721975, 
    //         gasPrice: 20000000000
    //     }
    // )
    let c
    try {
        c = await testCrowd.at(crowd.address)
    } catch(err) {
        console.log('err1', err)
    }
    

    try {
        await c.set(await accounts[0])
    } catch(e) {
        console.error('err2 >>', e)
    }

    try {
        await c.transfer()
        console.log('accounts[0] 보유량: ', await web3.eth.getBalance(accounts[0]))
        console.log('accounts[1] 보유량: ', await web3.eth.getBalance(accounts[1]))
    } catch (e) {
        console.error('err3 >>', e)
    }

    
    // crowd.send2()
    
    // console.log('accounts[0] 전송후 보유량: ', await web3.eth.getBalance(accounts[0]))
    // console.log('walletAddress 전송후 보유량: ', await web3.eth.getBalance(walletAddress))
    

    // console.log('전송전 보유량: ', await web3.eth.getBalance(accounts[1]))
    // crowd.send3(accounts[1])
    // console.log('전송 후 보유량: ', await web3.eth.getBalance(accounts[1]))

    
    // console.log('accounts[0] 보유량: ', await web3.eth.getBalance(accounts[0]))
    // console.log('accounts[1] 보유량: ', await web3.eth.getBalance(accounts[1]))
    // crowd.setWallet(accounts[1])
    // crowd.send2()
    // console.log('walletAddress 보유량: ', await web3.eth.getBalance(walletAddress))
    // console.log('accounts[0] 보유량: ', await web3.eth.getBalance(accounts[0]))
    // console.log('accounts[1] 보유량: ', await web3.eth.getBalance(accounts[1]))
    // let result = await web3.eth.getBalance(accounts[0])

    // console.log('result', result)
    // let bal = crowd.tokenBalance()
    // console.log(bal)
    // console.log('balance', (await bal).toString(10))
    
  });  
});