import Vue from 'vue'
import {
    sync
} from 'vuex-router-sync'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import axios from 'axios'
import echarts from 'echarts'

axios.defaults.baseURL = 'https://free-api.heweather.com/v5'
axios.defaults.params = {
    city: '127.0.0.1', //根据本机 ip 获取城市
    key: '6fcd1f55dc9d4c059b6ae73ec24f2ce2' // 生成的 key
}

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

sync(store, router)

const app = new Vue({
    router,
    store,
    ...App
})

export {
    app,
    router,
    store
}