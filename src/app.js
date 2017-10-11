import Vue from 'vue';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios);

import Router from 'vue-router';
Vue.use(Router);

import './filter/index.js';

console.log('current process.env: ' + process.env);

import App from './app.vue';
import store from 'store';
//import { routeConfig } from './config/route.config.js';
import './index';
import fetch from 'utils/fetch';

fetch.get('/index', function (data) {
    console.log(data);
})
//const router = new Router(routeConfig);

const app = new Vue({
    //router,
    store,
    render: h => h(App)
}).$mount('#app');
