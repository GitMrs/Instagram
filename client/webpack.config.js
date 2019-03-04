const path = require('path');
const clientPath = path.resolve(__dirname);
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
module.exports = {
  entry:{
    main:path.resolve(clientPath, 'index.js')
  },
  output:{
    publicPath:'/',
    path:path.resolve(clientPath,'dist'),
    filename:'src/[name].js'
  },
  module:{
    rules:[
      {
        test:/\.(js|jsx)$/,
        exclude:/node_modules/,
        use:{
          loader:'babel-loader'
        }
      },
      {
        test:/\.(css|less|scss)$/,
        use:['style-loader','css-loader','sass-loader']
      },
      // {
      //   test:/\.(css|less|scss)$/,
      //   use:['style-loader',
      //   {
      //     loader:'css-loader',
      //     options:{ //css模块化
      //       modules:true,
      //       localIdentName:'[local]--[hash:base64:5]'
      //     }
      //   },
      //   'sass-loader'],
      //   exclude:/node_modules/
      // },
      // {
      //   test:/\.(css|less|scss)$/,//配置antd样式
      //   use:['style-loader',
      //   {
      //     loader:'css-loader',
      //   },
      //   'sass-loader'],
      //   include:/node_modules/
      // },
      {
        test:/\.(png|jpg|gif)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:'8170'
            }
          }
        ]
      }
    ]
  },
  resolve:{
    alias:{
      "@component":path.resolve(clientPath,'src/components'),
      "@assets":path.resolve(clientPath,'assets/images'),
      "@common":path.resolve(clientPath,'src/common'),
      "@scss":path.resolve(clientPath,'assets/style')

    }
  },
  devServer:{
    contentBase:path.resolve(clientPath,'dist'),
    historyApiFallback:true,
    host:'127.0.0.1',
    port:'3000',
    disableHostCheck:true,
    inline:true,
    compress:true,
    overlay:true,
    proxy:{
      '/api':{
        target:'http://127.0.0.1:7001',
        changeOrigin:true
      }
    }
  },
  plugins:[
    new HtmlWebPackPlugin({
      template:path.resolve(clientPath,'index.html'),
      filename:'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}