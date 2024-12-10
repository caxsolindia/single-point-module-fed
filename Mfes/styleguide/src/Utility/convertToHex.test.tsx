import rgbaToHex from "./convertToHex.js"; // Adjust the import path as necessary

describe("rgbaToHex", () => {
  it("should convert rgba(115, 11, 166, 1) to #730ba6", () => {
    expect(rgbaToHex("rgba(115, 11, 166, 1)")).toBe("#730ba6");
  });

  it("should convert rgba(115, 11, 166, 0.2) to #730ba633", () => {
    expect(rgbaToHex("rgba(115, 11, 166, 0.2)")).toBe("#730ba633");
  });

  it("should convert rgba(255, 0, 0, 1) to #ff0000", () => {
    expect(rgbaToHex("rgba(255, 0, 0, 1)")).toBe("#ff0000");
  });

  it("should convert rgba(255, 0, 0, 0.5) to #ff000080", () => {
    expect(rgbaToHex("rgba(255, 0, 0, 0.5)")).toBe("#ff000080");
  });

  it("should convert rgba(0, 0, 0, 0) to #00000000", () => {
    expect(rgbaToHex("rgba(0, 0, 0, 0)")).toBe("#00000000");
  });
});
