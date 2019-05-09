<template>
    <b-container class="text-center cover-container">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">토큰 생성</span>
        </div>
        <div class="text-center my-3 wallet-info">
            <b-button v-if="metamaskError !== null" variant="danger" v-b-popover.hover="`${metamaskError}`" >계정</b-button>
            <b-button v-if="metamaskError === null" variant="light" v-b-popover.hover="`사용자: ${owner} \n네트워크: ${networkType}`" >계정</b-button>
        </div>
        
        <b-form @submit="next">
            <div class="text-left mt-5">
                <b-form-group
                    label="토큰 이름"
                    label-for="name"
                    description=""
                >
                    <b-form-input
                        ref="name"
                        type="text"
                        required
                        placeholder=""
                        minlength="3"
                        maxlength="25"
                        v-model="name"
                        name="name"
                        v-validate="{ required: true, regex: /[a-zA-Z- ]+/, min: 3, max: 25}"
                        :state="validateState('name')"
                        aria-describedby="name-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="name-live-feedback">
                        3-25 자리로 영문자로 작성. 공백, 하이픈도 가능.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    label="토큰 심볼"
                    label-for="symbol"
                    description=""
                >
                    <b-form-input
                        ref="symbol"
                        type="text"
                        required
                        placeholder=""
                        minlength="3"
                        maxlength="10"
                        v-model="symbol"
                        name="symbol"
                        v-validate="{ required: true, alpha_spaces: true, alpha_dash: true, min: 3, max: 25}"
                        :state="validateState('symbol')"
                        aria-describedby="symbol-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback class="show" id="symbol-live-feedback">
                        3-4글자 영문자. 공백허용안됨.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    label="소수점수"
                    label-for="decimals"
                    description=""
                >
                    <b-form-input
                        ref="decimals"
                        type="number"
                        required
                        placeholder=""
                        v-model="decimals"
                        name="decimals"
                        v-validate="{ required: true, numeric: true, min: 1, max: 2, min_value:0, max_value:18}"
                        :state="validateState('decimals')"
                        aria-describedby="decimals-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="decimals-live-feedback">
                        토큰을 더 쪼갤수 있는 소수점 자릿수를 나타내며, 0-18 사이의 정수 허용.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    label="총발행량"
                    label-for="totalSupply"
                    description=""
                >
                    <b-form-input
                        ref="totalSupply"
                        type="number"
                        required
                        placeholder=""
                        v-model="totalSupply"
                        name="totalSupply"
                        v-validate="{ required: true, numeric: true, min: 3, max: 25}"
                        :state="validateState('totalSupply')"
                        aria-describedby="totalSupply-live-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="totalSupply-live-feedback">
                        생성할 토큰의 총 갯수. 최소1에서 최대 1000000000000000 가능.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    label="옵션"
                    label-for=""
                    description=""
                >
                    <b-form-checkbox
                        ref="isAdditional"
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
                        <b-link @click="toggleAdvancedOptions()">
                            고급 옵션
                        </b-link>
                    </template>
                    <div
                            class="d-none"
                            ref="AdvancedOptions">
                        
                        <b-form-group
                            label="가스가격 (GWEI)"
                            label-for=""
                            class=""
                            description=""
                        >
                            <b-form-input
                                ref="gasPrice"
                                type="number"
                                required
                                placeholder="10"
                                v-model="gasPrice"
                                name="gasPrice"
                                v-validate="{ required: true, numeric: true, min: 1}"
                                :state="validateState('gasPrice')"
                                aria-describedby="gasPrice-live-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="gasPrice-live-feedback">
                                
                            </b-form-invalid-feedback>
                        </b-form-group>

                        <b-form-group
                            label="가스제한"
                            label-for=""
                            class=""
                            description=""
                        >
                            <b-form-input
                                ref="gasLimit"
                                type="number"
                                required
                                placeholder="21000"
                                v-model="gasLimit"
                                name="gasLimit"
                                v-validate="{ required: true, numeric: true, min: 1}"
                                :state="validateState('gasLimit')"
                                aria-describedby="gasLimit-live-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="gasLimit-live-feedback">
                                
                            </b-form-invalid-feedback>
                        </b-form-group>

                    </div>
                </b-form-group>

                
                <div class="text-center mt-4">
                    <b-button type="submit" variant="primary" class="mr-2">다음</b-button>
                    <b-link href="/" class="text-danger ml-2">취소</b-link>
                </div>
            </div>
        </b-form>
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
            totalSupply: null,
            gasLimit: 2100000,
            gasPrice: 10,
            networkType: null,
            owner: null,
            metamaskError: null
        }
    },
    created() {
        this.checkNetwork()
        if (Object.keys(this.$route.params).length != 0) {
            this.name = this.$route.params.name
            this.symbol = this.$route.params.symbol
            this.decimals = this.$route.params.decimals
            this.isAdditional = this.$route.params.isAdditional
            this.totalSupply = this.$route.params.totalSupply
            this.gasLimit = this.$route.params.gasLimit
            this.gasPrice = this.$route.params.gasPrice / 1000000000
        }
    },
    mounted() {
        this.$refs.name.focus()
        // this.$el.querySelectorAll('.invalid-feedback').forEach(el => {
        //     el.style.display = 'block'
        //     el.style.color = 'gray'
        // })
    },
    methods: {
        async checkNetwork() {
            const host = location.host
            let network = host.substring(0, host.indexOf('.')).toLowerCase() || "ropsten"
            try {
                let web3 = Utils.getWeb3()
                this.networkType = await web3.eth.net.getNetworkType()
                this.owner = Utils.shortHash(await web3.eth.getCoinbase())
                this.networkType = this.networkType == 'main' ? 'mainnet' : this.networkType
                if (network != this.networkType) {
                    location.href = `https://${this.networkType}.gncloud.io/tokens`
                }
                this.metamaskError = null
            } catch(e) {
                this.networkType = ''
                this.owner = ''
                this.metamaskError = '계정과 연결이 되지 않았습니다.'
            } finally {
                setTimeout(this.checkNetwork, 1000)
            }
            
        },
        toggleAdvancedOptions() {
            this.$refs.AdvancedOptions.classList.toggle('d-none')
        },
        async next() {
            this.$data.decimalsText = Utils.comma(this.$data.decimals)
            this.$data.totalSupplyText = Utils.comma(this.$data.totalSupply)
            // this.$data.initSupplyText = Utils.comma(this.$data.initSupply)
            this.$data.gasPrice = this.gasPrice * 1000000000
            this.$data.gasPriceText = Utils.comma(this.gasPrice)
            this.$data.gasLimitText = Utils.comma(this.gasLimit)
            this.$router.push({
                name: 'CreateTokenConfirm',
                params: this.$data
            })
            return false
        },
        validateState(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.errors.has(ref)
            }
            return null
        },
        validator(value, args) {
            this.$log.debug(value, args)
        // Return a Boolean or a Promise that resolves to a boolean.
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
