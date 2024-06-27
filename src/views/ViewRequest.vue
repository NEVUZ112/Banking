<template>
    <app-loader v-if="loader"></app-loader>
    <app-page :title="pageTitle" v-else :back="true">
        <p>{{ t('labels.fio') }}: <input type="text" v-model="fio" class="updateInp"></p>
        <p>{{ t('labels.phone') }}: <input type="text" v-model="number" class="updateInp"></p>
        <p>{{ t('labels.amount') }}: <input type="text" v-model="summa" class="updateInp"></p>
        <p>{{ t('labels.status') }}: <app-status :type="request.status"></app-status></p>
        <div :class="['form-control']">
            <label for="status" class="label">{{ t('labels.status') }}</label>
            <select v-model="status">
                <option value="done">{{ t('status.done') }}</option>
                <option value="cancelled">{{ t('status.cancelled') }}</option>
                <option value="active">{{ t('status.active') }}</option>
                <option value="sending">{{ t('status.sending') }}</option>
            </select>
        </div>
        <button class="btn primary" @click="update" v-if="hasChanges">{{ t('labels.update') }}</button>
        <button class="btn danger" @click="del">{{ t('labels.delete') }}</button>
    </app-page>
</template>

<script>
import { currency } from '../utils/currency.js';
import { useRoute, useRouter } from 'vue-router';
import AppPage from '../ui/AppPage.vue';
import { ref, onMounted, computed, inject } from 'vue';
import { useStore } from 'vuex';
import AppLoader from '@/ui/AppLoader.vue';
import AppStatus from '@/ui/AppStatus.vue';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const loader = ref(false);
        const status = ref();
        const request = ref({});
        const fio = ref();
        const number = ref();
        const summa = ref();
        
        const i18n = inject('i18n');
        const t = (key) => i18n.global.t(key);
        const pageTitle = computed(() => t('pageTitle.application'));
        
        const hasChanges = computed(() => {
            return request.value.status !== status.value || request.value.fio !== fio.value || request.value.Telefon !== number.value || request.value.Summa !== summa.value;
        });
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
        onMounted(async () => {
            loader.value = true;
            request.value = await store.dispatch('request/loadById', route.params.id);
            loader.value = false;
            status.value = request.value.status;
            fio.value = request.value.fio;
            number.value = request.value.Telefon;
            summa.value = request.value.Summa;
            // console.log(route.params.id)
        });

        return {
            request,
            router,
            fio,
            number,
            summa,
            loader,
            route,
            store,
            currency,
            status,
            hasChanges,
            t,
            pageTitle,
            update: async () => {
                const data = { ...request.value, id: route.params.id, status: status.value, fio: fio.value, Telefon: number.value, Summa: summa.value };
                await store.dispatch('request/updateById', data);
                request.value.status = status.value;
            },
            del: async () => {
                await store.dispatch('request/removeById', route.params.id);
                router.push('/');
            }
        }
    },
    components: {
        AppPage,
        AppLoader,
        AppStatus
    }
}
</script>

<style>
.updateInp {
    width: 300px;
    height: 30px;
    border-radius: 30px;
    padding: 5px;
    border: 1px solid green;
    outline: none;
}
.updateInp:hover {
    border: 2px solid red;
}
.updateInp:focus {
    border: 2px solid blue;
}
</style>
