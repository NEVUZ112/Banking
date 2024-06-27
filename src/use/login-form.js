import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'
import {computed, watch} from 'vue'
import {useStore} from 'vuex'
import { useRouter } from 'vue-router';





export function useLoginForm(){
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()
        const {value:email, errorMessage:emailError, handleBlur:emailBlur} = useField('email',
        yup 
            .string()
            .trim()
            .required('Emailni kiritish majburiy')
            .email('eMailni to`g`ri kiriting')
        )
        const {value:password, errorMessage:passwordError, handleBlur:passwordBlur} = useField('password',
        yup 
            .string()
            .trim()
            .required('Parolni kiritsh majburiy')
            .min(6,'Eng kamida 6ta belgi bo`lshi shart')

        )
        const submit = handleSubmit( async values =>{
            store.dispatch('auth/login',values)
            router.push('/')
        })


        const urinishSoni = computed(()=> submitCount.value>3)

        watch(urinishSoni, val=>{
            if(val){
                setTimeout(()=>{
                    submitCount.value=0
                },3000)
            }
        })


        return{
            email,
            emailError,
            emailBlur,
            password,
            passwordError,
            passwordBlur,
            submit,
            isSubmitting,
            urinishSoni
        }
}