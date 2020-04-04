import Vue from 'vue'
import Vuex from 'vuex'

import ingredients from './modules/ingredients'
import toasts from './modules/toasts'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        ingredients,
        toasts
    },
    strict: debug,
    //plugins: debug ? [createLogger()] : []
})