import { createStore, createLogger } from 'vuex'
import auth from './moduls/auth-moduls'
import request from './moduls/request-moduls'

const plugins = []
if(process.env.NODE_ENV==='development'){
  plugins.push(createLogger())
}

export default createStore({
  
  plugins,
  state() {
    return{
      message: null,
      sidebar:false,
      userData: null
    }
  },
  mutations: {
    setMessage(state, message){
      state.message = message

    },
    setUserData(state, data) {
      state.userData = data;
    },
    removeMessage(state){
      state.message = null

    },
    setSidebar(state){
      state.sidebar = true

    },
    removeSidebar(state){
      state.sidebar = false

    }
  },
  actions: {
    setMessage({commit}, message){
      commit('setMessage',message)
      setTimeout(() => {
        commit('removeMessage')
        
      }, 5000);
    },
    updateUserData({ commit }, data) {
      commit('setUserData', data);
    }
  },
  getters: {
    userData: state => state.userData
  },
  modules: {
    auth,
    request
  }
})
