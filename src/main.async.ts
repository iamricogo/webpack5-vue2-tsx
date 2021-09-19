import '@/styles/index.scss'
import 'normalize.css'
import App from '@/App'
import ElementUI from '@/plugins/element-ui'
import Swiper from '@/plugins/swiper'
import Vue from 'vue'
import i18n from '@/lang'
import router from '@/router'
import store from '@/store'

Vue.use(ElementUI).use(Swiper)
Vue.config.productionTip = false

new Vue({
  i18n,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
