<template>
    <b-container class="text-center cover-container">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">ERC-20 Token Maker</span>
        </div>

        <h1 class="mt-4 mb-2 main-coin-text">{{token.symbol}}</h1>
        <h4 class="mb-4 lead text-muted">{{token.name}}</h4>
        
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
            <tr>
                <th>소수점갯수</th>
                <td>{{token.decimals}}</td>
            </tr>
            <tr>
                <th>생성일시</th>
                <td>{{token.timestamp}}</td>
            </tr>
        </table>
        
        <h4 class="mt-4">속성</h4>
        <table class="table">
            <tr>
                <th>컨트랙트</th>
                <td></td>
            </tr>
            <tr>
                <th>소유자</th>
                <td></td>
            </tr>
            <tr>
                <th>홀더수</th>
                <td></td>
            </tr>
            <tr>
                <th>전송수</th>
                <td></td>
            </tr>
        </table>

        <h4 class="mt-4">상위홀더</h4>
        <table class="table">
            <tr>
                <th>#</th>
                <th>주소</th>
                <th>소유자</th>
                <th>보유량</th>
            </tr>
            <tr>
                
            </tr>
        </table>

        <div class="mastfoot mt-4">
            <div class="inner">
                <p>Provided by <a href="https://www.gncloud.kr/">GNCloud</a> <span class="hearts">&hearts;</span></p>
            </div>
        </div>
    </b-container>
</template>

<script>
import Web3 from 'web3'
import sampleABI from '../contracts/sample-abi'

export default {
    name: 'TokenDetail',
    components: {
        
    },
    data() {
        return {
            network: null,
            web3: null,
            instance: null,
            token: {
                id: null,
                name: null,
                symbol: null,
                totalSupply: null,
                decimals: null,
                timestamp: null,
            }
        }
    },
    created() {
        this.network = location.host.substring(0, location.host.indexOf('.')) || 'ropsten'
        this.token.id = this.$route.params.token
        this.$log.debug(this.$data)
        this.web3 = new Web3(new Web3.providers.HttpProvider(`https://${this.network}.infura.io/v3/34808b9f35c641dd873d0b9f89f4e9e7`))
        if (!this.web3.isConnected()) {
            alert('네트워크 연결 실패.')
            return
        }
        this.instance = this.web3.eth.contract(sampleABI).at(this.token.id)
        this.getTokenInfo()
    },
    mounted() {
        
    },
    methods: {
        async getTokenInfo() {
            try {
                this.token.name = await this.instance['name']()
                this.token.symbol = await this.instance['symbol']()
                this.token.totalSupply = await this.instance['totalSupply']()
                this.token.decimals = await this.instance['decimals']()
            } catch (e) {
                this.$log.error(e)
                alert('잘못된 주소입니다.')
            }
        },
        call() {
            return new Promise((resolve) => {
                this.instance['name']((err, result) => {
                if (!err) {
                    this.$log.debug(result)
                    resolve(result);
                } else {
                    this.$log.error(err)
                    resolve(false);
                }
                });
            });
            
        }
    }
}
</script>

<style>
.cover-container {
    max-width: 42em;
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
