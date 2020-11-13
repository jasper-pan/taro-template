module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {

    webpackChain(chain) {
      chain.merge({
        output: {
          filename: 'main.js',
          libraryTarget: 'commonjs'
        },
        module: {
          rules: {
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  '@babel/preset-env',
                  '@babel/preset-react',
                  '@babel/preset-typescript',
                ],
              }
            }
          }
        }
      })
      chain.plugins.delete('htmlWebpackPlugin')
      chain.plugins.delete('addAssetHtmlWebpackPlugin')

    }

  }
}
