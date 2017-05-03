<style lang="stylus" scoped>
    @import '../assets/stylus/vars'
    #home 
        display flex
        display -webkit-flex
        flex-flow row wrap
        justify-content center
        .week-dailys 
            height 500px
            background-color secondary-color
            width 12%
            margin 10px 20px
            border-radius 10px
        .today 
            width 40%
        .sun-weather
            background radial-gradient(circle farthest-side at 20% 20%, #add8f7, #0e77ca)
        .cloudy-weather
            background linear-gradient(#5a5a5a , #222222)
            // background radial-gradient(circle farthest-side at 20% 20%, #5a5a5a, #222222)
        @media only screen and (max-width: 1024px)
            .today 
                width 80%
            .after-today
                display none


</style>
<template>
    <div class="home"
         id="home">
        <div class="week-dailys today cloudy-weather"></div>
        <div class="week-dailys after-today">aaa</div>
        <div class="week-dailys after-today">s</div>
        <div class="week-dailys after-today">a</div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    preFetch() {
        return this.methods.meta()
    },
    beforeMount() {
        this.$emit('view', this.meta())
    },
    methods: {
        meta: () => ({
            title: 'Home | iWeAther-APP',
            description: 'This is the home page.',
            keywords: 'home, page, internet'
        })
    }
}
</script>
