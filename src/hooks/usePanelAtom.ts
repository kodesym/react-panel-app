import { useAtom, type Atom } from 'jotai';
import { useStore } from 'jotai/react';
import { usePanel } from './usePanel';

export function usePanelAtom<T = unknown>(key: string) {
  const { id, panelEntry } = usePanel();
  if (!panelEntry) throw new Error(`Panel state not found for: ${id}`);

  const store = useStore(); // scoped to StoreProvider

  const atom = panelEntry.store?.atoms[key];
  if (!atom) throw new Error(`Atom "${key}" not found in panel ${panelEntry.name} - ${id}`);

  return useAtom(atom as Atom<T>, { store });
}