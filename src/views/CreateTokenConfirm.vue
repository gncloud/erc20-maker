<template>
    <b-container class="text-center cover-container" 
                 v-if="token.symbol !== undefined">
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto" @click="this.goForm"></div>
            <div>
                <span class="service-name cursor-pointer"
                      @click="this.goForm">토큰 생성</span>
            </div>
        </div>
        
        <div class="text-center my-3 wallet-info">
            <b-button :variant="token.networkType === 'mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${token.ownerText}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <div class="mt-5 text-left">아래 내용이 맞는지 검토하세요.</div>
        <table class="table text-left">
            <tr>
                <th colspan="2" class="text-left pl-4">요약</th>
            </tr>
            <tr>
                <td>토큰타입</td>
                <td>이더리움 ERC-20 {{token.isAdditional === 'not_accepted' ? '고정발행' : ''}}</td>
            </tr>
            <tr>
                <td>토큰이름</td>
                <td>{{token.name}}</td>
            </tr>
            <tr>
                <td>토큰심볼</td>
                <td>{{token.symbol}}</td>
            </tr>
            <tr>
                <td>소수점갯수</td>
                <td>{{token.decimals}}</td>
            </tr>
            <tr>
                <td>총 발행량</td>
                <td>{{token.totalSupply}}</td>
            </tr>
            <tr>
                <td>소유자 계정</td>
                <td>
                    <a ref="ownerLink" target="_black">
                        {{token.ownerText}}
                    </a>
                </td>
            </tr>
            <tr>
                <td>네트워크</td>
                <td>{{token.networkType}}</td>
            </tr>
            <tr>
                <td>가스 가격</td>
                <td>{{token.gasPriceText}} (GWEI)</td>
            </tr>
            <tr>
                <td>가스 제한</td>
                <td>{{token.gasLimitText}}</td>
            </tr>
        </table>
        <div class="text-center mt-4">
            <b-button
            variant="outline-primary"
            @click="back()"
            class="mr-2">
             뒤로
            </b-button>

            <b-button  
                :variant="isMetaMaskReady ? 'primary' : 'secondary'"
                class="mr-2" @click="next()">
                생성하기
            </b-button>
            
            <b-link href="/tokens/new" class="text-danger ml-2">취소</b-link>
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

export default {
    name: 'CreateTokenConfirm',
    data() {
        return {
            web3: null,
            isLoading: false,
            eventCode: null,
            isMetaMaskReady: false,
            networkTypeText: null,
            token: {
                owner: null,
                networkType: null
            }
        }
    },
    components: {
        Loading
    },
    created() {
        this.isMetamask()
        if(Object.keys(this.$route.params).length === 0) {
            this.$router.push('/tokens/new')
        }
        this.setToken()
    },
    mounted() {
        this.pollWeb3()
    },
    methods: {
        async isMetamask() {
            try {
                if (window.ethereum) {
                    window.ethereum.enable()
                }
            } catch(e) {
                this.$log.error(e)
            }
        },
        setToken() {
            this.token.name = this.$route.params.name
            this.token.symbol = this.$route.params.symbol
            this.token.decimals = this.$route.params.decimals
            this.token.isAdditional = this.$route.params.isAdditional
            this.token.totalSupply = this.$route.params.totalSupply
            this.token.gasLimit = this.$route.params.gasLimit
            this.token.gasPrice = this.$route.params.gasPrice

            this.token.totalSupplyText = this.$route.params.totalSupplyText
            this.token.gasLimitText = this.$route.params.gasLimitText
            this.token.gasPriceText = this.$route.params.gasPriceText
        },
        async pollWeb3() {
            try {
                this.web3 = Utils.getWeb3()
                
                this.networkTypeText   = '연결안됨'
                this.token.networkType = '연결안됨'
                this.token.owner     = '연결안됨'
                this.token.ownerText = '연결안됨'
                this.token.networkType = await this.web3.eth.net.getNetworkType()
                this.token.networkType = this.token.networkType == 'main' ? 'mainnet' : this.token.networkType
                this.networkTypeText = Utils.capitalizeFirstLetter(this.token.networkType)

                this.token.owner = await this.web3.eth.getCoinbase()
                if (this.$refs.ownerLink) {
                    this.$refs.ownerLink.setAttribute('href', Utils.link('address', this.token.owner))
                }
                this.token.ownerText = Utils.shortHash(this.token.owner)
                
                if (this.token.ownerText !== '') {
                    this.isMetaMaskReady = true
                }
            } catch(e) {
                this.isMetaMaskReady = false
                this.$refs.ownerLink = ''
                this.token.owner = ''
                this.$log.error(e)
            }
        },
        next() {
            if (!this.isMetaMaskReady) {
                alert('계정과 연결이 되지 않았습니다.')
                return false
            }
            // this.$router.replace({
            //     name: 'CreateToken',
            //     params: {
            //         ...this.token
            //     }
            // })
            this.create()
        },
        back() {
            this.$router.replace({
                name: 'CreatedToken',
                params: this.token
            })
        },
        goForm() {
            location.href="/tokens/new"
        },
        async create() {
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
            
            const newContract = new this.web3.eth.Contract(abi, '', { data: bytecode })
            newContract.transactionConfirmationBlocks = 1
            this.$log.debug('소유자', this.token.owner)
            this.$log.debug('가스제한', this.token.gasLimit)
            this.$log.debug('가스가격', this.token.gasPrice)
            this.$log.debug('token info', this.token)
            await newContract.deploy({
                data: bytecode,
                arguments: [
                    this.token.name, 
                    this.token.symbol, 
                    this.token.decimals, 
                    (Number(this.token.totalSupply) * (10 ** this.token.decimals))
                ]
            })
            .send({
                    from: this.token.owner, 
                    gas: this.token.gasLimit,
                    gasPrice: this.token.gasPrice})
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
                this.writeTokenInfo(contractAddress)
                this.$router.replace(`/tokens/${contractAddress}`)
            });
        },
        writeTokenInfo(contractAddress) {
            // {
            //     name: "AdaAda2",
            //     symbol: "Ada2",
            //     decimals: 18,
            //     totalSupply: 1000000,
            //     network: "ropsten",
            //     owner: "0x23456789o0p0987654",
            //     address: "0xdfghe78590567890",
            //     createtime: "44345435",
            // }
            try {
                Firestore.writeTokenInfo('erc20', {
                    name: this.token.name,
                    symbol: this.token.symbol,
                    decimals: this.token.decimals,
                    totalSupply: this.token.totalSupply,
                    network: this.token.networkType,
                    owner: this.token.owner,
                    address: contractAddress,
                    createTime: new Date().getTime(),
                })
            } catch (e) {
                this.$log.error(e)
            }
        }
    },
    destroyed() {
        if (this.eventCode != null) {
            clearTimeout(this.eventCode)
            this.eventCode = null
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
