const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const Dotenv = require("dotenv-webpack");
module.exports = (envType) => {
  const { env } = envType;
  const webpackconfig = require(`./webpack.${env}.js`);
  const config = merge(commonConfig, webpackconfig);
  config.plugins.push(
    new Dotenv({
      path: `./.env.${envType.profile}`, // Path to the .env.dev file
    }),
  );
  return config;
};
