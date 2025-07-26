import { atom } from 'jotai';
import type { Getter, Setter } from 'jotai';
import { nanoid } from 'nanoid';
import type {
  PanelEntry,
  PanelEntryMap,
  PanelStoreState,
} from '@/types/panels';
import { panelRegistry } from '@/panels/panelRegistry';
import { historyIndexAtom, historyStackAtom, openPanelsAtom, panelEntryMapAtom } from './atoms';
import { createViewState } from '../viewStateFactory';
import { panelStateConfig } from '@/panels/panelStateConfig';

function panelRegistryEntry(name: string): PanelEntry {
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return {} as PanelEntry;
  const { anchor, isMulti, parentName, width } = panelRegistryEntry;
  return { anchor, isMulti, name, parentName, width } as PanelEntry;
}

function updatePanelEntryMap(
  panelEntryMap: PanelEntryMap,
  id: string,
  name: string,
  updates: Partial<PanelEntry> = {},
): PanelEntryMap {
  let store;
  const panelEntry = panelEntryMap[id];
  if (!panelEntry?.store) {
    store = createViewState(panelStateConfig[name])
  }

  return {
    ...panelEntryMap,
    [id]: {
      ...panelRegistryEntry(name),
      ...panelEntryMap[id] ?? {},
      ...updates,
      ...store && { store },
      id,
    },
  };
}

function pushToHistory(get: Getter, set: Setter) {
  const newHistory: PanelStoreState = {
    openPanels: [...get(openPanelsAtom)],
    panelEntryMap: { ...get(panelEntryMapAtom) },
  };

  const stack = [...get(historyStackAtom)];
  const index = get(historyIndexAtom);

  // Remove forward history
  const prunedStack = index < stack.length - 1 ? stack.slice(0, index + 1) : stack;

  // Avoid duplicate entries
  if (JSON.stringify(prunedStack.at(-1)) !== JSON.stringify(newHistory)) {
    set(historyStackAtom, [...prunedStack, newHistory]);
    set(historyIndexAtom, prunedStack.length);
  }
  $log.info(`stack: ${index} - ${get(historyIndexAtom)}`, get(historyStackAtom))
}

export const openPanelAtom = atom(null, (get, set, name: string, overrides: Partial<PanelEntry> = {}) => {
  const openPanels = get(openPanelsAtom);
  const memoryMap = get(panelEntryMapAtom);
  
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return;
  
  const id = panelRegistryEntry.isMulti ? nanoid() : name;

  if (!openPanels.includes(id)) {
    set(openPanelsAtom, [...openPanels, id]);
  }

  set(panelEntryMapAtom, updatePanelEntryMap(memoryMap, id, name, overrides));

  pushToHistory(get, set);
});

export const updatePanelAtom = atom(null, (get, set, id: string, overrides: Partial<PanelEntry> = {}) => {
  const panelEntryMap = get(panelEntryMapAtom);
  const panelEntry = panelEntryMap[id];
  if (!panelEntry) return;

  set(panelEntryMapAtom, updatePanelEntryMap(panelEntryMap, id, panelEntry.name, overrides));
  
  pushToHistory(get, set);
});


export const closePanelAtom = atom(null, (get, set, id: string) => {
  const openPanels = get(openPanelsAtom).filter((pid) => pid !== id);
  set(openPanelsAtom, openPanels);

  const panelEntryMap = get(panelEntryMapAtom);
  const panelEntry = panelEntryMap[id];
  
  if (panelEntry.isMulti) {
    const newMap = Object.fromEntries(
      Object.entries(panelEntryMap).filter(([k, _v]) => k !== id)
    );
    set(panelEntryMapAtom, newMap);
  }

  pushToHistory(get, set);
});

export const togglePanelAtom = atom(null, (get, set, name: string) => {
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return;

  if (panelRegistryEntry.isMulti) {
    set(openPanelAtom, name);
  }
  else {
    const openPanels = get(openPanelsAtom);
    if (openPanels.includes(name)) {
      set(closePanelAtom, name);
    } else {
      set(openPanelAtom, name);
    }
  }
});

export const canGoBackAtom = atom((get) => get(historyIndexAtom)  > 1);
export const canGoForwardAtom = atom((get) => {
  const index = get(historyIndexAtom);
  const stack = get(historyStackAtom);
  return index < stack.length - 1;
});

export const goBackAtom = atom(null, (get, set) => {
  const index = get(historyIndexAtom);
  if (index > 0) {
    const newIndex = index - 1;
    const entry = get(historyStackAtom)[newIndex];
    set(openPanelsAtom, [...entry.openPanels]);
    set(panelEntryMapAtom, { ...entry.panelEntryMap });
    set(historyIndexAtom, newIndex);
    return entry;
  }
  return null;
});

export const goForwardAtom = atom(null, (get, set) => {
  const index = get(historyIndexAtom);
  const stack = get(historyStackAtom);
  if (index < stack.length - 1) {
    const newIndex = index + 1;
    const entry = stack[newIndex];
    set(openPanelsAtom, [...entry.openPanels]);
    set(panelEntryMapAtom, { ...entry.panelEntryMap });
    set(historyIndexAtom, newIndex);
    return entry;
  }
  return null;
});

export const resetAtom = atom(null, (get, set) => {
  set(historyIndexAtom, -1);
  set(historyStackAtom, []);
  set(openPanelsAtom, []);
  set(panelEntryMapAtom, {});
});