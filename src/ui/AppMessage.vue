<template>
    <div :class="['alert', message.status]"  v-if="message">
        <p class="alert-title">{{title}}</p>
        <p>{{message.text}}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>    
</template>
<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
export default {
    setup(){
        const store = useStore()
        const message = computed(()=> store.state.message)
        const Title_map = {
            primary:'Muvafaqqiyatli',
            danger:'Xatolik',
            warning:'Ogohlantirish'
        }
        const title = computed(()=> message.value.status ? Title_map[message.value.status] : null)
        return{ message, title,
            close: ()=> {store.commit('removeMessage')}
        }
    }
}
</script>
