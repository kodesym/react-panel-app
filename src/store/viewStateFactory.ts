import type { AnyAtom, AnyWritableAtom, GetterFn, SetterFn } from '@/types/atom';
import type { ViewState, ViewStateConfig } from '@/types/panels';
import { atom, createStore } from 'jotai';

export function createViewState(config: ViewStateConfig): ViewState {
  const atoms: Record<string, AnyAtom> = {};
  const store = createStore();

  // Create atoms for each field
  for (const key of Object.keys(config.fields)) {
    atoms[key] = atom(config.fields[key]);
  }

  // Create actions (write-only atoms)
  if (config.actions) {
    for (const actionName of Object.keys(config.actions)) {
      atoms[actionName] = atom(null, (get, set) =>
        config.actions![actionName](
          (k: string) => get(atoms[k]),
          (k: string, val: any) => set(atoms[k] as AnyWritableAtom, val)
        )
      );
    }
  }

  // Wrapped accessors
  const getByKey: GetterFn = (key) => store.get(atoms[key]);
  const setByKey: SetterFn = (key, val) => {
    const atom = atoms[key];
    if ('write' in atom) {
      store.set(atom as AnyWritableAtom, val);
    }
  };


  return { atoms, store, get: getByKey, set: setByKey };
}