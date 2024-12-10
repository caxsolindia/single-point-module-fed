const deepMerge = <T extends object, S extends object>(
  object: T,
  source: S | undefined | null,
  customizer?: (srcValue: unknown, objValue: unknown) => unknown,
): T & S => {
  // If source is null or undefined, return the object as it is
  if (source == null) {
    return object as T & S;
  }

  const result = { ...object } as T & S;

  Object.keys(source).forEach((key) => {
    if (Object.hasOwn(source, key)) {
      const srcValue = (source as Record<string, unknown>)[key];
      const objValue = (object as Record<string, unknown>)[key];

      const newValue = customizer ? customizer(srcValue, objValue) : undefined;

      if (newValue === undefined) {
        if (
          typeof srcValue === "object" &&
          srcValue !== null &&
          !Array.isArray(srcValue) &&
          typeof srcValue !== "function"
        ) {
          (result as Record<string, unknown>)[key] = deepMerge(
            objValue || {},
            srcValue,
            customizer,
          );
        } else {
          (result as Record<string, unknown>)[key] = srcValue;
        }
      } else {
        (result as Record<string, unknown>)[key] = newValue;
      }
    }
  });

  return result;
};

export default deepMerge;
