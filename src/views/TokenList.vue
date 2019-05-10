<template>
    <b-container class="text-center cover-container">
        <div class="text-center">
            <div class="eth-logo cursor-pointer logo-width m-auto"></div>
            <div>
                <span class="service-name cursor-pointer" >ERC-20 Token Maker</span>
            </div>
        </div>
        
        <div class="text-center my-3 wallet-info">
            <!-- <b-button :variant="token.networkType === 'mainnet' ? 'outline-success' : 'outline-danger'" 
                      v-b-popover.hover="`지갑주소: ${token.ownerText}`" >
                {{networkTypeText}}
            </b-button> -->
        </div>

        <div class="mt-5">
            <h3>지금 바로 ERC-20 토큰을 만드세요! </h3>
        </div>
        <div class="mt-5">
            <b-button variant="primary">만들기</b-button>
        </div>
        <div class="mt-5">
            <h4>신규 발행 코인들</h4>
        </div>
        <b-table class="table mt-5" :fields="tokenFields" hover headerTitle="aaa"></b-table>

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

export default {
    name: 'TokenList',
    data() {
        return {
            tokenFields: [
                { key: 'symbol',     label: '심볼',     sortable: false },
                { key: 'name',       label: '이름',     sortable: false },
                { key: 'initSupply', label: '초기발행량', sortable: false },
            ]
        }
    }
}

</script>