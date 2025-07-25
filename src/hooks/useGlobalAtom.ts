import { getDefaultStore, type Atom, type WritableAtom } from 'jotai';
import { useCallback, useSyncExternalStore } from 'react';

const globalStore = getDefaultStore();

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