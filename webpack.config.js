const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = (env, argv) => {
    const devMode = argv.mode !== 'production'
    return {
      entry: [
        "babel-polyfill",
        path.join(__dirname, './src/index.js')
    ],
    devServer: {
        port: 3000, //端口号
        proxy: {
          '/api': {
            target: 'http://www.baidu.com/',
            pathRewrite: {'^/api' : '/campaign_huggies/t3store_freeuse/admin'},
            changeOrigin: true
          }
        }
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          },
          {
            test: /\.less$/,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'less-loader',
            ]
          },
          {
              test: /\.css$/,
              use: [
                  devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                  'css-loader',
                  'postcss-loader'
              ]
          },
          {
              test: /\.html$/,
              use: [{
                  loader: "html-loader",
                  options: {
                      minimize: true
                  }
              }]
          },
          {
              test: /\.(png|jpg|gif)$/,
              use: [
                {
                  loader: 'file-loader',
                  options: {}
                }
              ]
          }
        ]
      },
      plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin()
      ]
    }
}