import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },{
    path: '/flightDiagram',
    name: 'flightDiagram',
    component: () => import('../views/echarts/flightDiagram.vue')
  },{
    path: '/baidumap',
    name: 'baidumap',
    component: () => import('../views/baidumap/index.vue')
  },{
    path: '/from',
    name: 'from',
    component: () => import('../views/from/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
