import convertToRGBA from "./convertToRGBA.js";

describe("convertToRGBA", () => {
  test("converts 3-digit hex to RGBA", () => {
    expect(convertToRGBA("#abc")).toBe("rgba(170, 187, 204, 1.0)");
  });

  test("converts 6-digit hex to RGBA", () => {
    expect(convertToRGBA("#abcdef")).toBe("rgba(171, 205, 239, 1.0)");
  });

  test("converts 8-digit hex to RGBA", () => {
    expect(convertToRGBA("#abcdef80")).toBe("rgba(171, 205, 239, 0.5)");
  });

  test("returns rgba for rgb input", () => {
    expect(convertToRGBA("rgb(171, 205, 239)")).toBe(
      "rgba(171, 205, 239, 1.0)",
    );
  });

  test("trims opacity in rgba input", () => {
    expect(convertToRGBA("rgba(171, 205, 239, 0.445)")).toBe(
      "rgba(171, 205, 239, 0.4)",
    );
  });

  test("returns rgba as is if alpha is not provided", () => {
    expect(convertToRGBA("rgba(171, 205, 239)")).toBe(
      "rgba(171, 205, 239, 1.0)",
    );
  });

  test("returns the color as is if it does not match known formats", () => {
    expect(convertToRGBA("unknown-color")).toBe("unknown-color");
  });
});
