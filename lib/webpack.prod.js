/**
 * 1. 代码压缩
 * 2. 文件指纹
 * 3. tree-shaking
 * 4. scope hoisting
 * 5. 速度优化
 * 6. 体积优化 
 */
const cssnano = require('cssnano');
const merge = require('webpack-merge')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.base')

const prodConfig = {
    mode: 'production',
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
        }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'vue',
                    entry: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
                    global: 'Vue',
                },
            ],
        }),
    ],
    optimization: {
        splitChunks: {
        minSize: 0,
        cacheGroups: {
            commons: {
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
            },
        },
    },
}

module.exports = merge(baseConfig,prodConfig)