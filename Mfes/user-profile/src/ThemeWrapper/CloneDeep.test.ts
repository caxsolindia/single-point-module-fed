import cloneDeep from "./CloneDeep.ts";

describe("cloneDeep", () => {
  test("clones primitive values", () => {
    expect(cloneDeep(42)).toBe(42);
    expect(cloneDeep("hello")).toBe("hello");
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBe(null);
    expect(cloneDeep(undefined)).toBe(undefined);
  });

  test("clones arrays deeply", () => {
    const array = [1, [2, 3], { a: 4 }];
    const clonedArray = cloneDeep(array);
    expect(clonedArray).toEqual(array);
    expect(clonedArray).not.toBe(array);
    expect(clonedArray[1]).not.toBe(array[1]);
    expect(clonedArray[2]).not.toBe(array[2]);
  });

  test("clones objects deeply", () => {
    const obj = { a: 1, b: { c: 2, d: [3, 4] } };
    const clonedObj = cloneDeep(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
    expect(clonedObj.b.d).not.toBe(obj.b.d);
  });

  test("returns functions as is", () => {
    const fn = () => {};
    expect(cloneDeep(fn)).toBe(fn);
  });

  test("handles special cases", () => {
    // Test Date object
    const date = new Date();
    const clonedDate = cloneDeep(date);
    expect(clonedDate).not.toBe(date);

    // Test RegExp object
    const regex = /test/;
    const clonedRegex = cloneDeep(regex);
    expect(clonedRegex).not.toBe(regex);
  });
});
