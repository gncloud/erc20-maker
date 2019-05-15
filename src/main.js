import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLogger from 'vuejs-logger'
import LoggerConfig from './Logger'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate';
import './global.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLogger, LoggerConfig)
Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: 'veeFields'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
