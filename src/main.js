import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import observeDirective from './observeDirective'
import router from './router'
import store from './store'
import i18n from './i18n'

import './theme.css'


createApp(App).directive('observe', observeDirective).use(store).use(router).provide('i18n', i18n).mount('#app')
