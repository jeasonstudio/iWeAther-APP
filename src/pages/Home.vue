<style lang="stylus" scoped>
    @import '../assets/stylus/vars'
    #home 
        display flex
        display -webkit-flex
        flex-flow column nowrap
        justify-content center
        align-items center
        .detail 
            height 625px
            width 100%
            #tem-week
                width 100%
                height 40%
                margin 10px auto
            .detail-text
                width 60%

        .week-dailys 
            height 200px
            // background-color secondary-color
            width 12%
            margin 10px 20px
            border-radius 10px
        .today 
            width 40%
            height 635px
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
            .city-cond
                font-size 1.2rem
            // border 2px #333 dotted
            display flex
            flex-flow column nowrap
            justify-content center
            align-items center
        body,
        .sun-weather
            background radial-gradient(circle farthest-side at 20% 20%, #add8f7, #0e77ca)
        .cloudy-weather
            background linear-gradient(#5a5a5a , #222222)
            // background radial-gradient(circle farthest-side at 20% 20%, #5a5a5a, #222222)
        
        @media only screen and (max-width: 1024px)
            .today 
                width 100%
            .after-today
                display none
            #tem-week
                width 90%

</style>
<template>
    <div class="home" id="home">
        <div class="week-dailys today" id="sessionone">
            <div class="main-tmp"><span v-text="now.tmp"></span> ℃</div>
            <div class="line"></div>
            <div class="city-cond" v-text="basic.city + '-' + now.cond.txt"></div>
        </div>
        <!--<div class="week-dailys after-today"></div>
        <div class="week-dailys after-today">s</div>
        <div class="week-dailys after-today">a</div>-->
        <div class="detail" id="sessiontwo">
            <div id="tem-week"></div>
            <div class="detail-text">
                <p><span></span><span></span></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            "basic": {
                "city": "北京"
            },
            "now": {
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
    preFetch() {
        return this.methods.meta()
    },
    beforeMount() {
        this.$emit('view', this.meta())
    },
    created: function () {
        this.getWeathers();
    },
    activated: function () {
        let screenHeight = window.screen.height;
        document.getElementById('sessionone').style.height = screenHeight + 'px';
        // document.getElementsByClassName('week-dailys')[0].style.height = screenHeight + 'px';
        // document.getElementsByClassName('detail')[0].style.height = screenHeight + 'px';
        // console.log(document.getElementsByClassName('detail'))

    },
    methods: {
        meta: () => ({
            title: 'iWeAther',
            description: '当前天气',
            keywords: 'PWA'
        }),
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
                self.renderCharts();
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
        },
        renderCharts: function () {
            let self = this;
            let myChart = this.$echarts.init(document.getElementById('tem-week'));
            myChart.setOption({
                title: {
                    text: '未来一周天气状况'
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: self.$data.afterCalculater.xDate
                },
                yAxis: {
                    show: false,
                    type: 'value',
                    min: 'dataMin',
                    max: 'dataMin',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        "name": '最高气温',
                        "type": 'line',
                        "lineStyle": {
                            "normal": {
                                "width": 1,
                                "color": '#f56a00',
                                "type": 'solid',
                                "shadowColor": 'rgba(0, 0, 0, 0.5)',
                                "shadowBlur": 10
                            }
                        },
                        "areaStyle": {
                            "normal": {
                                "color": '#f56a00'
                            }
                        },
                        "smooth": true,
                        "data": self.$data.afterCalculater.maxTmps,
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
                                "color": '#108ee9',
                                "type": 'solid',
                                "shadowColor": 'rgba(0, 0, 0, 0.5)',
                                "shadowBlur": 10
                            }
                        },
                        "areaStyle": {
                            "normal": {
                                "color": '#108ee9'
                            }
                        },
                        "smooth": true,
                        "data": self.$data.afterCalculater.minTmps,
                        "markLine": {
                            "data": [
                                { "type": 'average', "name": '平均值' },
                            ]
                        }
                    }
                ]
            });

            console.log(myChart)
        }

    }
}
</script>
