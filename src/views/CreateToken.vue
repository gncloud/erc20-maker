<template>
    <b-container class="text-center cover-container">
        <div class="eth-logo"></div>
        
        <div>
            <span class="service-name">토큰 생성</span>
        </div>
        <div class="mt-5">
            <span>{{token.name}}을 생성하고 있습니다.</span>
        </div>

        <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="true"
                :height="180"
                :width="180"
                >
        </loading>
        <div ref="message">
        </div>
    </b-container>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Utils from '../Utils'

export default {
    name: 'CreateToken',
    data() {
        return {
            isLoading: true,
            token: {}
        }
    },
    components: {
        Loading
    },
    created() {
        this.token = this.$route.params
        if (Object.keys(this.token).length == 0) {
            this.$router.replace('/tokens/new')
            return false
        }
        this.$log.debug('params ', this.token)
        this.create()
    },
    methods: {
        async create() {
            let web3 = Utils.getWeb3()
            
            let abi = null
            let bytecode = null
            if (this.token.isAdditional === 'not_accepted') {
                const template = require('../templates/CappedTokenTemplate.json')
                abi = template.abi
                bytecode = template.bytecode
            } else {
                const template = require('../templates/MintableTokenTemplate.json')
                abi = template.abi
                bytecode = template.bytecode
            }
            
            const newContract = new web3.eth.Contract(abi, '', { data: bytecode })
            newContract.transactionConfirmationBlocks = 1
            this.$log.debug('소유자', this.token.owner)
            this.$log.debug('가스제한', this.token.gasLimit)
            this.$log.debug('가스가격', this.token.gasPrice)
            await newContract.deploy({
                data: bytecode,
                arguments: [this.token.name, this.token.symbol, this.token.decimals, (this.token.totalSupply * (10 ** this.token.decimals))]
            })
            .send({
                    from: this.token.owner, 
                    gas: this.token.gasLimit,
                    gasPrice: this.token.gasPrice})
            .on('error', (error) => { 
                this.$log.debug('error >>', error)
             })
            .on('transactionHash', (transactionHash) => { 
                // start
                this.$log.debug('transactionHash >>', transactionHash)
             })
            .on('receipt', (receipt) => {
                this.$log.debug('receipt >>', receipt)
            })
            .on('confirmation', (confirmationNumber, receipt) => { 
                this.$log.debug('confirmation >>', confirmationNumber, receipt)
             })
            .then((newContractInstance) => {
                // end
                this.$log.debug('then >>', newContractInstance)
            });
            
            // then((clonedContract) => {
            //     let contractAddress = clonedContract.options.address
            //     this.$log.debug('clonedContract', clonedContract)
            //     this.$log.debug('contract address >> ', contractAddress)
            //     setTimeout(() => {
            //         this.$router.replace(`/tokens/${contractAddress}`)
            //     }, 5000)
            // }, (e) => {
            //     this.$log.debug(e)
            //     alert("생성 실패.")
            //     this.$refs.message.innerHTML = e.message
            //     this.isLoading = false
            // })
        }
    }
}


</script>