const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("../package.json").dependencies;
const {
  MODUL_FED_NAME,
  PROD_REMOTES,
  SHARED_DEPEDENCIES,
} = require("./config.ts");

module.exports = {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new ModuleFederationPlugin({
      name: MODUL_FED_NAME,
      filename: "remoteEntry.js",
      exposes: {
        "./authApp": path.resolve(__dirname, "..", "./src/bootstrap.tsx"),
      },
      remotes: PROD_REMOTES,
      shared: SHARED_DEPEDENCIES(deps),
    }),
  ],
};
