<template>
  <app-loader v-if="loader"></app-loader>
  <app-page :title="pageTitle" v-else >
    <AppCarusel></AppCarusel>
    <h2 style="text-align:center;font-size:50px;  ">About Our</h2>
    <RequestCard :requests="requests" class="card" style="padding:30px; background-color:#333"></RequestCard>
    <h2 style="text-align:center;font-size:50px;  ">About Our Table</h2>

    <RequestChart :requests="requests" class="chart"></RequestChart>
     <br> <br> <br> <br> <br>
  </app-page>
</template>

<script>
import RequestChart from '@/components/request/RequestChart.vue'
import RequestCard from '@/components/request/RequestCard.vue'
import AppPage from '../ui/AppPage.vue'
import AppCarusel from '../ui/AppVCarousell.vue'
import AppLoader from '../ui/AppLoader.vue'
import { ref, computed, onMounted, inject } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    const loader = ref(false)
    const filter = ref({})
    const i18n = inject('i18n');
    const t = (key) => i18n.global.t(key);

    const pageTitle = computed(() => t('translate.pageTitle.analiz'));

    const requests = computed(() =>
      store.getters['request/requests']
        .filter(request => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter(request => {
          if (filter.value.status) {
            return filter.value.status === request.status
          }
          return request
        })
    );

    onMounted(async () => {
      loader.value = true
      await store.dispatch('request/load')
      loader.value = false
    })

    return {
      modal,
      requests,
      loader,
      filter,
      pageTitle
    }
  },

  components: {
    AppPage,
    RequestChart,
    RequestCard,
    AppLoader,
    AppCarusel,
  }
}
</script>

<style>

</style>
