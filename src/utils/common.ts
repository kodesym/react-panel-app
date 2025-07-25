import type { MaybeFunction } from "@/types/common";

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function resolveValue<T>(input: MaybeFunction<T>): T {
  return typeof input === 'function' ? (input as () => T)() : input;
}