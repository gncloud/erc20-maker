<template>
    <div>
    </div>
</template>
<script>
import Utils from '../Utils'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Firestore from '../Firestore'

export default {
    name: 'CreateCrowdSaleConfirm',
    data() {
        return {
            web3: null
        }
    },
    components: {
        Loading
    },
    created() {
        window.ethereum.enable()
    },
    mounted() {
        this.create()
        // this.pending()
    },
    methods: {
        back() {
            this.$router.replace({
                name: 'CreatedToken',
                params: this.token
            })
        },
        goForm() {
            location.href="/tokens/new"
        },
        async pending() {
            // crowdsale contract addr "0xf6901b1e5235B0eE7C70861B3CE5787A4A75dC0a"
            // token contract addr "0x59eda5791Db70059636Ae46D333E58e82AC18303"
            // this.web3 = Utils.getWeb3()
            // const { abi, bytecode } = require('../templates/CrowdSaleTemplate.json')
            // let instance = new this.web3.eth.Contract(abi, "0xBc71dA909Fc8dDFB9ed11BC3ECB7FCD991d0E6b8")

            // let r = await instance.methods.buyTokens('0xBc71dA909Fc8dDFB9ed11BC3ECB7FCD991d0E6b8').call()
            // this.$log.debug('r > ', r)
            // let r = await instance.methods.buyTokens("0xfec5926974b87E82131b7774C5C804fFC4532493").call()
            // this.$log.debug(r)
        },

        async create() {
            this.web3 = Utils.getWeb3()
            const { abi, bytecode } = require('../templates/CrowdSaleTemplate.json')
            const newContract = new this.web3.eth.Contract(abi, '', { data: bytecode })
            newContract.transactionConfirmationBlocks = 1
            await newContract.deploy({
                data: bytecode,
                arguments: [
                    1000000000000, //rate
                    '0xfFfdF29D6DE6615A5f013ccb02c229545F049E1f', //wallet
                    '0x59eda5791Db70059636Ae46D333E58e82AC18303', // token addr
                    Math.floor(Date.now() / 1000) + Utils.duration.seconds(30),  // open
                    Math.floor(Date.now() / 1000) + Utils.duration.years(1),  // close
                    web3.toWei(2) // cap 2eth
                ]
            })
            .send({
                    from: '0xfFfdF29D6DE6615A5f013ccb02c229545F049E1f', 
                    gas: 2100000,
                    gasPrice: 3000000000})
            .on('error', (error) => { 
                this.$log.debug('error >>', error)
             })
            .on('transactionHash', (transactionHash) => { 
                this.$log.debug('transactionHash >>', transactionHash)
             })
            .on('receipt', (receipt) => {
                this.$log.debug('receipt >>', receipt)
            })
            .on('confirmation', (confirmationNumber, receipt) => { 
                this.$log.debug('confirmation >>', confirmationNumber, receipt)
             })
            .then(async (newContractInstance) => {
                // end
                this.$log.debug('newContractInstance', newContractInstance)
                // await newContractInstance.methods.transferOwnership("0x59eda5791Db70059636Ae46D333E58e82AC18303").call();
            })
        }
    }
}
</script>
<style scoped>
.link-no-style,
.link-no-style:hover,
.link-no-style:active,
.link-no-style::before {
    color: black;
    text-decoration-line: none;
}
</style>
