import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/page/Home.vue'
import Car from '../components/page/Car.vue'
import List from '../components/page/List.vue'
import Personal from '../components/page/Personal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/home', component: Home },
    { path: '/list', component: Car },
    { path: '/car', component: List },
    { path: '/personal', component: Personal },
    { path: '/*', redirect: '/home'}
  ]
})
