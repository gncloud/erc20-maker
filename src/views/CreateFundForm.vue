<template>
    <b-container class="text-center cover-container">
        
        <div class="eth-logo"></div>
        <div>
            <span class="service-name">펀딩 생성</span>
        </div>
        <div class="text-center my-3 wallet-info">
            <b-button :variant="networkType === 'Mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${coinbase}`" >
                {{networkTypeText}}
            </b-button>
        </div>
    
    

        <b-form @submit="next()">
            <div class="text-left mt-5">
                <b-form-group
                    description="토큰메이커를 통해 생성된 ERC-20 토큰의 컨트랙트의 주소."
                    label="토큰 컨트랙트 주소"
                    label-for="contract"
                >
                    <b-form-input
                        ref="contract"
                        id="contract"
                        name="contract"
                        :state="validateState('contract')"
                        type="text"
                        required
                        placeholder=""
                        v-model="fund.contract"
                        v-validate="{ required: true, alpha_num: true, min: 42, max: 42 }"
                        aria-describedby="contract-live-feedback"
                    />
                    <b-form-invalid-feedback id="contract-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="펀딩 받은 ETH를 저장할 계좌주소"
                    label="펀당 계좌 주소"
                    label-for="coinbase"
                >
                    <b-form-input
                        ref="coinbase"
                        id="coinbase"
                        name="coinbase"
                        :state="validateState('coinbase')"
                        type="text"
                        required
                        placeholder=""
                        v-model="fund.coinbase"
                        v-validate="{ required: true, alpha_num: true, min: 42, max: 42 }"
                        aria-describedby="coinbase-live-feedback"
                    />
                    <b-form-invalid-feedback id="coinbase-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="1 ETH에 대해 제공할 토큰 갯수 (예: 토큰가격이 0.5ETH인 경우 비율은 2가됨)"
                    label="토큰비율"
                    label-for="rate"
                >
                    <b-form-input
                        ref="rate"
                        id="rate"
                        name="rate"
                        :state="validateState('rate')"
                        type="number"
                        required
                        placeholder=""
                        v-model="fund.rate"
                        v-validate="{ required: true, numeric: true }"
                        aria-describedby="rate-live-feedback"
                    />
                    <b-form-invalid-feedback id="rate-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="ETH의 펀딩목표량, 펀딩 시간 범위 내에서 목표에 도달하면 편딩은 성공한 것으로 간주되며, 그렇지 않을 경우 자금은 투자자에게 반환."
                    label="목표수량(ETH)"
                    label-for="cap"
                >
                    <b-form-input
                        ref="cap"
                        id="cap"
                        name="cap"
                        :state="validateState('cap')"
                        type="number"
                        required
                        placeholder=""
                        v-model="fund.cap"
                        v-validate="{ required: true, numeric: true }"
                        aria-describedby="cap-live-feedback"
                    />
                    <b-form-invalid-feedback id="cap-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="ETH의 펀딩 최대수량이며 상한에 도달하면 펀딩이 즉시 종료됨."
                    label="최대수량(ETH)"
                    label-for="maxSize"
                >
                    <b-form-input
                        ref="maxSize"
                        id="maxSize"
                        name="maxSize"
                        :state="validateState('maxSize')"
                        type="number"
                        required
                        placeholder=""
                        v-model="fund.maxSize"
                        v-validate="{ required: true, numeric: true }"
                        aria-describedby="maxSize-live-feedback"
                    />
                    <b-form-invalid-feedback id="maxSize-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="펀딩 시작일"
                    label="시작일"
                    label-for="open"
                >
                    <b-form-input
                        ref="open"
                        id="open"
                        name="open"
                        :state="validateState('open')"
                        type="date"
                        required
                        placeholder=""
                        v-model="fund.open"
                        v-validate="{ required: true }"
                        aria-describedby="open-live-feedback"
                    />
                    <b-form-invalid-feedback id="open-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>

                <b-form-group
                    description="펀딩 종료일"
                    label="종료일"
                    label-for="close"
                >   
                    <b-form-input
                        ref="close"
                        id="close"
                        name="close"
                        :state="validateState('close')"
                        type="date"
                        required
                        placeholder=""
                        v-model="fund.close"
                        v-validate="{ required: true }"
                        aria-describedby="close-live-feedback"
                    />
                    <b-form-invalid-feedback id="close-live-feedback">
                        형식에 맞게 입력해주세요.
                    </b-form-invalid-feedback>
                </b-form-group>


                <b-form-group description="">
                    <template slot="label">
                        <b-link @click="toggleAdvancedOptions()">
                            고급 옵션
                        </b-link>
                    </template>
                    <div class="d-none"
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
                                placeholder="3"
                                v-model="fund.gasPrice"
                                name="gasPrice"
                                v-validate="{ required: true, numeric: true, min: 1}"
                                :state="validateState('gasPrice')"
                                aria-describedby="gasPrice-live-feedback"
                            />
                            <b-form-invalid-feedback id="gasPrice-live-feedback">
                                형식에 맞게 입력해주세요.
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
                                v-model="fund.gasLimit"
                                name="gasLimit"
                                v-validate="{ required: true, numeric: true, min: 1}"
                                :state="validateState('gasLimit')"
                                aria-describedby="gasLimit-live-feedback"
                            />
                            <b-form-invalid-feedback id="gasLimit-live-feedback">
                                형식에 맞게 입력해주세요.
                            </b-form-invalid-feedback>
                        </b-form-group>

                    </div>
                </b-form-group>

                <div class="text-center mt-4">
                    <b-button 
                        type="submit" 
                        variant="primary" 
                        class="mr-2"
                    >다음
                    </b-button>
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
    name: 'CreateFundForm',
    data() {
        return {
            networkType: null,
            networkTypeText: '연결안됨',
            coinbase: '연결안됨',
            fund: {
                contract: null,
                coinbase: null,
                rate: null,
                cap: null,
                maxSize: null,
                open: null,
                close: null,
                gasPrice: 3,
                gasLimit: 2100000
            }
        }
    },
    created() {
        this.fund = Object.assign(this.fund, this.$route.params)
        this.networkType = Utils.network
        this.metamask()
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
        toggleAdvancedOptions() {
            this.$refs.AdvancedOptions.classList.toggle('d-none')
        },
        validateState(ref) {
            if (this.veeFields[ref] && (this.veeFields[ref].dirty || this.veeFields[ref].validated)) {
                return !this.errors.has(ref)
            }
            return null
        },
        next() {
            this.$router.push({
                name: 'CreateFundConfirm',
                params: Object.assign({}, this.fund)
            })
        }
    }
}
</script>