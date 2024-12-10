// auth.test.ts
import { getAuthToken } from "./GetToken.tsx"; // Adjust the import path as needed

describe("getAuthToken", () => {
  beforeEach(() => {
    // Clears the localStorage mock before each test
    localStorage.clear();
  });

  it("should return the authToken when it exists in localStorage", () => {
    const mockToken = "mockToken123";
    localStorage.setItem("authToken", mockToken);

    const result = getAuthToken();
    expect(result).toBe(mockToken);
  });

  it("should return null when there is no authToken in localStorage", () => {
    const result = getAuthToken();
    expect(result).toBeNull();
  });
});
