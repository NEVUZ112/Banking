<template>
    <form @submit.prevent="submit">
      <div :class="['form-control', { 'invalid': fioError }]">
        <label for="fio">{{ t('translate.form.fio') }}</label>
        <input
          type="text"
          v-model="fio"
          id="fio"
          name="fio"
          @blur="fioBlur">
        <small v-if="fioError" class="invalid">{{ fioError }}</small>
      </div>
      <div :class="['form-control', { 'invalid': phoneError }]">
        <label for="phone">{{ t('translate.form.phone') }}</label>
        <input
          type="number"
          v-model="phone"
          id="phone"
          name="phone"
          @blur="phoneBlur">
        <small v-if="phoneError" class="invalid">{{ phoneError }}</small>
      </div>
      <div :class="['form-control', { 'invalid': summaError }]">
        <label for="summa">{{ t('translate.form.summa') }}</label>
        <input
          type="number"
          v-model="summa"
          id="summa"
          name="summa"
          @blur="summaBlur">
        <small v-if="summaError" class="invalid">{{ summaError }}</small>
      </div>
      <div class="form-control">
        <label for="status" class="label">{{ t('translate.form.status') }}</label>
        <select v-model="status">
          <option value="done">{{ t('translate.form.done') }}</option>
          <option value="cancelled">{{ t('translate.form.cancelled') }}</option>
          <option value="active">{{ t('translate.form.active') }}</option>
          <option value="sending">{{ t('translate.form.sending') }}</option>
        </select>
      </div>
      <input type="submit" :value="t('translate.form.save')" class="btn success" :disabled="isSubmitting">
      <div v-if="isSubmitting">{{ t('translate.form.submitting') }}</div>
    </form>
  </template>
  
  <script>
  import { useRequestForm } from '../../use/request-form'
  import { useStore } from 'vuex'
  import { inject } from 'vue'
  
  export default {
    emits: ['created'],
    setup(_, { emit }) {
      const store = useStore()
      const i18n = inject('i18n')
      const t = (key) => i18n.global.t(key)
      const submit = async (values) => {
        await store.dispatch('request/create', values)
        emit('created')
      }
  
      return {
        ...useRequestForm(submit),
        t
      }
    }
  }
  </script>
  
  <style>
  /* Style code here */
  </style>
  