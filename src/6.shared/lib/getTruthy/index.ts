export type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T

export const getTruthy = <T>(value: T): value is Truthy<T> => !!value
