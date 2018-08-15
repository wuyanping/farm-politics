'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')], // 指定检查的目录
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  // 基础目录，绝对路径，用于从配置中解析入口起点(entry point)和加载器(loader)
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    //打包后的文件存放的地方
    path: config.build.assetsRoot,

    // //打包后输出文件的文件名
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },

  // 文件解析: 主要设置模块如何被解析
  resolve: {
    // require查找module的话从这里开始查找            
    modules: [
        'node_modules',
        resolve('src'),
        resolve('static')
    ],

    // 自动解析确定的拓展名, require模块可以省略不写后缀名
    extensions: ['.js', '.css','.scss', '.vue', '.json'],

    //创建import或require的别名, 后续直接 require('style') 即可
    alias: {
      'vue$': 'vue/dist/vue',
      '@': resolve('src'),
      'projectRoot': resolve(''),
      STATIC: resolve('static'),
      COMPONENTS : resolve('/src/assets/js/components'),
      CONFIG: resolve('/src/assets/js/config'),
      DIRECTIVE : resolve('/src/assets/js/directive'),
      FILTERS : resolve('/src/assets/js/filters'),
      PAGE : resolve('/src/assets/js/page'),
      ROUTER : resolve('/src/assets/js/router'),
      UTILS : resolve('/src/assets/js/utils'),
      VIEWS: resolve('/src/assets/js/views'),
      SASS : resolve('/src/assets/sass') // @import引入的好像不行
      // WAPVIEWS: resolve('src/assets/js/wapviews'),
    }
  },

  // 模块解析
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
