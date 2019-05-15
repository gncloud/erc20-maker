<template>
    <b-container class="text-center cover-container">
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto"></div>
            <div>
                <span class="service-name cursor-pointer" >ERC-20 Token Maker</span>
            </div>
        </div>
        
        <div class="text-center my-3 wallet-info">
            <b-button :variant="networkType === 'mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbase}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <div class="mt-5">
            <h3>지금 바로 ERC-20 토큰을 만드세요! </h3>
        </div>
        <div class="mt-5">
            <b-button variant="primary" @click="goForm()">만들기</b-button>
        </div>

        <div class="mt-5">
            <h4>나의 코인</h4>
        </div>
        <b-table class="table mt-5" :fields="tokenFields" :items="myItems" hover :show-empty="myItems.length == 0">
            <template slot="empty" :slot-scope="'scope'">
            <h4>생성한 토큰이 없습니다.</h4>
            </template>
            <template slot="symbol" slot-scope="scope">
                <b-link target="_black" :href="scope.item.contractAddressUrl">{{ scope.value }}</b-link>
            </template>
            <!-- <template slot="ownerText" slot-scope="scope">
                <b-link target="_black" :href="scope.item.ownerUrl">{{ scope.value }}</b-link>
            </template> -->
        </b-table>

        <div class="mt-5">
            <h4>신규 발행 코인들</h4>
        </div>
        <b-table class="table mt-5" :fields="tokenFields" :items="items" hover>
            <template slot="symbol" slot-scope="scope">
                <b-link target="_black" :href="scope.item.contractAddressUrl">{{ scope.value }}</b-link>
            </template>
            <!-- <template slot="ownerText" slot-scope="scope">
                <b-link target="_black" :href="scope.item.ownerUrl">{{ scope.value }}</b-link>
            </template> -->
        </b-table>

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
import Firestore from '../Firestore'
import Utils from '../Utils'

export default {
    name: 'TokenList',
    data() {
        return {
            networkTypeText: null,
            networkType: null,
            coinbase: null,
            tokenFields: [
                { key: 'symbol',     label: '심볼',     sortable: false },
                { key: 'name',       label: '이름',     sortable: false },
                { key: 'initSupply', label: '발행량', sortable: false }
            ],
            items: [],
            myItems: []
        }
    },
    created() {
        this.getTokenList()
        this.checkNetwork()
    },
    methods: {
        async getMyTokenList(coinbase) {
            if (coinbase === null || coinbase == '') {
                return false
            }
            let docs = await Firestore.getTokenList(Utils.network, coinbase)
            this.myItems = docs.map(doc => {
                let token = doc.data()
                return {
                    name: token.name,
                    symbol: token.symbol,
                    owner: token.owner,
                    ownerUrl: Utils.link('address', token.owner),
                    ownerText: Utils.shortHash(token.owner),
                    decimals: token.decimals,
                    networkType: token.network,
                    contractAddress: token.address,
                    contractAddressUrl: `/tokens/${token.address}`,
                    contractAddressText: Utils.shortHash(token.address),
                    initSupply: Utils.comma(token.totalSupply),
                    createTime: Utils.timeStampToDate(token.createTime)
                }
            })

            this.$log.debug('myItems>>', this.myItems)


        },
        async getTokenList() {
            let docs = await Firestore.getTokenList(Utils.network)
            this.items = docs.map(doc => {
                let token = doc.data()
                return {
                    name: token.name,
                    symbol: token.symbol,
                    owner: token.owner,
                    ownerUrl: Utils.link('address', token.owner),
                    ownerText: Utils.shortHash(token.owner),
                    decimals: token.decimals,
                    networkType: token.network,
                    contractAddress: token.address,
                    contractAddressUrl: `/tokens/${token.address}`,
                    contractAddressText: Utils.shortHash(token.address),
                    initSupply: Utils.comma(token.totalSupply),
                    createTime: Utils.timeStampToDate(token.createTime)
                }
            })
        },
        goForm() {
            location.href = '/tokens/new'
        },
        async checkNetwork() {
            const host = location.host
            let network = host.substring(0, host.indexOf('.')).toLowerCase() || "ropsten"
            try {
                let web3 = Utils.getWeb3()
                this.networkType = await web3.eth.net.getNetworkType()
                let tmpCoinbase = await web3.eth.getCoinbase()
                this.coinbase = Utils.shortHash(tmpCoinbase)
                this.getMyTokenList(tmpCoinbase)
                this.networkType = this.networkType == 'main' ? 'mainnet' : this.networkType
                if (network != this.networkType) {
                    location.href = `https://${this.networkType}.gncloud.io/tokens`
                }
                this.networkTypeText = Utils.capitalizeFirstLetter(this.networkType)
                if (this.coinbase == '') {
                    this.coinbase = '연결안됨'
                }
            } catch(e) {
                this.$log.debug(e)
                this.coinbase = '연결안됨'
                this.networkTypeText = '연결안됨'
            } finally {
                setTimeout(this.checkNetwork, 5000)
            }
            
        },
    }
}

</script>