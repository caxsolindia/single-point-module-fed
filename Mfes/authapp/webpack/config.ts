module.exports = {
  // DEV_PORT_URL: "http://4.224.104.252:8081/",
  // DEV_PORT_URL: "https://authapp.hardikpatel.work/",
  // PORT: 8081,
  MODUL_FED_NAME: "authapp",

  // Add remotes app url for the local development mode
  DEV_REMOTES: {
    // styleguide: "styleguide@http://4.187.144.99:8082/remoteEntry.js",
    // styleguide: "styleguide@https://test.hardikpatel.work/remoteEntry.js"
    styleguide: "styleguide@http://localhost:8080/styleguide/remoteEntry.js"
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
    };
  },
};
