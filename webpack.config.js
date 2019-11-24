const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm

// function resolve (dir) {
//     return path.join(__dirname,'..',dir)
// }

module.exports = {
    mode: "development",
    // 项目总入口文件
    entry:path.join(__dirname,'./src/main.js'),
    // 输出文件
    output:{
        path:path.join(__dirname,'dist'),//文件录入到dist目录下
        filename:'bundle-[hash].js'//文件名都加上hash值
    },
    // 可自动延展文件名后缀，当import文件时，不必写后缀
    resolve: {
        extensions: ['.wasm', '.mjs', '.js', '.json', '.vue']
    },
    // 单元，模块
    module:{
        rules:[{
            // 使用vue-loader解析.vue文件
            test:/\.vue$/,
            loader:'vue-loader'
        },
        {
            // 加上style-loader，css-loader解析才能解析.vue中的<style>标签内的css内容
            test:/\.css$/,
            use:['style-loader','css-loader']
        },
        {
            // css处理
            test: /\.scss$/,
            use: [
                // 处理顺序是从 sass-loader 到 style-loader
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            //图片处理 
            test: /\.(gif|jpg|jpeg|png|svg)$/i,
            use: [{
                loader: 'url-loader',
                options: {
                    // 当文件大小小于 limit byte 时会把图片转换为 base64 编码的dataurl，否则返回普通的图片
                    limit: 200000,
                    name: 'dist/assest/images/[name]-[hash:5].[ext]' // 图片文件名称加上内容哈希
                }
            }]
        },
        {
            // 转译 es6 代码为 es5 代码
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/, // 不处理这两个文件夹里的内容
            loader: 'babel-loader'
        }]
    },
    // 插件
    plugins:[
        // 引入模板渲染插件
        new htmlWebpackPlugin({
            filename:'index.html',//输出的html文件标题
            template:'index.html',//html模板所在路径
            inject:'body'//注入选项：script标签位于html文件的body底部
        }),
        // 将定义过的其他规则复制并应用到.vue文件里相应语言的块
        new VueLoaderPlugin(),
        new CleanWebpackPlugin()
    ]
}