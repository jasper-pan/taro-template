var path = require('path');

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  sass: {
    resource: path.resolve(__dirname, '..', 'src/assets/scss/theme/_skin.scss')
  },
  h5: {
    devServer: {
      https: false,
      proxy: {
        '/tRtApi': {
          target: 'http://10.225.64.92/mhtest/api/tRetailAPI',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/tRtApi': ''
          }
        },
        '/authApi': {
          target: 'http://10.225.64.92/mhtest/api/uc/v1/user',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/authApi': ''
          }
        },
        '/profileApi': {
          target: 'http://10.225.64.92/mhtest/api/uc/v1/profile',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/profileApi': ''
          }
        },
        '/locations': {
          target: 'http://10.225.6.43:8280/LocationAPI',
          secure: false,
          changeOrigin: true,
          pathRewrite: {
            '^/locations': ''
          }
        }
      }
    }
    // webpackChain(chain) {
    
    //   chain.plugins.delete('htmlWebpackPlugin')
    //   chain.plugins.delete('addAssetHtmlWebpackPlugin')

    // }

  }
}
