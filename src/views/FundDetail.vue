<template>
    <b-container class="text-center cover-container">
        
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto" @click="this.goForm"></div>
            <div>
                <span class="service-name cursor-pointer"
                      @click="this.goForm">ERC-20 Token Maker</span>
            </div>
        </div>
        <div class="text-center my-3 wallet-info">
            <b-button :variant="networkType === 'Mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbase}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <h1 class="mt-4 mb-2 main-coin-text">{{fund.symbol}}</h1>
        <h4 class="mb-5 lead text-muted">{{fund.name}}</h4>
        
        <h4 class="mt-4">개요</h4>
        <table class="table">
            <tr>
                <th>펀딩타입</th>
                <td>이더리움 ERC-20 토큰펀딩</td>
            </tr>
            <tr>
                <th>토큰이름</th>
                <td>{{fund.name}}</td>
            </tr>
            <tr>
                <th>토큰심볼</th>
                <td>{{fund.symbol}}</td>
            </tr>
            <tr>
                <th>토큰비율</th>
                <td>{{fund.rate}}</td>
            </tr>
            <tr>
                <th>목표수량</th>
                <td>{{fund.cap}}</td>
            </tr>
            <tr>
                <th>최대수량</th>
                <td>{{fund.maxSize}}</td>
            </tr>
            <tr>
                <th>시작일</th>
                <td>{{fund.open}}</td>
            </tr>
            <tr>
                <th>종료일</th>
                <td>{{fund.close}}</td>
            </tr>
        </table>
        
        <h4 class="mt-5">속성</h4>
        <table class="table">
            <tr>
                <th>펀딩 컨트랙트</th>
                <td>
                    <a ref="fundId" target="_black">
                        {{fund.contract}}
                    </a>
                </td>
            </tr>
            <tr>
                <th>소유자</th>
                <td>
                    <a ref="owner" target="_black">
                        {{fund.owner}}
                    </a>
                </td>
            </tr>
            <tr>
                <th>토큰 컨트랙트 주소</th>
                <td>
                    <a ref="contract" target="_black">
                        {{fund.contract}}
                    </a>
                </td>
            </tr>
            <tr>
                <th>펀딩 계좌 주소</th>
                <td>
                    <a ref="fundAddress" target="_black">
                        {{fund.coinbase}}
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
import Utils from '../Utils'

export default {
    name: 'FundDetail',
    data() {
        return {
            networkType: null,
            networkTypeText: '연결안됨',
            coinbase: '연결안됨',
            fund: {},
            token: {}
        }
    },
    created() {
        this.fund.addr = this.$route.params.addr
        this.metamask()
        this.getContractInfo()
    },
    methods: {
        async metamask() {
            let web3 = Utils.getWeb3()
            try {
                this.networkTypeText = Utils.capitalizeFirstLetter(await web3.eth.net.getNetworkType())
                if (this.coinbase === '') {
                    throw Error('Not Connection')
                }
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
                coinbase
                if (this.coinbase === '') {
                    throw Error('Not Connection')
                }
            } catch(e) {
                this.$log.error(e)
                this.coinbase = '연결안됨'
            }

            setTimeout(this.metamask, 5000)
        },
        goForm() {
            this.$router.push('/fund/new')
        },
        async getContractInfo() {
            let web3 = Utils.getWeb3()
            const { abi } = require('../templates/CrowdSaleTemplate.json')
            let instance = new web3.eth.Contract(abi, this.fund.addr)
            this.$log.debug(instance)

        }
    }
}
</script>