import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.less' // ruoyi css
import './utils/Date.js'

Vue.use(BaiduMap, {
  ak: 'Du8PaPD0GPRb1XREYxsyUqENHaoljijF'
})
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
