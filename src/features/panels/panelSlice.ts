import type { PanelEntry, PanelRequest, PanelStoreState, PanelStore } from "@/types/panels";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { panelRegistry } from "../panelRegistry";
import { nanoid } from "nanoid";

function extractPanelEntry(name: string): PanelEntry {
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return {} as PanelEntry;
  const { anchor, isMulti, parentName, width } = panelRegistryEntry;
  return { anchor, isMulti, name, parentName, width } as PanelEntry;
}

const initialState: PanelStore = {
  openPanels: [],
  panelEntryMap: {},
  future: [],
  history: [],
  canGoBack: false,
  canGoForward: false
};

function _openPanel(state: PanelStore, request: PanelRequest) {
  const { name, overrides = {} } = request;
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return;
  
  const id = panelRegistryEntry.isMulti ? nanoid() : name;
  
  if (!state.openPanels.includes(id)) {
    // add current state
    state.history.push(currentState(state));
    state.openPanels.push(id);
    const panelEntry = state.panelEntryMap[id] ?? {};
    state.panelEntryMap[id] = {
      ...extractPanelEntry(id),
      ...panelEntry,
      ...overrides,
      id
    };
    state.future = [];
    state.canGoForward = false;
    state.canGoBack = true;
  }
}

function _closePanel(state: PanelStore, request: PanelRequest) {
  const { id, name } = request;
  const panelId = id ?? name;
  // add current state
  state.history.push(currentState(state));
  state.openPanels = state.openPanels.filter((p) => p !== panelId);
  delete state.panelEntryMap[panelId];
  state.future = [];
  state.canGoBack = true;
  state.canGoForward = false;
}

function currentState({ openPanels, panelEntryMap }: PanelStoreState) {
  return { openPanels: [ ...openPanels ], panelEntryMap: { ...panelEntryMap } };
}

const panelSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    openPanel: (state, action: PayloadAction<PanelRequest>) => _openPanel(state, action.payload),
    closePanel: (state, action: PayloadAction<PanelRequest>) => _closePanel(state, action.payload),
    togglePanel: (state, action: PayloadAction<PanelRequest>) => {
      const { name } = action.payload;
      const panelEntry = extractPanelEntry(name);
      if (panelEntry.isMulti) {
        _openPanel(state, action.payload);
      }
      else {
        if (state.openPanels.includes(name)) {
          _closePanel(state, action.payload);
        } else {
          _openPanel(state, action.payload);
        }
      }
    },
    updatePanel: (state, action: PayloadAction<PanelRequest>) => {
      const { id, name, overrides = {} } = action.payload;
      const panelId = id ?? name;
      const entry = state.panelEntryMap[panelId];
      if (entry) {
        state.history.push(currentState(state));
        state.future = [];
        state.panelEntryMap[panelId] = { ...entry, ...overrides };
      }
    },
    resetPanels: () => initialState,
    goBack: (state) => {
      if (state.history.length > 1) {
        const current = state.history.pop();
        if (current) {
          state.future.unshift(current);
        }
      }
      state.canGoBack = state.history.length > 1;
      state.canGoBack = state.future.length > 1;
    },
    goForward: (state) => {
      const next = state.future.shift();
      if (next) {
        state.history.push(next);
      }
      state.canGoBack = state.history.length > 1;
      state.canGoBack = state.future.length > 1;
    },
  },
});

export const {
  openPanel,
  closePanel,
  togglePanel,
  updatePanel,
  resetPanels,
  goBack,
  goForward,
} = panelSlice.actions;

export const selectOpenPanels = (state: PanelStore) => state.openPanels;
export const selectPanelEntryMap = (state: PanelStore) => state.panelEntryMap;
export const selectCanGoBack = (state: PanelStore) => state.canGoBack;
export const selectCanGoForward = (state: PanelStore) => state.canGoForward;

export default panelSlice.reducer;