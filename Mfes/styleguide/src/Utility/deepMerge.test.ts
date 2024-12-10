import deepMerge from "./deepMerge.js";

describe("deepMerge", () => {
  it("should return the original object if the source is null or undefined", () => {
    const object = { a: 1, b: 2 };
    const resultNull = deepMerge(object, null);
    expect(resultNull).toEqual(object);

    const resultUndefined = deepMerge(object, undefined);
    expect(resultUndefined).toEqual(object);
  });

  it("should merge two objects without a customizer", () => {
    const object = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const expectedResult = { a: 1, b: 3, c: 4 };
    const result = deepMerge(object, source);
    expect(result).toEqual(expectedResult);
  });

  it("should use the customizer function if provided", () => {
    const object = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const customizer = (srcValue: unknown, objValue: unknown): unknown =>
      objValue !== undefined
        ? (objValue as number) + (srcValue as number)
        : srcValue;
    const expectedResult = { a: 1, b: 5, c: 4 };
    const result = deepMerge(object, source, customizer);
    expect(result).toEqual(expectedResult);
  });

  it("should deeply merge objects", () => {
    const object = { a: 1, b: { x: 1, y: 2 } };
    const source = { b: { y: 3, z: 4 }, c: 4 };
    const expectedResult = { a: 1, b: { x: 1, y: 3, z: 4 }, c: 4 };
    const result = deepMerge(object, source);
    expect(result).toEqual(expectedResult);
  });

  it("should not mutate the original object", () => {
    const object = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const originalObject = { ...object };
    deepMerge(object, source);
    expect(object).toEqual(originalObject);
  });

  it("should handle merging with nested objects using a customizer", () => {
    const object = { a: { x: 1 }, b: { y: 2 } };
    const source = { a: { z: 3 }, b: { y: 3, z: 4 } };
    const customizer = (srcValue: unknown, objValue: unknown): unknown => {
      if (
        typeof srcValue === "object" &&
        srcValue !== null &&
        typeof objValue === "object" &&
        objValue !== null
      ) {
        return deepMerge(objValue, srcValue, customizer);
      }
      return objValue !== undefined
        ? (objValue as number) + (srcValue as number)
        : srcValue;
    };
    const expectedResult = { a: { x: 1, z: 3 }, b: { y: 5, z: 4 } };
    const result = deepMerge(object, source, customizer);
    expect(result).toEqual(expectedResult);
  });
});
