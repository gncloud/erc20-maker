<template>
    <b-container class="text-center cover-container">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">ERC-20 Token Maker</span>
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
import { abi } from '../templates/newTokenTemplate'
import Utils from '../Utils'

export default {
    name: 'TokenDetail',
    components: {},
    data() {
        return {
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
    },
    methods: {
        getInstance() {
            let web3 = Utils.getWeb3()
            return new web3.eth.Contract(abi, this.token.id)
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
        }
    }
}
</script>

<style>
.cover-container {
    max-width: 42em !important;
}
.eth-logo {
    background-image: url("/img/ethereum-ci.png");
    background-size: 100px;
    background-repeat: no-repeat;
    background-position: center;
    width: 100%;
    height: 120px;
}
.service-name {
    font-size: 1.2em;
    font-weight: bold;
}
.main-coin-text {
    font-size: 60px;
}
.mastfoot {
    bottom: 1em;
}

</style>
