// i18n.js
import { createI18n } from 'vue-i18n'

// Import your translation files
import en from './locales/en.json'
import uz from './locales/uz.json'
import ar from './locales/ar.json'

const messages = {
  en,
  uz,
  ar
}

const i18n = createI18n({
  locale: 'uz', // set default locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale messages
})

export default i18n
