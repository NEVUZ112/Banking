import { createApp } from 'vue';
import App from '../App.vue';
import VueGoogleMaps from '@components/vue-google-maps';

const app = createApp(App);

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD6FYkIKvl6cPyzSD3Rlnr6t-Rvcb35oN0',
  },
});

app.mount('#app');
