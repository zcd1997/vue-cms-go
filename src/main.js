// 入口文件

// 导入vue
import Vue from 'vue';

// 导入 mint-ui 组件
import { Header } from 'mint-ui';
Vue.component(Header.name, Header);

// 导入app.vue
import app from './App.vue'

// 导入mui样式
import './lib/mui/css/mui.min.css'

var vm = new Vue({

    el: '#app',
    render: c => c(app),
})