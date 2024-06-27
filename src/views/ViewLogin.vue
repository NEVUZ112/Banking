  <template>
    <form action="" @submit.prevent="submit">
        <h3>Kirish</h3>
        <div :class="['form-control',{'invalid':emailError}]">
            <label for="email">Email</label>
            <input
             type="email" 
             v-model="email" 
             id="email" 
             name="email"
             @blur="emailBlur">
            <small v-if="emailBlur"  class="invalid">{{ emailError }}</small>
        </div>
        <div :class="['form-control',{'invalid':passwordError}]">
            <label for="password">Password</label>
            <input 
            type="password"
            v-model="password"
            id="password"
            name="password" 
            @blur="passwordBlur">
            <small v-if="passwordBlur" class="invalid">{{ passwordError }}</small>
        </div>
        <input type="submit" value="Kirish" class="btn success" :disabled="isSubmitting  || urinishSoni">
        <button class="btn success" @click.prevent="test">Google orqali kirish</button>
        <div v-if="isSubmitting">Saytga kirilmoqda...</div>
        <div v-if="urinishSoni">Urunishlar ko`payib ketti, iltimos kuting!...</div>

    </form>
</template>

<script>
    import {useLoginForm} from '../use/login-form'
    import { useRoute, useRouter } from 'vue-router';
    import { useStore } from 'vuex';
    import { error } from '../utils/error'
    import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
    import {initializeApp} from 'firebase/app'

   export default {
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        if(route.query.message){
            store.dispatch('setMessage',{
                status:'danger',
                title:'Xatolik!',
                text:error(route.query.message)
            }, {root:true})
        }
        const firebaseConfig = {
            apiKey: "AIzaSyD0eTcqcf-36KWLhq4zaLXq94UjatJUMJU",
            authDomain: "amaliyotvue01.firebaseapp.com",
            databaseURL: "https://amaliyotvue01-default-rtdb.firebaseio.com",
            projectId: "amaliyotvue01",
            storageBucket: "amaliyotvue01.appspot.com",
            messagingSenderId: "962262224314",
            appId: "1:962262224314:web:8d6cb4ba0901a8553be183",
            measurementId: "G-FN35KJDHHL"
        };
        const app = initializeApp(firebaseConfig)
        
        const provider = new GoogleAuthProvider()
        
        const test = async ()=>{
            const auth = getAuth();
            signInWithPopup(auth, provider).then(function(result) {
                const token = result.user.accessToken;
                store.commit('auth/setToken', token)
                router.push('/')
            }) 
        
        
        }
        
        
        return{
            ...useLoginForm(),
            test,
            app
        }
    }
   }
</script>