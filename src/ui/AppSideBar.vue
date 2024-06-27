<template>
  <div class="sidebar" v-if="sidebar">
    <span class="sidebar-close" @click="close" >&times;</span>
    <div class="sidebar-content">
      {{ t('translate.sidebar.greeting') }}        
      &clubs; &clubs; &clubs; &clubs; &clubs;&trade;&trade;
    </div>

    <br><br><br>
    <button @click="close" class="btn primary">{{ t('translate.sidebar.close') }}</button>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, inject } from 'vue';
export default {
  setup() {
    const store = useStore();
    const i18n = inject('i18n');
    const t = (key) => i18n.global.t(key);
    const sidebar = computed(() => store.state.sidebar);

    return {
      t,
      sidebar,
      close: () => {
        store.commit('removeSidebar');
      }
    };
  }
}
</script>

<style>
/* Add your styles here */
</style>
