module.exports = {
  DEV_PORT_URL: "http://localhost:8000/styleguide/",
  MODUL_FED_NAME: "styleguide",

  // Add remotes app url for the local development mode
  DEV_REMOTES: {},

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
