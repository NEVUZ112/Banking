<template>
  <div>
    <h1 v-if="userData && userData.requests.length > 0">{{ userData.requests[0].fio }}</h1>
    <RequestUser />
    <button @click="goBack" class="btn-back">Orqaga qaytish</button>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import RequestUser from '../components/request/RequestUser.vue';
export default defineComponent({
  name: 'ViewUser',
  components: {
    RequestUser
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const userData = computed(() => store.getters.userData);

    const goBack = () => {
      router.push({ name: 'Analitika' });
    };

    return {
      userData,
      goBack
    };
  }
});
</script>

<style>

.btn-back {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-back:hover {
  background-color: #0056b3;
}
</style>
