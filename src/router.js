import Vue from 'vue'
import Router from 'vue-router'

import TokenDetail from './views/TokenDetail'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
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