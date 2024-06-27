// import axios from 'axios'
import axios from "axios"
import {error} from '../../utils/error.js'
export default {
    namespaced:true,
    state(){
        return {
            token:localStorage.getItem('jwt-token')
        }
    },
    mutations:{
        setToken(state,token){
            state.token = token
            localStorage.setItem('jwt-token',token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem('jwt-token')

        }
    },
    
    actions: {
        async login({ commit, dispatch }, payload) {
            // https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=[API_KEY]
            try{
                const url =`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${import.meta.env.VITE_APP_FB_KEY}`
                const {data} = await axios.post(url, { ...payload, returnSecureToken: true })
                
                commit('setToken',data.idToken) 
                dispatch('setMessage', null , {root:true})
            }
            catch(e){
                // throw new Error ('Farosatni ishlatib Parol yoki Email xatoligini tekshir!')
                // console.log('Login xatosi:', e.response ? e.response.data.error.message : e.message);
                dispatch('setMessage',{
                    status:'danger',
                    title:'Xatolik!',
                    text:error(e.response.data.error.message)
                }, {root:true})

            }
        }
    },
    getters:{
        token(state){
            return state.token
        },
        isAuthenticated(_,getters){
            return !! getters.token
        }
    }
}