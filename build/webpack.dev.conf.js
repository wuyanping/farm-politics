'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    }, // 如果设置为true，所有的跳转将指向index.html
    hot: true,// 开启热加载
    contentBase: '../dist', // since we use CopyWebpackPlugin. // 本地服务器所加载的页面所在的目录
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser, // 自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    // 定义环境变量
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),

    //设置全局变量
    new webpack.ProvidePlugin({
        Vue: 'vue',
        'window.Vue': 'vue',
        
        axios: 'axios'
    }),//直接加载到全局不需要require()

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update. // 在开发过程
    new webpack.NoEmitOnErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    // 根据模板生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      // inject: true
    }),

    // copy custom static assets
    // 拷贝资源插件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'), // 定义要拷贝的源目录 
        to: config.dev.assetsSubDirectory, //  定义要拷贝到的目标目录
        // ignore: ['.*'] // 忽略拷贝指定的文件
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
