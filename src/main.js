// 入口文件

// 导入vue
import Vue from 'vue';
// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 配置vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005/'
// 设置post请求时，表单数据格式
Vue.http.options.emulateJSON = true;

// 配置vue-preview 图片预览插件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);

import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
   return moment(dataStr).format(pattern)
})

// 导入app.vue
import app from './App.vue'
// 导入路由模块
import router from './router.js'

// 导入 mint-ui 组件
// import { Header, Swipe, SwipeItem, Button,Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

// 导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


var vm = new Vue({

   el: '#app',
   render: c => c(app),
   router,//挂载路由对象
})