const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {
  DEV_PORT_URL,
  MODUL_FED_NAME,
  DEV_REMOTES,
  SHARED_DEPEDENCIES,
} = require("./config.ts");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("../package.json").dependencies;

module.exports = {
  mode: "development",
  output: {
    publicPath: DEV_PORT_URL,
    scriptType: "text/javascript",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
  },
  devtool: "cheap-module-source-map",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new ESLintPlugin(),
    new ModuleFederationPlugin({
      name: MODUL_FED_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./user_profile": path.resolve(__dirname, "..", "./src/bootstrap.tsx"),
      },
      remotes: DEV_REMOTES,
      shared: SHARED_DEPEDENCIES(deps),
    }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
};
