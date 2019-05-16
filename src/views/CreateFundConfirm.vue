<template>
    <b-container class="text-center cover-container">
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto" @click="this.goForm"></div>
            <div>
                <span class="service-name cursor-pointer"
                      @click="this.goForm">펀딩 생성</span>
            </div>
        </div>
        
        <div class="text-center my-3 wallet-info">
            <b-button :variant="networkTypeText === 'Mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbase}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <div class="mt-5 text-left">아래 내용이 맞는지 검토하세요.</div>
        <table class="table text-left">
            <tr>
                <th colspan="2" class="text-left pl-4">요약</th>
            </tr>
            <tr>
                <td>펀딩타입</td>
                <td>이더리움 ERC-20 토큰펀딩</td>
            </tr>
            <tr>
                <td>토큰 컨트랙트 주소</td>
                <td>{{fund.contract}}</td>
            </tr>
            <tr>
                <td>펀딩 계좌 주소</td>
                <td>{{fund.coinbase}}</td>
            </tr>
            <tr>
                <td>토큰비율</td>
                <td>{{fund.rate}}</td>
            </tr>
            <tr>
                <td>목표수량</td>
                <td>{{fund.maxSize}}</td>
            </tr>
            <tr>
                <td>시작일</td>
                <td>{{fund.open}}</td>
            </tr>
            <tr>
                <td>종료일</td>
                <td>{{fund.close}}</td>
            </tr>
            
        </table>
        <div class="text-center mt-4">
            <b-button
            variant="outline-primary"
            @click="back()"
            class="mr-2">
             뒤로
            </b-button>

            <b-button class="mr-2" 
                      @click="next()"
                      :variant="isReady ? 'primary' : 'secondary'">
                생성하기
            </b-button>
            
            <b-link href="/fund/new" class="text-danger ml-2">취소</b-link>
        </div>
        <div class="mastfoot mt-5">
            <div class="inner">
                <p>Provided by <a href="https://www.gncloud.kr/" style="color: black;">GNCloud</a> 
                    <span style="color: red; font-size: 18px; margin: 3px;">&hearts;</span>
                </p>
            </div>
        </div>
        <loading :active.sync="isLoading" 
                :can-cancel="false" 
                :is-full-page="true"
                :height="180"
                :width="180"
                background-color="#000"
                color="yellow"
                loader="dots"
                >
        </loading>
    </b-container>
</template>
<script>
import Utils from '../Utils'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Firestore from '../Firestore'
import { abi } from '../templates/MintableTokenTemplate'

export default {
    data() {
        return {
            web3: null,
            isReady: false,
            isLoading: false,
            networkType: null,
            networkTypeText: '연결안됨',
            coinbase: '연결안됨',
            fund: {}
        }
    },
    components: {
        Loading
    },
    created() {
        if(!this.$route.params) {
            this.$router.replace({
                name: 'CreateFundForm'
            })
            return false
        } 
        this.networkType = Utils.network
        this.fund = this.$route.params
        this.$log.debug(this.fund)
        this.metamask()
        this.getTokenInfo()
    },
    methods: {
        async metamask() {
            let web3 = Utils.getWeb3()
            let step = 0
            try {
                this.networkTypeText = Utils.capitalizeFirstLetter(await web3.eth.net.getNetworkType())
                if (this.networkTypeText === '') {
                    throw Error('Not Connection')
                }
                step += 1
            } catch(e) {
                this.$log.error(e)
                this.networkTypeText = '연결안됨'
            }
            try {
                let coinbase = await web3.eth.getCoinbase()
                if (this.fund.coinbase === null) {
                    this.fund.coinbase = coinbase
                }
                this.coinbase = Utils.shortHash(coinbase)
                if (this.coinbase === '') {
                    throw Error('Not Connection')
                }
                step += 1
            } catch(e) {
                this.$log.error(e)
                this.coinbase = '연결안됨'
            }
            if (step == 2) {
                this.isReady = true
            } else {
                this.isReady = false
            }
            this.web3 = web3
            setTimeout(this.metamask, 1000)
        },
        goForm() {
            location.href = '/fund/new'
        },
        back() {
            this.$router.replace({
                name: 'CreateFundForm',
                params: Object.assign({}, this.fund)
            })
        },
        async getTokenInfo() {
            let web3 = Utils.getWeb3()
            let instance           = new web3.eth.Contract(abi, this.fund.contract)
            this.fund.name        = await instance.methods.name().call()
            this.fund.symbol      = await instance.methods.symbol().call()
        },
        async next() {
            Firestore.writeTokenInfo('fund', {
                fundContract: '0x345h6ejw45q3t3g567e5jw4h',
                network: this.networkType,
                createTime: new Date().getTime(),
                owner: this.fund.coinbase,
                ...this.fund
            })
            
            if (!this.isReady) {
                alert('메타마스크와 연결되지 않았습니다.')
                return false
            }
            this.fund.networkType = this.networkType
            // this.fund.owner = this.coinbase
            const { abi, bytecode } = require('../templates/CrowdSaleTemplate.json')
            
            const newContract = new this.web3.eth.Contract(abi, '', { data: bytecode })
            newContract.transactionConfirmationBlocks = 1
            this.$log.debug('fund info', this.fund)
            
            await newContract.deploy({
                data: bytecode,
                arguments: [
                    this.fund.rate,
                    this.fund.coinbase,
                    this.fund.contract,
                    new Date(this.fund.open).getTime(),
                    new Date(this.fund.close).getTime(),
                    this.fund.cap
                ]
            })
            .send({
                    from: this.fund.coinbase, 
                    gas: this.fund.gasLimit,
                    gasPrice: this.fund.gasPrice * 1000000000})
            .on('error', (error) => { 
                this.isLoading = false
                this.$log.debug('error >>', error)
             })
            .on('transactionHash', (transactionHash) => { 
                // start
                this.isLoading = true
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
                this.isLoading = false
                this.$log.debug('then >>', newContractInstance)
                let contractAddress = newContractInstance.options.address
                this.$log.debug('contract address >> ', contractAddress)
                Firestore.writeTokenInfo('fund', {
                    fundContract: contractAddress,
                    network: this.networkType,
                    createTime: new Date().getTime(),
                    owner: this.fund.coinbase,
                    ...this.fund
                })
                this.$router.replace(`/fund/${contractAddress}`)
            });
        }
    }


}
</script>