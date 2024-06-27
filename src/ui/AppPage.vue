<template>
  <router-link to="/" v-if="back" class="text-white">{{ t('backToHomePage') }}</router-link>
  <div class="card">
    <h2 class="custom-title">{{ t(title) }}</h2>
    <slot></slot>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  props: ['title', 'back'],
  setup(props) {
    const t = inject('i18n').global.t;

    document.title = `${t(props.title)} | ${t('bank')}`;

    return {
      t
    };
  }
}
</script>

<style scoped>
.card h2 {
  text-align: center;
  font-size: 50px;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
  padding: 10px;
  border-bottom: 2px solid #3eaf7c;
  display: inline-block;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
