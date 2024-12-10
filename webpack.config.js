const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const share = mf.share;
const webpack = require('webpack');

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(path.join(__dirname, 'tsconfig.json'), [
  /* mapped path to share */
]);

module.exports = {
  output: {
    uniqueName: 'shell',
    publicPath: 'http://localhost:8080/',
    scriptType: 'text/javascript',
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.DefinePlugin({
      ngDevMode: JSON.stringify(process.env.NODE_ENV !== 'production'),
    }),
    new ModuleFederationPlugin({
      library: { type: 'module' },

      name: 'shell',
      filename: 'remoteEntry.js',
      exposes: {},

      // For hosts (please adjust)
      remotes: {
        authapp: 'authapp@http://localhost:8080/authapp/remoteEntry.js',
        styleguide:
          'styleguide@http://localhost:8080/styleguide/remoteEntry.js',
        user_profile: 'user_profile@http://localhost:8080/profilepage/remoteEntry.js'
      },

      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
        },

        ...sharedMappings.getDescriptors(),
      }),
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
