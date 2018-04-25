import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'

import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../../../css/theme-green/index.css';    // 浅绿色主题

/**
 * Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js中
 * 详细说明：https://www.kancloud.cn/yunye/axios/234845
 */
import axios from 'axios';
// // 创建基本的axios配置
var $http = axios.create({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
    }
});
// 挂载到vue的原型
Vue.prototype.$http = $http;

import router from './router'

Vue.use(ElementUI)

new Vue({
  router : router,
  render: h => h(App)
}).$mount('#app')

