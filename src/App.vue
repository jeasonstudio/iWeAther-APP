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
                display flex
                flex-flow column nowrap
                justify-content center
                align-items center
                font-size 1.5rem
                .main-tmp
                    span
                        font-size 5rem
                        font-weight 800
                .line
                    margin 0 auto 10px auto
                    display block
                    width 70%
                    text-align center
                    background-color black
                    height 3px
                    border-radius 50%
            .weather-details
                display flex
                flex-flow column nowrap
                color greyBlack-color
                .sm-info
                    text-align center
                    font-size 1rem
                    margin 10px
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
        <swiper ref="swiper" direction="vertical" :paginationVisible="false" :mousewheel-control="true" :performance-mode="false" :pagination-visible="true" :pagination-clickable="true" :loop="false">
            <section class="swiper-roll weather-info">
                <div class="main-tmp"><span v-text="now.tmp"></span> ℃</div>
                <div class="line"></div>
                <div class="city-cond" v-text="basic.city + '-' + now.cond.txt"></div>
            </section>
            <section class="swiper-roll weather-details">
                <div class="sm-info" v-text="now.tmp + '℃ ' + now.cond.txt"></div>
                <footer>
                    Copyright &copy; 2015-2017 <a href="https://github.com/jeasonstudio"> JeasonStudio</a>
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
            "basic": {
                "city": "北京",
                "update": { "loc": "" }
            },
            "now": {
                "hum": "",
                "fl": "",
                "vis": "",
                "wind": {},
                "cond": {
                    "txt": ''
                }
            },
            "chartsOptions": {
            },
            "daily_forecast": [],
            "afterCalculater": {
                "maxTmps": [],
                "minTmps": [],
                "xDate": []
            }
        }
    },
    components: { Swiper },
    mounted() {
        return this.getWeathers();
    },
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
        getWeathers: function () {
            let self = this
            self.$http.get('/now').then(response => {
                self.$data.now = response.data.HeWeather5[0].now;
                self.$data.basic = response.data.HeWeather5[0].basic;
            }).catch(error => {
                throw new Error(error);
            })

            self.$http.get('/forecast').then(response => {
                self.$data.daily_forecast = response.data.HeWeather5[0].daily_forecast;
            }).then(() => {
                self.calcuTems(self.$data.daily_forecast)
            }).then(() => {
                // self.renderCharts();
            }).catch(error => {
                throw new Error(error);
            })
            console.log(self.$data)
        },
        calcuTems: function (temArr) {
            let [temMaxs, temMins, xDate] = [[], [], []];
            temArr.forEach((item, i) => {
                temMaxs.push(item.tmp.max);
                temMins.push(item.tmp.min);
                xDate.push(i == 0 ? '今天' : Number(item.date.split('-')[1]) + '-' + Number(item.date.split('-')[2]));

            })
            this.$data.afterCalculater = { maxTmps: temMaxs, minTmps: temMins, xDate: xDate };
            console.log(temMaxs, temMins);
        }
    }
}
</script>
