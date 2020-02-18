<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-if="isShow"></FooterGuide>
  </div>
</template>

<script>
    import FooterGuide from './components/FooterGuide/FooterGuide'

    export default {
        name: 'App',
        components: {FooterGuide},
        mounted() {
            this.$store.dispatch('getUserInfo')
            this.$store.dispatch('getAddress')
        },
        methods:{

        },
        computed:{
            isShow(){
                return this.$route.meta.showFooter
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
