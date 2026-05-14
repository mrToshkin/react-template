export const getKeys = <T extends object = object>(obj: T) =>
  Object.keys(obj) as (keyof T)[];

export const getValues = <T extends object = object>(obj: T) =>
  Object.values(obj) as T[keyof T][];

export const getEntries = <T extends object = object>(obj: T) =>
  Object.entries(obj) as [keyof T, T[keyof T]][];
