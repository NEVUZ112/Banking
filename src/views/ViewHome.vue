<template>
  <app-loader v-if="loader"></app-loader>
  <div v-else>
    <br>
    <AppSliderVue v-observe></AppSliderVue>
    <app-page :title="t('translate.nav.home')" v-observe>

    <template #header>
      <button class="btn primary" @click="modal=true">{{ t('translate.nav.addInfo') }}</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-table-vue :requests="requests"></request-table-vue>
    <br><br><br><br>
    <div class="Line" v-observe>
      <span class="animated-text" v-for="fio in animatedNames" :key="fio">{{ fio }}</span>
    </div>
    <br><br><br><br>
    <GoogleMap v-observe />
    </app-page>
  </div>

  <teleport to="body">
    <app-modal-vue :title="t('translate.nav.addInfo')" v-if="modal" @close="modal=false">
      <request-add-vue @created="modal=false"></request-add-vue>
    </app-modal-vue>
  </teleport>
</template>

<script>
import AppModalVue from '@/ui/AppModal.vue'
import AppSliderVue from '@/ui/AppSlider.vue'
import RequestTableVue from '../components/request/RequestTable.vue'
import RequestAddVue from '../components/request/RequestAdd.vue'
import AppPage from '../ui/AppPage.vue'
import AppLoader from '../ui/AppLoader.vue'
import { ref, computed, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import RequestFilter from '@/components/request/RequestFilter.vue'
import GoogleMap from '../components/GoogleMap.vue'

export default {
  setup() {
    const modal = ref(false)
    const store = useStore()
    const router = useRouter()

    const loader = ref(false)
    const filter = ref({})
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
    )

    const animatedNames = computed(() =>
      requests.value.map(request => request.fio)
    )

    onMounted(async () => {
      loader.value = true
      await store.dispatch('request/load')
      loader.value = false
    })

    const i18n = inject('i18n')
    const t = (key) => i18n.global.t(key)

    return {
      modal,
      requests,
      loader,
      filter,
      t,
      animatedNames,
      router
    }
  },

  components: {
    AppPage,
    RequestTableVue,
    AppModalVue,
    RequestAddVue,
    AppSliderVue,
    AppLoader,
    GoogleMap,
    RequestFilter
  }
}
</script>

<style scoped>
.Line {
  display: flex;
  width: 71vw;
  height: 40px;
  overflow: hidden;
  background-color: rgb(7, 1, 1);
}

.animated-text {
  display: inline-block;
  font-size: 30px;
  white-space: nowrap;
  margin-right: 20px;
  animation: slideText 10s linear infinite;
  color: #fff;
}

@keyframes slideText {
  0% {
    transform: translateX(71vw);
  }
  100% {
    transform: translateX(-71vw);
  }
}

.before-enter {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.enter {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 1s ease-out, transform 1.5s ease-out;
}
</style>
 