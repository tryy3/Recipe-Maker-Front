import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import './styles/output.css'

import App from './App.vue'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes,
});
console.log(store);

new Vue({
    router,
    el: '#app',
    render: h => h(App),
    store,
    methods: {
        createToast(level, message) {
            toasts.push({
                level,
                message,
                id: toasts.length,
            });
            console.log(toasts);
        },
        removeToast(id) {
            for (const i in toasts) {
                if (toasts[i].id == id) {
                    toasts.splice(i, 1);
                    return;
                }
            }
        }
    },
    data: {
        ...store,
    }
})
