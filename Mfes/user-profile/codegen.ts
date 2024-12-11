import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://4.224.166.175/graphql",
  documents: "src/graphql/*.graphql",
  generates: {
    "./src/gql/operations.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        {
          "typescript-react-apollo": {
            withHooks: true,
          },
        },
      ],
    },
  },
};

export default config;
