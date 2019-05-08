<template>
    <b-container class="text-center cover-container" 
                 v-if="token.symbol !== undefined">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">토큰 생성</span>
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
                <td>초기 발행량</td>
                <td>{{token.initSupply}}</td>
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
                <td>{{token.gasPriceText}}</td>
            </tr>
            <tr>
                <td>가스 제한</td>
                <td>{{token.gasLimitText}}</td>
            </tr>
        </table>
        <div class="text-center mt-4">
            <b-button  
            :variant="isMetaMaskReady ? 'primary' : 'secondary'"

            class="mr-2" @click="next()">생성하기</b-button>
            <b-link href="/tokens" class="text-danger ml-2">취소</b-link>
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
import Web3 from 'web3'
import Utils from '../Utils'
import { finished } from 'stream';

export default {
    name: 'CreateTokenConfirm',
    data() {
        return {
            isMetaMaskReady: false,
            token: {
                owner: null,
                networkType: null
            }
        }
    },
    created() {
        if(Object.keys(this.$route.params).length === 0) {
            this.$router.push('/tokens')
        }
        this.pollWeb3()
        this.setToken()
    },
    methods: {
        setToken() {
            this.token.name = this.$route.params.name
            this.token.symbol = this.$route.params.symbol
            this.token.decimals = this.$route.params.decimals
            this.token.isAdditional = this.$route.params.isAdditional
            this.token.totalSupply = this.$route.params.totalSupply
            this.token.initSupply = this.$route.params.initSupply
            this.token.gasLimit = this.$route.params.gasLimit
            this.token.gasPrice = this.$route.params.gasPrice

            this.token.totalSupplyText = this.$route.params.totalSupplyText
            this.token.initSupplyText = this.$route.params.initSupplyText
            this.token.gasLimitText = this.$route.params.gasLimitText
            this.token.gasPriceText = this.$route.params.gasPriceText
        },
        async pollWeb3() {
            try {
                // let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
                let web3 = new Web3(window.web3.currentProvider)
                this.token.owner = await web3.eth.getCoinbase()
                this.token.networkType = await web3.eth.net.getNetworkType()
                this.$refs.ownerLink.setAttribute('href', Utils.link('address', this.token.owner))
                this.token.ownerText = Utils.shortHash(this.token.owner)
                this.isMetaMaskReady = true
            } catch(e) {
                this.isMetaMaskReady = false
                this.token.networkType = ''
                this.token.ownerText = ''
                this.$refs.ownerLink = ''
                this.token.owner = ''
                this.$log.error(e)
            } finally {
                setTimeout(this.pollWeb3, 700)
            }
        },
        next() {
            if (!this.isMetaMaskReady) {
                alert('메타마스크와 연결이 안되었습니다.')
                return false
            }
            this.$router.replace({
                name: 'createToken',
                params: {
                    ...this.$data
                }
            })
        }
    },
    destroyed() {
        
    }
}
</script>