<template>
    <div>
        <Navigation></Navigation>
        <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <router-view class="mt-10 mb-10"></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
    import Navigation from '@/components/navigation/Navigation.vue';
    import Footer from '@/components/navigation/Footer.vue';

    export default {
        components: {
            Navigation, Footer
        }
    }
</script>

<style lang="scss">

</style>
