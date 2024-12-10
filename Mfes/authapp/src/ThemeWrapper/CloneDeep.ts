const cloneDeep = <T>(obj: T, seen = new WeakMap()): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj))
    return obj.map((item) => cloneDeep(item, seen)) as unknown as T;
  if (typeof obj === "function") return obj;

  if (seen.has(obj)) return seen.get(obj);

  const clonedObj: { [key: string]: unknown } = {};
  seen.set(obj, clonedObj);

  Object.keys(obj).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = cloneDeep(
        (obj as { [key: string]: unknown })[key],
        seen,
      );
    }
  });
  return clonedObj as T;
};

export default cloneDeep;
