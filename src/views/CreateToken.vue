<template>
    
</template>
<script>
// import Web3 from 'web3'
export default {
    name: 'CreateToken',
    data() {
        return {
            
        }
    },
    created() {
        console.log(this.$router.params)

    },
    methods: {
        async create() {
            // let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
            // let web3 = new Web3(window.web3.currentProvider)
            // let coinbase = await web3.eth.getCoinbase()
            // let networkId = await web3.eth.net.getId()
            // let networkType = await web3.eth.net.getNetworkType()
            // this.from = coinbase

            // const { abi, bytecode } = require('../templates/newTokenTemplate')
            // const newContract = new web3.eth.Contract(abi, '',{ data: bytecode })
            // newContract.transactionConfirmationBlocks = 1
            // newContract.deploy({
            //         data: bytecode,
            //         arguments: [this.name, this.symbol, this.decimals, this.totalSupply]
            //     }).send({
            //             from: this.from, 
            //             gas: this.gasLimit,
            //             gasPrice: this.gasPrice})
            //     .then((clonedContract) => {
            //     this.$log.debug('clonedContract', clonedContract)
            //     this.$log.debug('contract address >> ', clonedContract.options.address)
            //     this.contractAddress = clonedContract.options.address
            //     })
        }
    }
}


</script>