import type { MaybeFunction } from "@/types/common";

export function capitalize0(val: string) {
  return val?.length ? String(val[0]).toUpperCase() + String(val).slice(1) : val;
}

export function camelCase(val: string) {
    return String(val).split(/[,;| -]/).reduce((acc, curr, idx) => acc += idx === 0 ? curr.toLowerCase() : capitalize0(curr), '');
}

export function resolveValue<T>(input: MaybeFunction<T>): T {
  return typeof input === 'function' ? (input as () => T)() : input;
}