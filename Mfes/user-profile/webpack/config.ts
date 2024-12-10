module.exports = {
  // DEV_PORT_URL: "http://4.213.45.162:8088/",
  // PORT: 8088,
  MODUL_FED_NAME: "user_profile",

  // Add remotes app url for the local development mode
  // 4.213.45.162 user profile
  // 4.187.144.99 styleguide
  // http://4.213.45.71 services
  DEV_REMOTES: {
    styleguide: "styleguide@http://localhost:8080/styleguide/remoteEntry.js",
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
