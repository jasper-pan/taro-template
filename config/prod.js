module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    sourceMapType:'cheap-module-source-map',
    enableExtract:false,
    webpackChain(chain) {
      chain.merge({
        output: {
          filename: 'main.js'
        },
        optimization:{
          runtimeChunk: false,
          // splitChunks:{
          //   chunks: 'all',
          //   minSize: 10,
          //   minChunks: 2,
          //   automaticNameDelimiter: '~',
          //   name: true,
          //   cacheGroups: {
          //     common: {
          //         test: /src\/other/,
          //         enforce: true
          //     }
          // }


          // },
         
        }
        // module: {
        //   rules: {
        //     use: {
        //       loader: 'babel-loader',
        //       options: {
        //         presets: [
        //           '@babel/preset-env',
        //           '@babel/preset-react',
        //           '@babel/preset-typescript',
        //         ],
        //       }
        //     }
        //   }
        // }
      })
      chain.plugins.delete('htmlWebpackPlugin')
      chain.plugins.delete('addAssetHtmlWebpackPlugin')
     

    }

  }
}
