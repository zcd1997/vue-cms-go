// 入口文件

// 导入vue
import Vue from 'vue';

Vue.config.devtools = true
// 配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 配置vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// new Vuex.Store 得到一个数据仓库对象
// 每次进入网站 从本地存储中 获取 car的数据
var car = JSON.parse(localStorage.getItem('car') || '[]')
var store = new Vuex.Store({
   state: {
      // 类似于 data
      // 将购物车中的商品的数据，用一个数组存储起来
      // 里面存储商品对象
      // {id:商品id，count：商品数量，price：单价，selected:是否选择}
      car: car
   },
   mutations: {
      // 类似于 methods
      addToCar(state, goodinfo) {
         // 点击加入购物车时，保存对应信息到 store中
         var flag = false
         state.car.some(item => {
            if (item.id == goodinfo.id) {
               item.count += parseInt(goodinfo.count)
               console.log(item.count)
               flag = true
               return true
            }
         })
         if (!flag) {
            state.car.push(goodinfo)
         }
         // 数据保存至本地
         localStorage.setItem('car', JSON.stringify(state.car))
      },
      updateGoodCount(state, goodinfo) {
         // 修改购物车中商品的数量
         state.car.some(item => {
            if (item.id == goodinfo.id) {
               item.count = parseInt(goodinfo.count)
               return true
            }
         })
         localStorage.setItem('car', JSON.stringify(state.car))
      },
      removeGood(state, id) {
         // 进行删除
         state.car.some((item, i) => {
            if (item.id == id) {
               state.car.splice(i, 1)
               return true
            }
         })
         localStorage.setItem('car', JSON.stringify(state.car))

      },
      updateSelected(state, info) {
         state.car.some(item => {
            if (item.id == info.id) {
               item.selected = info.selected
            }
         })
         localStorage.setItem('car', JSON.stringify(state.car))
      }
   },
   getters: {
      // 相当于 计算属性，也相当于 filters
      getAllCount(state) {
         var allcount = 0;
         state.car.forEach(item => {
            allcount += item.count
         })
         return allcount
      },
      getGoodsCount(state) {
         var o = {}
         state.car.forEach(item => {
            o[item.id] = item.count
         })
         return o
      },
      getGoodsSelected(state) {
         var o = {}
         state.car.forEach(item => {
            o[item.id] = item.selected
         })
         return o
      },
      getGoodsCountAndPrice(state) {
         // 勾选的商品的数量，单价
         var o = {
            count: 0,
            price: 0,
         }
         state.car.forEach(item => {
            if (item.selected) {
               o.count += item.count
               o.price += item.count * item.price
            }
         })
         return o
      }
   }
})

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
   store,//挂载store对象
})