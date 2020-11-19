var path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  
  mini: {},
  sass: {
    resource: path.resolve(__dirname, '..', 'src/assets/scss/theme/_skin.scss')
  },
  h5: {
    sourceMapType:'source-map',
    enableExtract:false,
    webpackChain(chain,webpack) {
      
      chain.merge({
        output: {
          filename: 'main.js'
        }
      })
      chain.plugin('limit').use(webpack.optimize.LimitChunkCountPlugin).init((Plugin) => new Plugin({maxChunks: 1}))
      // chain.plugins.delete('htmlWebpackPlugin')
      chain.plugins.delete('addAssetHtmlWebpackPlugin')
     

    }

  }
}
