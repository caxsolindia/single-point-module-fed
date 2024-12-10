import cloneDeep from "./CloneDeep.ts";

describe("cloneDeep", () => {
  it("should return primitive values as they are", () => {
    expect(cloneDeep(1)).toBe(1);
    expect(cloneDeep("string")).toBe("string");
    expect(cloneDeep(true)).toBe(true);
    expect(cloneDeep(null)).toBeNull();
    expect(cloneDeep(undefined)).toBeUndefined();
  });

  it("should deep clone arrays", () => {
    const arr = [1, 2, { a: 3, b: [4, 5] }];
    const clonedArr = cloneDeep(arr) as (number | { a: number; b: number[] })[];

    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
    expect((clonedArr[2] as { a: number; b: number[] }).b).not.toBe(
      (arr[2] as { a: number; b: number[] }).b,
    );
  });

  it("should deep clone objects", () => {
    const obj = { a: 1, b: { c: 2, d: { e: 3 } } };
    const clonedObj = cloneDeep(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
    expect(clonedObj.b.d).not.toBe(obj.b.d);
  });

  it("should handle functions by returning the same function reference", () => {
    const func = () => "test";
    const obj = { a: func };
    const clonedObj = cloneDeep(obj);

    expect(clonedObj.a).toBe(func);
  });

  it("should deep clone nested objects and arrays", () => {
    const complexObj = {
      a: [{ b: 1 }, { c: 2 }],
      d: { e: [3, { f: 4 }] },
    };
    const clonedComplexObj = cloneDeep(complexObj);

    expect(clonedComplexObj).toEqual(complexObj);
    expect(clonedComplexObj).not.toBe(complexObj);
    expect(clonedComplexObj.a).not.toBe(complexObj.a);
    expect(clonedComplexObj.a[0]).not.toBe(complexObj.a[0]);
    expect(clonedComplexObj.d.e).not.toBe(complexObj.d.e);
    expect(clonedComplexObj.d.e[1]).not.toBe(complexObj.d.e[1]);
  });

  interface RecursiveObject {
    [key: string]: RecursiveObject | number | string;
  }

  it("should handle circular references", () => {
    const obj: RecursiveObject = { a: 1 };
    obj.b = obj; // Circular reference

    const clonedObj = cloneDeep(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj.b).toBe(clonedObj);
  });
});
