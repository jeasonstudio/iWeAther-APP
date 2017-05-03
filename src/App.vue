<style lang="stylus" src="stylus"></style>
<style lang="stylus" scoped>
    @import '~stylus/vars'
    @import '~stylus/mixins'
    #app
        background-color app-color
        display flex
        flex-direction column
        min-height 100vh
        // max-width 1024px
        margin 0 auto
        shadow 4
        header
            background-color secondary-color
            color white
            display flex
            font-size 1.25rem
            height 60px
            justify-content space-between
            line-height 60px
            padding 0 0 0 10px
            shadow 2

            .brand
                margin-left 20px
                font-size 1.8rem
                flex 0 1 auto
                color white
                text-decoration none

            nav
                // font-size 0
                // flex 0 1 auto

        main
        footer
            padding 10px
        main
            font-size 1.3rem
            flex 1 0 auto
        footer
            background-color white
            font-size 1rem
            color black
            text-align center
            a 
                color black

    .route-enter-active
    .route-leave-active
        transition opacity transition-time
    .route-enter
    .route-leave-to
        opacity 0
</style>
<template>
    <div class="app" id="app">
        <header>
            <router-link :to="{name: 'Home'}" class="brand">WeAther</router-link>
            <nav>
                <!--<router-link :to="{name: 'Home'}" exact>Home</router-link>
                <router-link :to="{name: 'Test'}" exact>Test</router-link>-->
                <span>5月4号 农历二月初五</span>
            </nav>
        </header>
        <main>
            <transition name="route" mode="out-in">
                <router-view @view="view"></router-view>
            </transition>
        </main>
        <footer>
            Copyright &copy; 2015-2017 <a href="https://github.com/jeasonstudio">JeasonStudio</a>
        </footer>
    </div>
</template>
<script>
    export default {
        name: 'App',
        methods: {
            view({title, description, keywords}) {
                if (title) {
                    document.title = title
                }
                if (description) {
                    document.head.querySelector('meta[name=description]').content = description
                }
                if (keywords) {
                    document.head.querySelector('meta[name=keywords]').content = keywords
                }
            }
        }
    }
</script>
