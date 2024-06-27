import { useField, useForm } from 'vee-validate';
import * as yup from 'yup'






export function useRequestForm(aa){

    const {handleSubmit, isSubmitting} = useForm({
        initialValues:{
            status:'active'
        }
    })
        const {value:fio, errorMessage:fioError, handleBlur:fioBlur} = useField('fio',
        yup 
            .string()
            .trim()
            .required('FIOni kiritish majburiy')
        )
        const {value:phone, errorMessage:phoneError, handleBlur:phoneBlur} = useField('Telefon',
        yup 
            .string()
            .trim()
            .required('Telefonni kiritsh majburiy')

        )
        const {value:summa, errorMessage:summaError, handleBlur:summaBlur} = useField('Summa',
        yup 
            .string()
            .trim()
            .required('Summani kiritsh majburiy')

        )
        const {value:status }=useField('status')
       
        const submit = handleSubmit(aa)




        return{
            fio,
            fioError,
            fioBlur,
            phone,
            phoneBlur,
            phoneError,
            summa,
            summaBlur,
            summaError,
            status,
            submit,
            isSubmitting
        }
}