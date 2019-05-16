import Vue from 'vue'
import Router from 'vue-router'

import TokenDetail from './views/TokenDetail'
import CreateFormToken from './views/CreateFormToken'
import CreateTokenConfirm from './views/CreateTokenConfirm'
import TokenList from './views/TokenList'

import FundList from './views/FundList'
import FundDetail from './views/FundDetail'
import CreateFundForm from './views/CreateFundForm'
import CreateFundConfirm from './views/CreateFundConfirm'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [ 
        { path: "/tokens", name: "TokenList", component: TokenList, props: false },
        { path: "/tokens/new", name: "CreatedToken", component: CreateFormToken, props: false },
        { path: "/tokens/confirm", name: "CreateTokenConfirm", component: CreateTokenConfirm, props: { token: true } },
        { path: "/tokens/:token", name: "TokenDetail", component: TokenDetail, props: { token: true } },
        
        { path: "/fund", name: "FundList", component: FundList, props: false },
        { path: "/fund/new", name: "CreateFundForm", component: CreateFundForm, props: false },
        { path: "/fund/confirm", name: "CreateFundConfirm", component: CreateFundConfirm, props: false },
        { path: "/fund/:addr", name: "FundDetail", component: FundDetail, props: false },
        
    ]
})