type ReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends Date
    ? T
    : {
        [K in keyof T]: T[K] extends (infer U)[]
          ? ReplaceNullWithUndefined<U>[]
          : ReplaceNullWithUndefined<T[K]>;
      };

export const convertNullToUndefined = <
  T extends Record<string | number | symbol, unknown>,
>(
  obj: T,
): ReplaceNullWithUndefined<T> => {
  return Object.entries(obj).reduce<ReplaceNullWithUndefined<T>>(
    (acc, [key, value]) => {
      if (value === null) {
        return {
          ...acc,
          [key]: undefined,
        };
      }

      // Return non-objects unchanged
      if (typeof value !== "object" || Array.isArray(value)) {
        return {
          ...acc,
          [key]: value,
        };
      }

      return {
        ...acc,
        [key]: convertNullToUndefined(value as T),
      };
    },
    {} as ReplaceNullWithUndefined<T>,
  );
};
