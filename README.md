#这是一个学习的移动端项目
#学习使我快乐
#



#制作首页

#改造 tabber 为 router-link
    
##设置路由高亮


##点击对应tabber的链接，显示对应组件


##制作首页轮播图
    1.进行布局
    2.加载首页轮播图布局
    3.获取数据
        3.1 使用 vue-resource
        3.2 this.$http.get
        3.3 数据保存在data上
        3.4 使用v-for 循环渲染 每个item 

##组件切换动画效果


##改造新闻资讯，路由连接


#新闻资讯 界面制作
1.绘制界面
2.获取数据
    格式化时间 使用全局过滤器  filter  然后使用 moment组件 
    Vue.filter('dataFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss'){
   return moment(dataStr).format(pattern)
})
3.渲染界面


##新闻资讯列表 点击跳转 新闻详情界面
1.改造路由，提供id，进行唯一标识
2.创建组件
3.组件与路由进行对应

##详情内容


##单独写一个评论子组件
1.先创建一个 comment.vue组件
2.在需要子组件的页面中手动导入 子组件
3.在父组件中，使用commponents 中进行祖册
4.在父组件内容中 使用标签进行引用


##获取对应的评论，显示到对应的区域中


##实现点击加载更多评论
1.给加载更多按钮绑定事件，请求下一页数据
2.对新请求的数据，对数据进行拼接


##发表评论
1.吧文本框做双向数据绑定
2.为按钮添加事件
3.校验评论内容
4.发送请求，吧评论内容给服务器


##图片列表

导入 mui.js 后，出现错误：
'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them

可能原因：webpack 打包，默认启用严格模式
解决方法：移除严格模式 
        "babel-plugin-transform-remove-strict-mode"
        在.babelrc 中配置  "transform-remove-strict-mode"


##图片分类
    处理类  ：class = ['表达式']

##图片列表
1.图片懒加载   mint-ui  lazy-loader