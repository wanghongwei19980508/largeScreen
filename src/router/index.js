import Vue from 'vue'
import VueRouter from 'vue-router'
import Title from '../components/hearder'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: Title,
    redirect: '/index',
    meta: { title: '产生链生态', icon: 'dashboard' },
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/HomeView.vue'),
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
        path: '/index/chartList',
        name: 'chartList',
        meta: { title: '国际制造业数据库', icon: 'dashboard' },
        component: () => import('../views/chartList/index.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
