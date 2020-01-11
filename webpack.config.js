
//该文件其实就是一个js文件
//向外暴露一个配置对象
const path = require('path')

//导入内存中生成的 HTML 页面的插件 ，放在 plugin中
//作用：
//1.在内存中根据指定页面生成一个内存的页面

//2.自动吧打包好的 bundle。js文件追加到页面中
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
    //需要手动指定入口和出口

    entry: path.join(__dirname, './src/main.js'),//入口，表示要使用webpack打包那个文件

    output: {

        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'

    },
    devServer: {
        open: true,//自动打开浏览器
        port: 4000,//设置端口
        contentBase: 'src',//设置托管的根目录
        hot: true

    },//配置devserver 命令参数的第二种方式
    // 插件配置
    plugins: [
        new htmlWebpackPlugin({
            //创建一个在内存中生成HTML的插件
            template: path.join('./src/index.html'), //指定模板
            filename: 'index.html',//指定生成的页面的名称
        }),
        new VueLoaderPlugin(),
        
    ],//配置插件的节点
    module: {
        //用于配置所有第三方模块加载器
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            //配置处理 css 文件
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
            //配置处理 less 文件
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            //配置处理 less 文件
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [{
                  loader: 'url-loader',
                  // loader: 'file-loader',
                  options: {
                    esModule: false, // 这里设置为false
                    name: '[name].[ext]',
                    limit: 10240
                  }
                }]
              },         // 配置处理url
            // limit 给的值是图片的大小，单位是 字节 byte 
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' },
            // 处理字体文件的配置
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            // 转换高级的es语法
            { test: /\.vue$/, use: 'vue-loader' },
            // 处理.vue文件的配置
        ]
    },
    // 解决
    resolve: {
        alias: {
            // "vue$": "vue/dist/vue.js"
        }
    }
}

//输入webpack后，回去项目根目录中查找配置文件，返回一个对象