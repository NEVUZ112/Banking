<template>
    <!-- <the-navbar></the-navbar> -->
    <TheNavbarVue/>
    <div class="container with-nav">
        <app-message></app-message>  
        <router-view/>
    </div> 
    <app-sidebar></app-sidebar> 
</template>
<script>
import AppMessage from '../ui/AppMessage.vue'
import TheNavbarVue from '../components/TheNavbar.vue'
// import GoogleMap from '../components/GoogleMap.vue'
import AppSidebar from '../ui/AppSideBar.vue'
export default {
    components:{
        TheNavbarVue,
        // GoogleMap,
        AppMessage,
        AppSidebar 
    }
}
</script>
<style>

</style>