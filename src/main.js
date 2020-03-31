import Vue from 'vue'
import VueRouter from 'vue-router'

import './styles/output.css'

import App from './App.vue'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
})

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})
