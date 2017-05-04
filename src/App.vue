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

        main
        footer
            padding 10px
        main
            font-size 1.3rem
            flex 1 0 auto
        footer
            background-color white
            font-size 0.8rem
            color #666
            text-align center
            a 
                color #666

    .route-enter-active
    .route-leave-active
        transition opacity transition-time
    .route-enter
    .route-leave-to
        opacity 0
</style>
<template>
    <div class="app" id="app">
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
        view({ title, description, keywords }) {
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
