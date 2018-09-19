const path = require('path');
const DISTPATH = path.resolve(__dirname, '../dist');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const env = process.env.NODE_ENV;

console.log(env);

const baseConfig = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    // 多入口输出
    filename: 'js/[name].bundle.js',
    path: DISTPATH, // Users/gongyuan/webpack/webpack-base/dist
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader处理顺序从下往上
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        // url-loader内置了file-loader,不同的是，当文件小于1024字节时，会转换为base64编码
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '8192'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 清除dist中的文件
    new CleanWebpackPlugin(['dist']),
    // 生成包含js等各种依赖的html文件
    // TODO 其他特别配置
    new HtmlWebpackPlugin({
      title: '生成html'
    })
  ],
  devServer: {
    contentBase: DISTPATH,
    compress: true,
    port: 9000 // 一切服务都启用gzip 压缩：
  }
}

// 区分环境变量
if (env === 'dev') {
  baseConfig.devtool = 'inline-source-map';
}

module.exports = baseConfig;