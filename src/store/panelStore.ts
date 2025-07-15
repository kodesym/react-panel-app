
import type { PanelStore, PanelStoreOptions, PanelMemory, PanelMemoryMap, PanelRegistryEntry, PanelRegistry, PanelHistoryEntry } from '@/types/panels';
import { panelRegistry } from '@/modules/panelRegistry';

function extractPanelMemory(panelRegistryEntry: PanelRegistryEntry): PanelMemory {
  const { id, width, parentId, anchor } = panelRegistryEntry;
  return { id, width, parentId, anchor } as PanelMemory;
}

function updatePanelMemoryMap(
  panelMemoryMap: PanelMemoryMap,
  id: string,
  updates: Partial<PanelMemory>,
): PanelMemoryMap {
  return {
    ...panelMemoryMap,
    [id]: {
      ...extractPanelMemory(panelRegistry[id] || {}),
      ...panelMemoryMap[id],
      ...updates,
    },
  };
}

export const createPanelStore = (options?: PanelStoreOptions): PanelStore => {
  let openPanels: string[] = [];
  let panelMemoryMap: PanelMemoryMap = {};

  // History stack and pointer
  const historyStack: PanelHistoryEntry[] = [];
  let historyIndex = -1;  

  const notifyChange = () => {
    options?.onChange?.({ openPanels, panelMemoryMap, panelRegistry });
  };

  // Push current state to history stack
  const pushHistory = () => {
    const entry = { openPanels: [...openPanels], panelMemoryMap: { ...panelMemoryMap } };

    // Avoid duplicates
    const lastEntry = historyStack[historyIndex];
    if (lastEntry && JSON.stringify(lastEntry) === JSON.stringify(entry)) return;

    // Remove any forward history if we're not at the end
    if (historyIndex < historyStack.length - 1) {
      historyStack.splice(historyIndex + 1);
    }

    historyStack.push(entry);
    historyIndex++;
  };

  const restoreHistoryEntry = (entry: PanelHistoryEntry) => {
    openPanels = [...entry.openPanels];
    panelMemoryMap = { ...entry.panelMemoryMap };
    notifyChange();
  };

  const store: PanelStore = {
    get openPanels() {
      return openPanels;
    },

    get panelMemoryMap() {
      return panelMemoryMap;
    },

    get panelRegistry() {
      return panelRegistry;
    },

    get canGoBack() {
      return historyIndex > 0;
    },

    get canGoForward() {
      return historyIndex < historyStack.length - 1;
    },

    openPanel: (id: string, overrides: Partial<PanelMemory> = {}) => {
      if (!panelRegistry[id]) return;

      if (!openPanels.includes(id)) {
        openPanels = [...openPanels, id];
      }

      panelMemoryMap = updatePanelMemoryMap(panelMemoryMap, id, overrides);

      pushHistory(); // Push current state to history stack
      notifyChange();
    },

    closePanel: (id: string) => {
      openPanels = openPanels.filter((pid) => pid !== id);
      notifyChange();
    },

    togglePanel: (id: string) => {
      if (openPanels.includes(id)) {
        store.closePanel(id);
      } else {
        store.openPanel(id);
      }
    },

    updatePanel: (id: string, updates: Partial<PanelMemory> = {}) => {
      if (!panelRegistry[id]) return;
      panelMemoryMap = updatePanelMemoryMap(panelMemoryMap, id, updates);
      notifyChange();
    },

    setOpenPanels: (ids: string[]) => {
      openPanels = ids;
      notifyChange();
    },

    setPanelMemoryMap: (newMemoryMap: PanelMemoryMap) => {
      panelMemoryMap = { ...panelMemoryMap, ...newMemoryMap };
      notifyChange();
    },

    reset: () => {
      openPanels = [];
      panelMemoryMap = {};
      notifyChange();
    },

    goBack: (): PanelHistoryEntry | null => {
      if (historyIndex > 0) {
        historyIndex--;
        const entry = historyStack[historyIndex];
        restoreHistoryEntry(entry);
        return entry;
      }
      return null;
    },

    goForward: (): PanelHistoryEntry | null => {
      if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        const entry = historyStack[historyIndex];
        restoreHistoryEntry(entry);
        return entry;
      }
      return null;
    },

    getBreadcrumbs: () => {
      return openPanels.map((id) => panelMemoryMap[id]);
    },

  };

  return store;
};