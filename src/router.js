import Vue from 'vue'
import Router from 'vue-router'

import TokenDetail from './views/TokenDetail'
import CreateFormToken from './views/CreateFormToken'
import CreateTokenConfirm from './views/CreateTokenConfirm'
import CreateToken from './views/CreateToken'
import TokenList from './views/TokenList'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/tokens",
            name: "TokenList",
            component: TokenList,
            props: false
        },
        {
            path: "/tokens/new",
            name: "CreatedToken",
            component: CreateFormToken,
            props: false
        },
        {
            path: "/tokens/confirm",
            name: "CreateTokenConfirm",
            component: CreateTokenConfirm,
            props: {
                token: true
            }
        },
        // {
        //     path: "/tokens/create",
        //     name: "CreateToken",
        //     component: CreateToken,
        //     props: {
        //         token: true
        //     }
        // },
        {
            path: "/tokens/:token",
            name: "TokenDetail",
            component: TokenDetail,
            props: {
                token: true
            }
        }
    ]
})