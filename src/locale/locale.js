import { createStore } from 'vuex'

export default createStore({
    state: {
        locale: 'uz', 
    },
    mutations: {
        setLocale(state, locale) {
            state.locale = locale
        },
        
    },
    actions: {
        
    },
    getters: {
     
    },
})
