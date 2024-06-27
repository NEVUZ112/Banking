// import axios from 'axios'
import axios from "../../axios/request"
import {error} from '../../utils/error.js'
import store from  '../index'
export default {
    namespaced:true, 
    state(){
        return {
            requests: []
        }
    },
    mutations:{
        setRequests(state,requests){
            state.requests = requests
        },
        addRequests(state,requests){
            state.requests.push(requests)

        }
    },
    
    actions: {
        async create({commit,dispatch},payload) {
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.post(`/requests.json?auth=${token}`, payload)
                commit('addRequests',{...payload,id:data.name})
                console.log(data)
                dispatch('setMessage', {
                    status:'primary',
                    text:'Ariz muvaffaqiyatli bajarildi!'
                } , {root:true})
            }
            catch(e){
                dispatch('setMessage',{
                    status:'danger',
                    text:error(e)   
                }, {root:true})
            }
        },
        async load({commit,dispatch}) {
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests.json?auth=${token}`)
                const requests = Object.keys(data).map(id=>({...data[id],id}))
                commit('setRequests',requests)
                
            }
            catch(e){
                dispatch('setMessage',{
                    status:'danger',
                    text:error(e)
                }, {root:true}) 
            }
        },
        async loadById({dispatch}, id) {
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.get(`/requests/${id}.json?auth=${token}`)
                // const requests = Object.keys(data).map(id=>({...data[id],id}))
                return data
                
            }
            catch(e){
                dispatch('setMessage',{
                    status:'danger',
                    text:error(e)
                }, {root:true}) 
            }
        },
        async updateById({dispatch}, request) {
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.put(`/requests/${request.id}.json?auth=${token}`,request)
                return data
                
            }
            catch(e){
                dispatch('setMessage',{
                    status:'danger',
                    text:error(e)
                }, {root:true}) 
            } 
        },
        async removeById({dispatch}, id) {
            try{
                const token = store.getters['auth/token']
                const {data} = await axios.delete(`/requests/${id}.json?auth=${token}`)
                dispatch('setMessage',{
                    status:'danger',
                    text:'ochirldi'
                }, {root:true}) 
                return data
            }
            catch(e){
                dispatch('setMessage',{
                    status:'danger',
                    text:error(e)
                }, {root:true}) 
            }
        }
    },
    getters:{
        requests(state){
            return state.requests
        }
    }
}