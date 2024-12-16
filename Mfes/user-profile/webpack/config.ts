const URLpath = require("path");
require("dotenv").config({ path: URLpath.resolve(__dirname, "../../../.env") });

module.exports = {
  DEV_PORT_URL: process.env.PROFILE_URL,
  MODUL_FED_NAME: "user_profile",

  // Add remotes app url for the local development mode
  DEV_REMOTES: {
    styleguide: `styleguide@${process.env.STYLEGUIDE_URL}remoteEntry.js`,
    services: "services@http://4.213.45.71:8084/remoteEntry.js",
  },

  // Add remotes app url for the production mode
  PROD_REMOTES: {},

  // Shared Depencies to be shared in both prod and dev environment
  SHARED_DEPEDENCIES(deps) {
    return {
      ...deps,
      react: { singleton: true, eager: true, requiredVersion: deps.react },
      "react-dom": {
        singleton: true,
        eager: true,
        requiredVersion: deps["react-dom"],
      },
      "@mui/material": {
        singleton: true,
        eager: true,
        requiredVersion: deps["@mui/material"],
      },
      "@emotion/react": {
        singleton: true,
        eager: true,
        requiredVersion: deps["@emotion/react"],
      },
      "@emotion/styled": {
        singleton: true,
        eager: true,
        requiredVersion: deps["@emotion/styled"],
      },
      "react-router-dom": {
        singleton: true,
        eager: true,
        requiredVersion: deps["react-router-dom"],
      },
    };
  },
};
