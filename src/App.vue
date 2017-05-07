<style lang="stylus" src="stylus"></style>
<style lang="stylus" scoped>
    @import '~stylus/vars'
    @import '~stylus/cool'
    #app
        height 100%
        background-color #fff
        .swiper
            height 100%
            .swiper-roll
                height 100%
            .weather-info
                font-size 1.5rem
                #content
                    height 100%
                    display flex
                    flex-flow column nowrap
                    justify-content center
                    align-items center
                    .main-tmp
                        span
                            font-size 5rem
                            font-weight 600
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
                .main-content
                    #tem-chart
                        margin-top -30px
                        width 100%
                        height 250px
                    .detail-infos
                        margin-top -20px
                        width 100%
                        .text-block
                            margin 10px 0
                            p
                                padding 0
                                display flex
                                flex-flow row nowrap
                                span
                                    padding 0 10px
                                    width 50%
                                    font-weight 200
                                :first-child
                                    text-align right
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
        <swiper ref="swiper" direction="vertical" :paginationVisible="false" :mousewheel-control="true" :performance-mode="false" :pagination-visible="true" :pagination-clickable="true" :loop="false" @slide-change-start="onSlideChangeStart">
            <section class="swiper-roll weather-info">
                <div id="content" :style="{
                    'transition':'All 0.4s ease-in-out',
                    'transform': 'translate(0px, ' + cool.oldLocation + 'px)'}">
                    <div class="main-tmp"><span v-text="now.tmp"></span> ℃</div>
                    <div class="line"></div>
                    <div class="city-cond" v-text="basic.city + '-' + now.cond.txt"></div>
                </div>
            </section>
            <section class="swiper-roll weather-details">
                <div class="sm-info" v-text="formatTime(basic.update.loc) + ' ' + now.tmp + '℃ ' + now.cond.txt"></div>
                <div class="main-content">
                    <div id="tem-chart"></div>
                    <div class="detail-infos">
                        <div class="text-block">
                            <p><span>数据更新时间:</span><span v-text="basic.update.loc"></span></p>
                        </div>
                        <div class="text-block">
                            <p><span>相对湿度:</span><span v-text="now.hum + ' %'"></span></p>
                            <p><span>体感温度:</span><span v-text="now.fl + ' ℃'"></span></p>
                            <p><span>降水量:</span><span v-text="now.pcpn + ' mm'"></span></p>
                        </div>
                        <div class="text-block">
                            <p><span>能见度:</span><span v-text="now.vis + ' km'"></span></p>
                        </div>
                        <div class="text-block">
                            <p><span>风向风力:</span><span v-text="now.wind.dir + now.wind.sc + '级' "></span></p>
                            <p><span>风速:</span><span v-text="now.wind.spd + ' kmph' "></span></p>
                        </div>
                    </div>
                </div>
                <footer>
                    Copyright &copy; 2015-2017 <a href="https://github.com/jeasonstudio"> JeasonStudio</a>
                </footer>
            </section>
        </swiper>
    </div>
</template>
<script>
import Swiper from './components/vue-swiper'
export default {
    name: 'App',
    data() {
        return {
            "basic": {
                "city": "",
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
            },
            "cool": {
                "oldLocation": 0
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
                self.now = response.data.HeWeather5[0].now;
                self.basic = response.data.HeWeather5[0].basic;
            }).catch(error => {
                throw new Error(error);
            })

            self.$http.get('/forecast').then(response => {
                self.daily_forecast = response.data.HeWeather5[0].daily_forecast;
            }).then(() => {
                self.calcuTems(self.daily_forecast)
            }).then(() => {
                self.renderCharts();
            }).catch(error => {
                throw new Error(error);
            })
            // console.log(self)
        },
        calcuTems: function (temArr) {
            let [temMaxs, temMins, xDate] = [[], [], []];
            temArr.forEach((item, i) => {
                temMaxs.push(item.tmp.max);
                temMins.push(item.tmp.min);
                xDate.push(i == 0 ? '今天' : Number(item.date.split('-')[1]) + '-' + Number(item.date.split('-')[2]));

            })
            this.afterCalculater = { maxTmps: temMaxs, minTmps: temMins, xDate: xDate };
            console.log(temMaxs, temMins);
        },
        onSlideChangeStart: function (currentPage) {
            console.log('onSlideChangeStart', currentPage);
            if (currentPage === 1) {
                this.cool.oldLocation = 0;
            } else {
                this.cool.oldLocation = parseInt(window.screen.height / 3)
            }
        },
        formatTime: function (timeString) {
            return Number(timeString.split(' ')[0].split('-')[1]) + '月' + Number(timeString.split(' ')[0].split('-')[2]) + '日'
        },
        renderCharts: function () {
            let self = this;
            let myChart = this.$echarts.init(document.getElementById('tem-chart'));
            myChart.setOption({
                "xAxis": {
                    "type": 'category',
                    "boundaryGap": false,
                    "data": self.afterCalculater.xDate
                },
                "yAxis": {
                    "show": false,
                    "type": 'value',
                    "min": 'dataMin',
                    "max": 'dataMin',
                    "axisLabel": {
                        "formatter": '{value} °C'
                    }
                },
                "series": [
                    {
                        "name": '最高气温',
                        "type": 'line',
                        "lineStyle": {
                            "normal": {
                                "width": 1,
                                "color": '#f04134',
                                "type": 'solid'
                            }
                        },
                        // "areaStyle": {
                        //     "normal": {
                        //         "color": '#f04134'
                        //     }
                        // },
                        // "smooth": true,
                        "data": self.afterCalculater.maxTmps,
                        "markLine": {
                            "data": [
                                { "type": 'average', "name": '平均值' }
                            ]
                        }
                    }, {
                        "name": '最低气温',
                        "type": 'line',
                        "lineStyle": {
                            "normal": {
                                "width": 1,
                                "color": '#7265e6',
                                "type": 'solid'
                            }
                        },
                        // "areaStyle": {
                        //     "normal": {
                        //         "color": '#7265e6'
                        //     }
                        // },
                        // "smooth": true,
                        "data": self.afterCalculater.minTmps,
                        "markLine": {
                            "data": [
                                { "type": 'average', "name": '平均值' },
                            ]
                        }
                    }
                ]
            });
        },
    }
}
</script>
