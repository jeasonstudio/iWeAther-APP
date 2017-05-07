webpackJsonp([0],{479:function(t,e,a){a(486);var n=a(88)(a(482),a(485),"data-v-4fc70af2",null);t.exports=n.exports},481:function(t,e,a){e=t.exports=a(62)(void 0),e.push([t.i,"body[data-v-4fc70af2],html[data-v-4fc70af2]{height:100%}#home[data-v-4fc70af2]{display:flex;display:-webkit-flex;flex-flow:column nowrap;justify-content:center;align-items:center}#home .detail[data-v-4fc70af2]{width:100%}#home .detail #tem-week[data-v-4fc70af2]{width:100%;height:40%;margin:10px auto}#home .detail .detail-text[data-v-4fc70af2]{width:100%}#home .detail .detail-text p[data-v-4fc70af2]{padding:0;font-size:1.2rem;display:flex;flex-flow:row nowrap}#home .detail .detail-text p span[data-v-4fc70af2]{padding:0 10px;width:50%;font-weight:200}#home .detail .detail-text p [data-v-4fc70af2]:first-child{text-align:right}#home .week-dailys[data-v-4fc70af2]{height:200px;width:12%;border-radius:10px}#home .today[data-v-4fc70af2]{width:40%;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center}#home .today .main-tmp span[data-v-4fc70af2]{font-size:5rem;font-weight:800}#home .today .line[data-v-4fc70af2]{margin:0 auto 10px;display:block;width:70%;text-align:center;background-color:#000;height:3px;border-radius:50%}#home .today .city-cond[data-v-4fc70af2]{font-size:1.2rem}#home .sun-weather[data-v-4fc70af2],#home body[data-v-4fc70af2]{background:radial-gradient(circle farthest-side at 20% 20%,#add8f7,#0e77ca)}#home .cloudy-weather[data-v-4fc70af2]{background:linear-gradient(#5a5a5a,#222)}@media only screen and (max-width:1024px){#home .today[data-v-4fc70af2]{width:100%}#home .after-today[data-v-4fc70af2]{display:none}#home #tem-week[data-v-4fc70af2]{width:90%}}",""])},482:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"Home",data:function(){return{basic:{city:"北京",update:{loc:""}},now:{hum:"",fl:"",vis:"",wind:{},cond:{txt:""}},chartsOptions:{},daily_forecast:[],afterCalculater:{maxTmps:[],minTmps:[],xDate:[]}}},preFetch:function(){return this.methods.meta()},beforeMount:function(){this.$emit("view",this.meta())},created:function(){this.getWeathers()},mounted:function(){return console.log("The Window Screen Height Is: "+window.screen.height+"px"),document.getElementById("sessionone").style.height=window.screen.height+"px",document.getElementById("sessiontwo").style.height=window.screen.height-40+"px",window.addEventListener("scroll",this.handleScroll)},methods:{meta:function(){return{title:"iWeAther",description:"当前天气",keywords:"PWA"}},getWeathers:function(){var t=this;t.$http.get("/now").then(function(e){t.$data.now=e.data.HeWeather5[0].now,t.$data.basic=e.data.HeWeather5[0].basic}).catch(function(t){throw new Error(t)}),t.$http.get("/forecast").then(function(e){t.$data.daily_forecast=e.data.HeWeather5[0].daily_forecast}).then(function(){t.calcuTems(t.$data.daily_forecast)}).then(function(){t.renderCharts()}).catch(function(t){throw new Error(t)}),console.log(t.$data)},calcuTems:function(t){var e=[[],[],[]],a=e[0],n=e[1],o=e[2];t.forEach(function(t,e){a.push(t.tmp.max),n.push(t.tmp.min),o.push(0==e?"今天":Number(t.date.split("-")[1])+"-"+Number(t.date.split("-")[2]))}),this.$data.afterCalculater={maxTmps:a,minTmps:n,xDate:o},console.log(a,n)},renderCharts:function(){var t=this;this.$echarts.init(document.getElementById("tem-week")).setOption({xAxis:{type:"category",boundaryGap:!1,data:t.$data.afterCalculater.xDate},yAxis:{show:!1,type:"value",min:"dataMin",max:"dataMin",axisLabel:{formatter:"{value} °C"}},series:[{name:"最高气温",type:"line",lineStyle:{normal:{width:1,color:"#f04134",type:"solid",shadowColor:"rgba(0, 0, 0, 0.5)",shadowBlur:10}},areaStyle:{normal:{color:"#f04134"}},smooth:!0,data:t.$data.afterCalculater.maxTmps,markLine:{data:[{type:"average",name:"平均值"}]}},{name:"最低气温",type:"line",lineStyle:{normal:{width:1,color:"#7265e6",type:"solid",shadowColor:"rgba(0, 0, 0, 0.5)",shadowBlur:10}},areaStyle:{normal:{color:"#7265e6"}},smooth:!0,data:t.$data.afterCalculater.minTmps,markLine:{data:[{type:"average",name:"平均值"}]}}]})},handleScroll:function(t){}}}},485:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home",attrs:{id:"home"}},[a("div",{staticClass:"week-dailys today",attrs:{id:"sessionone"}},[a("div",{staticClass:"main-tmp"},[a("span",{domProps:{textContent:t._s(t.now.tmp)}}),t._v(" ℃")]),t._v(" "),a("div",{staticClass:"line"}),t._v(" "),a("div",{staticClass:"city-cond",domProps:{textContent:t._s(t.basic.city+"-"+t.now.cond.txt)}})]),t._v(" "),a("div",{staticClass:"detail",attrs:{id:"sessiontwo"}},[a("p",{staticStyle:{"text-align":"center","margin-bottom":"-60px"}},[t._v("未来一周气温走势")]),t._v(" "),a("div",{attrs:{id:"tem-week"}}),t._v(" "),a("div",{staticClass:"detail-text"},[a("p",[a("span",{staticStyle:{"align-self":"flex-end"}},[t._v("数据更新时间:")]),a("span",{domProps:{textContent:t._s(t.basic.update.loc)}})]),t._v(" "),a("p",[a("span",[t._v("相对湿度:")]),a("span",{domProps:{textContent:t._s(t.now.hum+" %")}})]),t._v(" "),a("p",[a("span",[t._v("体感温度:")]),a("span",{domProps:{textContent:t._s(t.now.fl+" ℃")}})]),t._v(" "),a("p",[a("span",[t._v("能见度:")]),a("span",{domProps:{textContent:t._s(t.now.vis+" km")}})]),t._v(" "),a("p",[a("span",[t._v("风向风力:")]),a("span",{domProps:{textContent:t._s(t.now.wind.dir+t.now.wind.sc+"级")}})]),t._v(" "),a("p",[a("span",[t._v("风速:")]),a("span",{domProps:{textContent:t._s(t.now.wind.spd+" kmph")}})])])])])},staticRenderFns:[]}},486:function(t,e,a){var n=a(481);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(63)("0e26a558",n,!0)}});
//# sourceMappingURL=0.c29a556edb2a248a0b1f.js.map