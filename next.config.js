const path = require('path')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
// const webpack = require('webpack')

module.exports = withSass(withCSS({
  webpack(config) {
    // Config for relative module
    config.resolve.modules.push(path.resolve('./'))
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]'
        }
      }
    })
    return config
  }
}))