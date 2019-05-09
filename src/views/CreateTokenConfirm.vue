<template>
    <b-container class="text-center cover-container" 
                 v-if="token.symbol !== undefined">
        
        <a href="/tokens/new" class="link-no-style">
            <div class="eth-logo"></div>
            <div>
                <span class="service-name">토큰 생성</span>
            </div>
        </a>
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
    </b-container>
</template>
<script>
import Utils from '../Utils'

export default {
    name: 'CreateTokenConfirm',
    data() {
        return {
            eventCode: null,
            isMetaMaskReady: false,
            networkTypeText: null,
            token: {
                owner: null,
                networkType: null
            }
        }
    },
    created() {
        if(Object.keys(this.$route.params).length === 0) {
            this.$router.push('/tokens/new')
        }
        this.setToken()
    },
    mounted() {
        this.pollWeb3()
    },
    methods: {
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
                let web3 = Utils.getWeb3()
                this.token.owner = await web3.eth.getCoinbase()
                this.token.networkType = await web3.eth.net.getNetworkType()
                this.$refs.ownerLink.setAttribute('href', Utils.link('address', this.token.owner))
                this.token.ownerText = Utils.shortHash(this.token.owner)
                
                this.token.networkType = this.token.networkType == 'main' ? 'mainnet' : this.token.networkType
                if (this.token.networkType === null || this.token.networkType === '') {
                    this.networkTypeText = '연결안됨'
                } else {
                    this.networkTypeText = Utils.capitalizeFirstLetter(this.token.networkType)
                }
                
                if (this.token.ownerText !== '') {
                    this.isMetaMaskReady = true
                } else {
                    this.token.ownerText = '연결안됨'
                }
            } catch(e) {
                this.isMetaMaskReady = false
                this.networkTypeText = '연결안됨'
                this.token.ownerText = '연결안됨'
                this.$refs.ownerLink = ''
                this.token.owner = ''
                this.$log.error(e)
            } finally {
                this.eventCode = setTimeout(this.pollWeb3, 1000)
            }
        },
        next() {
            if (!this.isMetaMaskReady) {
                alert('계정과 연결이 되지 않았습니다.')
                return false
            }
            this.$router.replace({
                name: 'CreateToken',
                params: {
                    ...this.token
                }
            })
        },
        back() {
            this.$router.replace({
                name: 'CreatedToken',
                params: this.token
            })
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
