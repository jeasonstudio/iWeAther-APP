<style lang="stylus" src="stylus"></style>
<style lang="stylus" scoped>
    @import '~stylus/vars'
    // @import '~stylus/mixins'
    #app
        height 100%
        background-color #fff
        .swiper
            height 100%
            .swiper-roll
                height 100%
            .weather-info
                color red
            .weather-details
                display flex
                flex-flow column nowrap
                color greyBlack-color
                footer
                    padding 10px
                    font-size 1rem
                    flex 1 0 auto
                    display flex
                    justify-content center
                    align-items flex-end
                    a
                        color greyBlack-color
        
</style>
<template>
    <div class="app" id="app">
        <swiper ref="swiper" direction="vertical" :paginationVisible="false" :mousewheel-control="true" :performance-mode="false" :pagination-visible="true" :pagination-clickable="true" :loop="false" @slide-change-start="onSlideChangeStart" @slide-change-end="onSlideChangeEnd">
            <section class="swiper-roll weather-info">Page 0</section>
            <section class="swiper-roll weather-details">
                <div>asdasdasdas</div>
                <footer>
                    Copyright &copy; 2015-2017 <a href="https://github.com/jeasonstudio">JeasonStudio</a>
                </footer>
            </section>
        </swiper>
        <!--<main>
                    <transition name="route" mode="out-in">
                        <router-view @view="view"></router-view>
                    </transition>
                </main>-->
    </div>
</template>
<script>
import Swiper from './components/vue-swiper'
export default {
    name: 'App',
    data() {
        return {

        }
    },
    components: { Swiper },
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
        },
        onSlideChangeStart: function (currentPage) {
            console.log('onSlideChangeStart', currentPage);
        },
        onSlideChangeEnd: function (currentPage) {
            console.log('onSlideChangeEnd', currentPage);
        },
        onSlideRevertStart: function (currentPage) {
            console.log('onSlideRevertStart', currentPage);
        },
        onSlideRevertEnd: function (currentPage) {
            console.log('onSlideRevertEnd', currentPage);
        },
        onSliderMove: function (offset) {
            console.log('onSliderMove', offset);
        },
        prependSlide: function (slideText) {
            this.slides.unshift(slideText);
        },
        appendSlide: function (slideText) {
            this.slides.push(slideText);
        },
        removeSlide: function () {
        }
    }
}
</script>
