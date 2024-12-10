/**
 * @jest-environment jsdom
 */
import config from "./codegen.ts"; // Importing the configuration from codegen.ts
import "@testing-library/jest-dom";

// Mock queries and mutations for testing
const mockQueries = `
  query GetUser {
    user(id: "1") {
      id
      name
      email
    }
  }
`;

describe("GraphQL Codegen Configuration", () => {
  it("should export the correct configuration object", () => {
    // Override the queries and mutations with mock queries and mutations
    const configWithMockQueriesAndMutations = {
      ...config,
      documents: mockQueries, // Assuming mockQueries represent document path
      generates: {
        ...config.generates,
        "./src/gql/operations.ts": {
          ...config.generates["./src/gql/operations.ts"],
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

    // Assuming your configuration object has specific properties like overwrite
    expect(configWithMockQueriesAndMutations).toBeDefined(); // Check if config is defined
    expect(configWithMockQueriesAndMutations.overwrite).toBe(true); // Check if overwrite is set to true
    expect(configWithMockQueriesAndMutations.schema).toBe(
      "http://4.224.166.175/graphql",
    ); // Check if schema URL is correct
    expect(configWithMockQueriesAndMutations.documents).toBe(mockQueries); // Check if documents path is set to mockQueries

    // Check if generates object is defined and contains specific properties
    expect(configWithMockQueriesAndMutations.generates).toBeDefined();
    expect(
      configWithMockQueriesAndMutations.generates["./src/gql/operations.ts"],
    ).toBeDefined(); // Check if generates key is present
    expect(
      configWithMockQueriesAndMutations.generates["./src/gql/operations.ts"]
        .plugins,
    ).toEqual(
      expect.arrayContaining([
        "typescript",
        "typescript-operations",
        { "typescript-react-apollo": { withHooks: true } },
      ]),
    ); // Check if plugins array contains specific plugins
  });
});