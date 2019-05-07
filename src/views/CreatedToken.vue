<template>
    <div>
        from: <input v-model="from"><br>
        name: <input v-model="name"><br>
        symbol: <input v-model="symbol"><br>
        decimals: <input v-model="decimals"><br>
        totalSupply: <input v-model="totalSupply"><br>
        initSupply: <input v-model="initSupply"><br>
        <hr/>
        gasLimit: <input v-model="gasLimit"><br>
        gasPrice: <input v-model="gasPrice"><br>

        <button @click="created">생성</button>
        <div>
            <span>{{contractAddress}}</span>
        </div>
    </div>
</template>
<script>
import Web3 from 'web3'
import sampleABI from '../contracts/sample-abi'
import Utils from '../Utils'

export default {
    name: "",
    data() {
        return {
            from: '0xcc98DA5aD5a816Be6FaE64C71B708BD1EEF017c4',
            name: 'TESTTOKEN',
            symbol: 'testtoken',
            decimals: 0,
            totalSupply: 1000000000,
            initSupply: 0,
            gasLimit: 6721975,
            gasPrice: 20000000000,
            contractAddress: null
        }
    },
    methods: {
        async created() {
            // let from = '0xcc98DA5aD5a816Be6FaE64C71B708BD1EEF017c4'
            // let name = 'TESTNAME'
            // let symbol = 'TEST'
            // let decimals = 0
            // let totalSupply = 1000000000
            // let initSupply = 0
            
            // let gasLimit = 6721975
            // let gasPrice = 20000000000
            // let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
            let web3 = new Web3(window.web3)

            const { abi, bytecode } = require('../templates/newTokenTemplate')
            const newContract = new web3.eth.Contract(abi, '',{ data: bytecode })
            newContract.transactionConfirmationBlocks = 1
            console.log(abi)
            
            newContract.deploy({
                    data: bytecode,
                    arguments: [this.name, this.symbol, this.decimals, this.totalSupply]
                }).send({
                        from: this.from, 
                        gas: this.gasLimit,
                        gasPrice: this.gasPrice
                    })
                    .then((clonedContract) => {
                    this.$log.debug('clonedContract', clonedContract)
                    this.$log.debug('contract address >> ', clonedContract.options.address)
                    this.contractAddress = clonedContract.options.address
                    clonedContract.methods.transfer('0x430d4b747080A78F362D5F9E711215Ccd08e364a', 1)
                        .send({from: this.from, gas: this.gasLimit})
                        .on('transactionHash', (hash) => {
                            this.$log.debug('--- TRANSACTION_HASH ---')
                            this.$log.debug(hash)
                        })
                        .on('confirmation', (confirmations, receipt) => {
                            this.$log.debug('--- CONFIRMATION ---')
                            this.$log.debug(confirmations)
                            this.$log.debug(receipt)
                        })
                        .on('receipt', (receipt) => {
                            this.$log.debug('--- RECEIPT ---')
                            this.$log.debug(receipt)
                        })
                        .on('error', (error, receipt, confirmations) => {
                            this.$log.debug('--- ERROR ---')
                            this.$log.debug(error)
                            this.$log.debug(receipt)
                            this.$log.debug(confirmations)
                        })

                })
        }
    }
}
</script>
