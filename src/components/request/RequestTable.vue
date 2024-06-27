<template>
  <h3>{{ t('translate.requests.title') }}</h3>
  <table v-if="paginatedSahifa.length" class="table">
    <thead>
      <tr>
        <th>{{ t('translate.requests.number') }}</th>
        <th>{{ t('translate.requests.fio') }}</th>
        <th>{{ t('translate.requests.phone') }}</th>
        <th>{{ t('translate.requests.sum') }}</th>
        <th>{{ t('translate.requests.status') }}</th>
        <th>{{ t('translate.requests.actions') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(req, idx) in paginatedSahifa" :key="req.id">
        <td>{{ (currentPage - 1) * sanoq + idx + 1 }}</td>
        <td>{{ req.fio }}</td>
        <td>{{ req.Telefon }}</td>
        <td>{{ currency(req.Summa) }}</td>
        <td><app-status :type="req.status"></app-status></td>
        <td>
          <router-link :to="{name:'Request',params:{id:req.id}}">
            <button class="btn success">{{ t('translate.requests.open') }}</button>
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-else>{{ t('translate.requests.noData') }}</div>
  <div v-if="totalPages > 1" class="pagination">
    <button class="btn" @click="prevPage" :disabled="currentPage === 1">{{ t('translate.requests.prev') }}</button>
    <button class="btn" @click="changePage(sahifa)" v-for="sahifa in totalPages" :key="sahifa" :class="{ active: sahifa === currentPage }">
      {{ sahifa }}
    </button>
    <button class="btn" @click="nextPage" :disabled="currentPage === totalPages">{{ t('translate.requests.next') }}</button>
  </div>
</template>
<script>
import AppStatus from '@/ui/AppStatus.vue'
import { ref, computed, inject } from 'vue';
import { currency } from '../../utils/currency'

export default {
  props: ['requests'],
  setup(props) {
    const currentPage = ref(1);
    const sanoq = ref(10);
    const i18n = inject('i18n')
    const t = (key) => i18n.global.t(key)
    const paginatedSahifa = computed(() => {
      const start = (currentPage.value - 1) * sanoq.value;
      const end = start + sanoq.value;
      return props.requests.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(props.requests.length / sanoq.value);
    });

    const changePage = (sahifa) => {
      currentPage.value = sahifa;
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    return {
      currentPage,
      sanoq,
      paginatedSahifa,
      totalPages,
      changePage,
      prevPage,
      nextPage,
      currency,
      t
    }
  },
  components: {
    AppStatus
  }
}
</script>
