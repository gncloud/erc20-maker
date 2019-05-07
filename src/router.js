import Vue from 'vue'
import Router from 'vue-router'

import TokenDetail from './views/TokenDetail'
import CreatedToken from './views/CreatedToken'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/tokens",
            name: "CreatedToken",
            component: CreatedToken
        },
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