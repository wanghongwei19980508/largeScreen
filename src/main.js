import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BaiduMap from 'vue-baidu-map'
import dataV from '@jiaminghi/data-view'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/styles/index.less' // ruoyi css

Vue.use(BaiduMap, {
  ak: 'Du8PaPD0GPRb1XREYxsyUqENHaoljijF'
})
Vue.use(dataV)
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')