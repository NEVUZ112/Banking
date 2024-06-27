<template>
  <app-carusell></app-carusell>
  <app-page :title="name">
    <app-questions v-for="q in questions" :key="q.title" :question="q"></app-questions>
  </app-page>
</template>

<script>
import { inject, computed } from 'vue';
import AppPage from '../ui/AppPage.vue';
import AppCarusell from '../ui/AppCarusell.vue';
import AppQuestions from '../components/help/AppQuestion.vue';

export default {
  setup() {
    const i18n = inject('i18n');
    const t = (key) => i18n.global.t(key);

    // Tarjima qilingan maydonlar
    const name = computed(() => t('help.title'));
    const questions = [
      {title:'Title1',answer:'Answer1' },
      {title:'Title2',answer:'Answer2' },
      {title:'Title3',answer:'Answer3' },
      {title:'Title4',answer:'Answer4' }
    ];
   

    // Til o'zgarganda yangi tarjimalarni olish

    return {
      name,
      questions
    };
  },
  components: {
    AppPage,
    AppCarusell,
    AppQuestions
  }
}
</script>
