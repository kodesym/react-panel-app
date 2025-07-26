import { useCallback, useSyncExternalStore } from 'react';
import type { Atom, WritableAtom } from 'jotai';
import { globalStore } from '@/store/globalStore';

export function useGlobalAtomValue<Value>(atom: Atom<Value>): Value {
  return useSyncExternalStore(
    (callback) => globalStore.sub(atom, callback),
    () => globalStore.get(atom),
    () => globalStore.get(atom)
  );
}

export function useGlobalSetAtom<Value, Args extends unknown[], Result>(
  atom: WritableAtom<Value, Args, Result>) {
  return useCallback((...args: Args) => { globalStore.set(atom, ...args); }, [atom]);
}