<template>
    <b-container class="text-center cover-container">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">토큰 생성</span>
        </div>

        <div class="text-left mt-5">
            <b-form-group
                label="토큰 이름"
                label-for="name"
                description="토큰의 이름이며 3~25 자리로 영문자로 작성해주세요. 공백, 하이픈도 가능합니다."
            >
                <b-form-input
                id="name"
                type="text"
                required
                placeholder="CU Coin"
                minlength="3"
                maxlength="25"
                v-model="name"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="토큰 심볼"
                label-for="symbol"
                description=""
            >
                <b-form-input
                id="symbol"
                type="text"
                required
                placeholder="CUC"
                minlength="3"
                maxlength="10"
                v-model="symbol"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="소수점수"
                label-for="decimals"
                description=""
            >
                <b-form-input
                id="decimals"
                type="number"
                required
                placeholder="18"
                v-model="decimals"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="총발행량"
                label-for="totalSupply"
                description=""
            >
                <b-form-input
                id="decimals"
                type="number"
                required
                placeholder="1000000000"
                v-model="totalSupply"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="초기발행량"
                label-for="initSupply"
                description=""
            >
                <b-form-input
                id="decimals"
                type="number"
                required
                placeholder="1000000000"
                v-model="initSupply"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="옵션"
                label-for=""
                description=""
            >
                <b-form-checkbox
                    id="isAdditional"
                    v-model="isAdditional"
                    value="accepted"
                    unchecked-value="not_accepted"
                    >
                    향후추가발행여부
                </b-form-checkbox>
            </b-form-group>


            <b-form-group
                label="고급"
                label-for=""
                description=""
            >
                <template slot="label">
                    <b-button 
                        variant="secondary"
                        @click="toggleAdvancedOptions()"
                    >
                        고급 옵션
                    </b-button>
                </template>
                <b-form inline 
                        class="d-none"
                        ref="AdvancedOptions">
                    
                    <b-form-group
                        label="가스가격 (GWEI)"
                        label-for=""
                        class="mr-2"
                        description=""
                    >
                        <b-form-input
                            id="gasPrice"
                            type="number"
                            required
                            placeholder="10"
                            v-model="gasPrice"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                        label="가스제한"
                        label-for=""
                        class="ml-2"
                        description=""
                    >
                        <b-form-input
                            id="gasLimit"
                            type="number"
                            required
                            placeholder="21000"
                            v-model="gasLimit"
                        ></b-form-input>
                    </b-form-group>

                </b-form>
            </b-form-group>
            <div class="text-center mt-4">
                <b-button variant="primary" class="mr-2" @click="next()">다음</b-button>
                <b-link href="/" class="text-danger ml-2">취소</b-link>
            </div>
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
    name: "CreatedToken",
    data() {
        return {
            name: '',
            symbol: '',
            decimals: 0,
            isAdditional: 'accepted',
            totalSupply: 0,
            initSupply: 1000000000,
            gasLimit: 2100000,
            gasPrice: 10
        }
    },
    created() {
        this.checkNetwork()
    },
    methods: {
        async checkNetwork() {
            const host = location.host
            let network = host.substring(0, host.indexOf('.')).toLowerCase() || "ropsten"
            let web3 = Utils.getWeb3()
            let networkType = await web3.eth.net.getNetworkType()
            this.$log.debug('page network: ', network, 'metamask network', networkType)
            networkType = networkType == 'main' ? 'mainnet' : networkType
            if (network != networkType) {
                location.href = `https://${networkType}.gncloud.io/tokens`
                // location.href = `http://${networkType}.gn.io:8080/tokens`
            }
        },
        toggleAdvancedOptions() {
            this.$refs.AdvancedOptions.classList.toggle('d-none')
        },
        async next() {
            if(!this.validation()) {
                return false
            }
            this.$data.decimalsText = Utils.comma(this.$data.decimals)
            this.$data.totalSupplyText = Utils.comma(this.$data.totalSupply)
            this.$data.initSupplyText = Utils.comma(this.$data.initSupply)
            this.$data.gasPrice = this.gasPrice * 1000000000
            this.$data.gasPriceText = Utils.comma(this.gasPrice)
            this.$data.gasLimitText = Utils.comma(this.gasLimit)
            this.$router.push({
                name: 'CreateTokenConfirm',
                params: this.$data
            })
            return false
        },
        validation() {
            if (this.name === '' || this.name.length < 3 && 25 < this.name.length) {
                alert('이름의 길이가 안맞습니다.')
                return false
            }
            if (/[^a-zA-Z- ]+/.test(this.name)) {
                alert('이름은 영문자로 작성해주세요. 공백, 하이픈도 가능합니다.')
                return false
            }
            if (this.symbol === '' || this.symbol.length < 3 && 10 < this.symbol.length) {
                alert('심볼의 길이가 안맞습니다.')
                return false
            }
            if (/[^a-zA-Z]+/.test(this.symbol)) {
                alert('심볼은 영문자로 작성해주세요.')
                return false
            }
            if (this.decimals < 0) {
                alert('소수점수는 숫자로 입력해주세요.')
                return false
            }
            if (this.totalSupply < 0) {
                alert('총발행량은 숫자로 입력해주세요.')
                return false
            }
            if (this.initSupply < 0) {
                alert('초기발행량은 숫자로 입력해주세요.')
                return false
            }
            return true
        },
        transfer() {
            // this.token.networkType = await web3.eth.net.getNetworkType()
            // clonedContract.methods.transfer('0x430d4b747080A78F362D5F9E711215Ccd08e364a', 1)
                //     .send({from: this.from, gas: this.gasLimit})
                //     .on('transactionHash', (hash) => {
                //         this.$log.debug('--- TRANSACTION_HASH ---')
                //         this.$log.debug(hash)
                //     })
                //     .on('confirmation', (confirmations, receipt) => {
                //         this.$log.debug('--- CONFIRMATION ---')
                //         this.$log.debug(confirmations)
                //         this.$log.debug(receipt)
                //     })
                //     .on('receipt', (receipt) => {
                //         this.$log.debug('--- RECEIPT ---')
                //         this.$log.debug(receipt)
                //     })
                //     .on('error', (error, receipt, confirmations) => {
                //         this.$log.debug('--- ERROR ---')
                //         this.$log.debug(error)
                //         this.$log.debug(receipt)
                //         this.$log.debug(confirmations)
                //     })
        }
    }
}

// 가스리밋: 10
// 가스가격: 1100
// token call page footer mt-5
// param text to Object send
// 이더리움 로고 클릭시 메인페이지 이동.

</script>
