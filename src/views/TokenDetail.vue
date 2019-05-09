<template>
    <b-container class="text-center cover-container">
        
        <a href="/tokens/new" class="link-no-style">
            <div class="eth-logo"></div>
            <div>
                <span class="service-name">ERC-20 Token Maker</span>
            </div>
        </a>
        <div class="text-center my-3 wallet-info">
            <b-button :variant="token.networkType === 'mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbaseText}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <h1 class="mt-4 mb-2 main-coin-text">{{token.symbol}}</h1>
        <h4 class="mb-5 lead text-muted">{{token.name}}</h4>
        
        <h4 class="mt-4">개요</h4>
        <table class="table">
            <tr>
                <th>토큰타입</th>
                <td>이더리움 ERC-20</td>
            </tr>
            <tr>
                <th>토큰이름</th>
                <td>{{token.name}}</td>
            </tr>
            <tr>
                <th>토큰심볼</th>
                <td>{{token.symbol}}</td>
            </tr>
            <tr>
                <th>총 발행량</th>
                <td>{{token.totalSupply}}</td>
            </tr>
            <!-- <tr>
                <th>초기 발행량</th>
                <td>{{token.initSupply}}</td>
            </tr> -->
            <tr>
                <th>소수점갯수</th>
                <td>{{token.decimals}}</td>
            </tr>
            <tr>
                <th>생성일시</th>
                <td>{{token.date}}</td>
            </tr>
        </table>
        
        <h4 class="mt-5">속성</h4>
        <table class="table">
            <tr>
                <th>컨트랙트</th>
                <td>
                    <a ref="idLink" target="_black">
                        {{token.idText}}
                    </a>
                </td>
            </tr>
            <tr>
                <th>소유자</th>
                <td>
                    <a ref="owner" target="_black">
                        {{token.ownerText}}
                    </a>
                </td>
            </tr>
        </table>

        <div class="mastfoot mt-5">
            <div class="inner">
                <p>Provided by <a href="https://www.gncloud.kr/" style="color: black;">GNCloud</a> 
                    <span style="color: red; font-size: 18px; margin: 3px;">&hearts;</span>
                </p>
            </div>
        </div>
    </b-container>
</template>

<script>
import { abi } from '../templates/MintableTokenTemplate'
import Utils from '../Utils'

export default {
    name: 'TokenDetail',
    components: {},
    data() {
        return {
            web3: null,
            networkTypeText: null,
            coinbase: null,
            coinbaseText: null,
            token: {
                id: null,
                idText: null,
                name: null,
                symbol: null,
                initSupply: null,
                totalSupply: null,
                decimals: null,
                owner: null,
                ownerText: null,
                txCount: null,
                timeStamp: null,
                date: null
            }
        }
    },
    created() {
        this.token.id = this.$route.params.token
        this.getTokenSummary(this.getInstance())
        this.getWallet()
    },
    methods: {
        getInstance() {
            let instance = null
            try {
                this.web3 = Utils.getWeb3()
                instance = new this.web3.eth.Contract(abi, this.token.id)
            } catch (e) {
                this.networkTypeText = '연결안됨'
            }
            return instance
        },
        async getTokenSummary(instance) {
            this.token.name        = await instance.methods.name().call()
            this.token.symbol      = await instance.methods.symbol().call()
            this.token.owner       = await instance.methods.owner().call()
            this.token.totalSupply = Utils.comma(await instance.methods.totalSupply().call() || 0)
            this.token.decimals    = Utils.comma(await instance.methods.decimals().call() || 0)
            
            this.$refs.idLink.setAttribute('href', Utils.link('address', this.token.id))
            this.$refs.owner.setAttribute('href', Utils.link('address', this.token.owner))
            
            this.token.idText = Utils.shortHash(this.token.id)
            this.token.ownerText = Utils.shortHash(this.token.owner)

            try {
                let res = await fetch(`https://blockscout.com/eth/ropsten/api?module=account&action=txlist&offset=10&address=${this.token.id}`)
                let body = await res.json()
                this.token.timeStamp = body.result[0].timeStamp
                this.token.date = Utils.timeStampToDate(Number(this.token.timeStamp) * 1000)
            } catch(e) {
                this.token.date = Utils.timeStampToDate(new Date().getTime())
            }
        },
        async getWallet() {
            try {
                this.token.networkType = await this.web3.eth.net.getNetworkType()
                this.coinbase = Utils.shortHash(await this.web3.eth.getCoinbase())
                this.coinbaseText = Utils.shortHash(this.coinbase)
                if(this.coinbaseText === '') {
                    this.coinbaseText = '연결안됨'
                }
                this.token.networkType = this.token.networkType == 'main' ? 'mainnet' : this.token.networkType
                if (this.token.networkType === null || this.token.networkType === '') {
                    this.networkTypeText = '연결안됨'
                } else {
                    this.networkTypeText = Utils.capitalizeFirstLetter(this.token.networkType)
                }
            } catch(e) {
                this.coinbaseText = '연결안됨'
                this.$log.debug(e)
            } finally {
                setTimeout(this.getWallet, 1000)
            }
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
