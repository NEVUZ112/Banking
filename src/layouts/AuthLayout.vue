<template>
    <div class="container">
        <app-message/>

        <div class="card">
            <router-view/>
        </div>
    </div> 
</template>
<script>

import AppMessage from '../ui/AppMessage.vue'
export default {
    components:{
        AppMessage
    }
}
</script>
<style>

</style>