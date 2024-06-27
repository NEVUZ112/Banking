<template>
    <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import { ref, watch, inject, computed } from 'vue';

export default {
    props: {
        type: String,
        status: {
            type: String,
            default: 'active' // Yoki uchun birinchi qiymatni o'rnating
        }
    },
    setup(props) {
        const i18n = inject('i18n');

        const classesMap = {
            active: 'primary',
            cancelled: 'danger',
            done: 'primary',
            sending: 'warning'
        };

        const getText = (type) => {
            const textMap = {
                active: i18n.global.t('translate.status.active'),
                cancelled: i18n.global.t('translate.status.cancelled'),
                done: i18n.global.t('translate.status.done'),
                sending: i18n.global.t('translate.status.sending')
            };
            return textMap[type];
        };

        const className = ref(classesMap[props.type]);
        const text = ref(getText(props.type));

        watch(() => props.type, (newType) => {
            className.value = classesMap[newType];
            text.value = getText(newType);
        });

        watch(() => i18n.global.locale, () => {
            text.value = getText(props.type);
        });

        const classNameComputed = computed(() => className.value);
        const textComputed = computed(() => text.value);

        return {
            className: classNameComputed,
            text: textComputed
        };
    }
}
</script>

<style scoped>
/* Add styles here if needed */

</style>
