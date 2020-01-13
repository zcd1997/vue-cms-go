import VueRouter from 'vue-router'


// 导入对应的路由组件
import Home from './components/tabber/Home.vue'
import Member from './components/tabber/Member.vue'
import ShopCar from './components/tabber/ShopCar.vue'
import Search from './components/tabber/Search.vue'
import NewsList from './components/news/NewList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photo/PhotoList.vue'


var router = new VueRouter({
    routes: [
        // 路由匹配规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home },
        { path: '/member', component: Member },
        { path: '/shopcar', component: ShopCar },
        { path: '/search', component: Search },
        { path: '/home/newlist', component: NewsList },
        // 匹配id时候，这么做，表示为参数
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList }
    ],
    linkActiveClass: 'mui-active' //覆盖默认路由高亮的类
})


// 把路由对象暴露出去

export default router