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

            <b-button class="mr-2" @click="next()">
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
// import Utils from '../Utils'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import Firestore from '../Firestore'

export default {
    data() {
        return {
            isLoading: false,
            networkTypeText: null,
            coinbase: null,
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
        this.fund = this.$route.params
        this.$log.debug(this.fund)
    },
    methods: {
        goForm() {
            location.href = '/fund/new'
        },
        back() {
            this.$router.replace({
                name: 'CreateFundForm',
                params: Object.assign({}, this.fund)
            })
        },
        next() {
            this.$router.replace({
                name: 'FundDetail',
                params: Object.assign({}, this.fund)
            })
        }
    }


}
</script>