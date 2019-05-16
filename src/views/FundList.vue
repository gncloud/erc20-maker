<template>
    <b-container class="text-center cover-container">
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto"></div>
            <div>
                <span class="service-name cursor-pointer" >ERC-20 펀딩</span>
            </div>
        </div>
        
        <div class="text-center my-3 wallet-info">
            <b-button :variant="networkType === 'Mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbase}`" >
                {{networkTypeText}}
            </b-button>
        </div>

        <div class="mt-5">
            <h3>지금 바로 ERC-20 토큰으로 펀딩을 받으세요!</h3>
        </div>
        <div class="mt-5">
            <b-button variant="primary" @click="goForm()">만들기</b-button>
        </div>

        <div class="mt-5">
            <h4>나의 펀딩</h4>
        </div>
        <b-table class="table mt-5" :fields="fundFields" :items="myItems" hover :show-empty="myItems.length == 0">
            <template slot="empty" :slot-scope="'scope'">
                <h4>생성한 펀딩이 없습니다.</h4>
            </template>
            <!-- <template slot="symbol" slot-scope="scope">
                <b-link target="_black" :href="scope.item.contractAddressUrl">{{ scope.value }}</b-link>
            </template> -->
        </b-table>

        <div class="mt-5">
            <h4>신규 펀딩</h4>
        </div>
        <b-table class="table mt-5" :fields="fundFields" :items="items" hover :show-empty="items.length == 0">
            <template slot="empty" :slot-scope="'scope'">
                <h4>생성한 펀딩이 없습니다.</h4>
            </template>
            <template slot="symbol" slot-scope="scope">
                <b-link target="_black" :href="scope.item.contractAddressUrl">{{ scope.value }}</b-link>
            </template>
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
import Utils from '../Utils'
import Firestore from '../Firestore'

export default {
    name: 'FundList',
    data() {
        return {
            networkType: null,
            networkTypeText: '연결안됨',
            coinbase: '연결안됨',
            fundFields: [
                { key: 'symbol',     label: '심볼',     sortable: false },
                { key: 'name',       label: '이름',     sortable: false },
                { key: 'cap',        label: '목표수량',  sortable: false },
                { key: 'state',      label: '상태',     sortable: false }
            ],
            items: [],
            myItems: []
        }
    },
    created() {
        this.networkType = Utils.network
        this.metamask()
        this.getFundList()
        this.getMyFundList()
    },
    methods: {
        async metamask() {
            let web3 = Utils.getWeb3()
            try {
                this.networkTypeText = Utils.capitalizeFirstLetter(await web3.eth.net.getNetworkType())
                if (this.networkTypeText === '') {
                    throw Error('Not Connection')
                }
            } catch(e) {
                this.$log.error(e)
                this.networkTypeText = '연결안됨'
            }
            try {
                this.owner = await web3.eth.getCoinbase()
                this.coinbase = Utils.shortHash(this.owner)
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
            this.$router.push({
                name: 'CreateFundForm'
            })
        },
        async getFundList() {
            let docs = await Firestore.getList('fund', Utils.network)
            this.items = docs.map(doc => {
                let fund = doc.data()
                return {
                    name: fund.name,
                    symbol: fund.symbol,
                    owner: fund.coinbase,
                    ownerUrl: Utils.link('address', fund.coinbase),
                    ownerText: Utils.shortHash(fund.coinbase),
                    contractAddress: fund.contract,
                    contractAddressUrl: `/tokens/${fund.contract}`,
                    contractAddressText: Utils.shortHash(fund.contract),
                    createTime: Utils.timeStampToDate(fund.createTime),
                    cap: Utils.comma(fund.cap),
                    state: '대기'
                }
            })
            this.$log.debug(this.items)
        },
        async getMyFundList() {
            this.$log.debug('coinbase>>', this.coinbase)
            let docs = await Firestore.getList('fund', Utils.network, this.owner)
            this.$log.debug(docs)
            this.myItems = docs.map(doc => {
                let fund = doc.data()
                return {
                    name: fund.name,
                    symbol: fund.symbol,
                    owner: fund.coinbase,
                    ownerUrl: Utils.link('address', fund.coinbase),
                    ownerText: Utils.shortHash(fund.coinbase),
                    contractAddress: fund.contract,
                    contractAddressUrl: `/tokens/${fund.contract}`,
                    contractAddressText: Utils.shortHash(fund.contract),
                    createTime: Utils.timeStampToDate(fund.createTime),
                    cap: Utils.comma(fund.cap),
                    state: '대기'
                }
            })
        }
    }
}
</script>