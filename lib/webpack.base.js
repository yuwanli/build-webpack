/**
 * 1. 资源解析
 *    a. 解析es6
 *    b. 解析vue react
 *    c. 解析less
 *    d. 解析图片
 *    e. 解析字体
 * 2. 样式增强
 *    a. css前缀补全
 *    b. css px转换成rem
 * 3. 目录清理
 * 4. 多页面打包
 * 5. 命令行信息显示优化
 * 6. 错误捕获
 * 7. css提取成一个单独的文件
 */
const path = require('path');
const glob = require('glob');
const autoprefixer = require('autoprefixer');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectRoot = process.cwd();

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync('./test/*/index.js');

    entryFiles.map(item => {
        const match = item.match(/test\/(.*)\/index\.js/);
        const pageName = match && match[1];

        entry[pageName] = item;
        htmlWebpackPlugins.push(
            new htmlWebpackPlugin({
                template: `./test/${pageName}/index.html`,
                filename: `${pageName}.html`,
                chunks: [pageName],
                inject: true,
                // minify: {
                //   html5: true,
                //   collapseWhitespace: true,
                //   preserveLineBreaks: false,
                //   minifyCSS: true,
                //   minifyJS: true,
                //   removeComments: false,
                // },
            })
        )
        
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry: entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        }
    },
    module: {
        rules: [ 
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.vue$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'vue-loader',
                }
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader',{
                    loader: 'postcss-loader',
                    options:{
                        plugins:()=>[
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 2 version']  //兼容信息设置
                            })
                        ]
                    }
                }]
            },
            {
                test: /.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader',{
                    loader: 'postcss-loader',
                    options:{
                        plugins:()=>[
                            require('autoprefixer')({
                                overrideBrowserslist: ['last 2 version']  //兼容信息设置
                            })
                        ]
                    }
                },'less-loader']
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
        }),
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        function errorPlugin() {
            this.hooks.done.tap('done', (stats) => {
                if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
                    process.exit(1);
                }
            });
        },
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
    mode: 'development'
}