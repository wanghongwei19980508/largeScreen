import Vue from 'vue'
import VueRouter from 'vue-router'
import Title from '../components/hearder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // component: Title,
    name: 'Index',
    meta: { title: '产生链生态', icon: 'dashboard' },
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/index',
    component: Title,
    redirect: '/index',
    meta: { title: '产生链生态', icon: 'dashboard' },
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'),
      }, {
        path: '/index/flightDiagram',
        name: 'flightDiagram',
        meta: { title: '国际制造业数据库', icon: 'dashboard' },
        component: () => import('../views/computent/echarts/flightDiagram.vue'),
      }, {
        path: '/baidumap',
        name: 'baidumap',
        component: () => import('../views/computent/baidumap/index.vue')
      }, {
        path: '/from',
        name: 'from',
        component: () => import('../views/from/index.vue')
      }, {
        path: '/index/manufacturingMonitoring',
        name: 'manufacturingMonitoring',
        meta: { title: '国际制造业监测', icon: 'dashboard' },
        component: () => import('../views/manufacturingMonitoring/index.vue')
      }, {
        path: '/index/industrialRelief',
        name: 'industrialRelief',
        meta: { title: '产业救济', icon: 'dashboard' },
        component: () => import('../views/industrialRelief/index.vue')
      }, {
        path: '/index/supplyChainPolicy',
        name: 'supplyChainPolicy',
        meta: { title: '国际供应链政策', icon: 'dashboard' },
        component: () => import('../views/supplyChainPolicy/index.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
