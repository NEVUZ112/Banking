<template>
    <div class="filter">
      <div class="form-control">
          <input v-model="name" type="text" :placeholder="t('translate.filter.placeholder')" name="" id="">
      </div>
  
      <div class="form-control">
          <select v-model="status">
              <option value="" disabled selected>{{ t('translate.filter.select') }}</option>
              <option value="done">{{ t('translate.filter.done') }}</option>
              <option value="cancelled">{{ t('translate.filter.cancelled') }}</option>
              <option value="active">{{ t('translate.filter.active') }}</option>
              <option value="sending">{{ t('translate.filter.sending') }}</option>
          </select>
      </div>
      <button v-if="isActive" @click="reset" class="btn primary">{{ t('translate.filter.reset') }}</button>
    </div>
  </template>
  
  <script>
  import { ref, watch, computed, inject } from 'vue'
  
  export default {
    emits: ['update:modelValue'],
    props: ['modelValue'],
    setup(_, { emit }) {
      const i18n = inject('i18n')
      const t = (key) => i18n.global.t(key)
      const name = ref('')
      const status = ref('')
      const isActive = computed(() => name.value || status.value)
  
      watch([name, status], values => {
        emit('update:modelValue', {
          name: values[0],
          status: values[1]
        })
      })
  
      const reset = () => {
        name.value = ''
        status.value = null
      }
  
      return {
        name,
        status,
        isActive,
        reset,
        t
      }
    }
  }
  </script>
  
  <style>
  /* Style code here */
  </style>
  