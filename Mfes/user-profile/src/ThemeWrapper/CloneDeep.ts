const cloneDeep = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (Array.isArray(obj))
    return obj.map((item) => cloneDeep(item)) as unknown as T;
  if (typeof obj === "function") return obj;

  const clonedObj: { [key: string]: unknown } = {};
  Object.keys(obj).forEach((key) => {
    if (Object.hasOwn(obj, key)) {
      clonedObj[key] = cloneDeep((obj as { [key: string]: unknown })[key]);
    }
  });
  return clonedObj as T;
};

export default cloneDeep;
