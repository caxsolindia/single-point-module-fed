const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const {
  DEV_PORT_URL,
  PORT,
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
    publicPath: "http://localhost:8080/styleguide/",
    scriptType: "text/javascript",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    // port: PORT,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
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
      name: "styleguide",
      filename: "remoteEntry.js",
      exposes: {
        "./ThemeConstants": path.resolve(
          __dirname,
          "..",
          "./src/Hooks/useThemeConstants.tsx",
        ),
        "./Theme": path.resolve(
          __dirname,
          "..",
          "./src/Hooks/useCustomTheme.tsx",
        ),
        "./styleguide": path.resolve(__dirname, "..", "./src/bootstrap.tsx"),
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
