/**
 * 1. 代码热更新
 * 3. server
 * 2. sourcemap
*/
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

const devConfig = {
    mode: 'production',
    devServer: {
        contentBase: './dist',
        hot: true,
        open: true
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = merge(baseConfig,devConfig)