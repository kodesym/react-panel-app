export type PartialExcept<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

export type MaybeFunction<T> = T | (() => T);
