import type { RootState } from "@store/store";
import type { PanelEntry, PanelRequest, PanelStoreState, PanelStore } from "@/types/panels";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { panelRegistry } from "../panelRegistry";
import { nanoid } from "nanoid";
import { defaultPanelEntry } from "@utils/panelUtils";

const initialState: PanelStore = {
  openPanels: [],
  panelEntryMap: {},
  future: [],
  history: [],
  canGoBack: false,
  canGoForward: false
};

function _panelId(request: PanelRequest) {
  const { id, name } = request;
  return id ?? name;
}

function _currentState({ openPanels, panelEntryMap }: PanelStoreState) {
  return { openPanels: [ ...openPanels ], panelEntryMap: { ...panelEntryMap } };
}

function _updatePanelEntryMap(state: PanelStore, id: string, updates: Partial<PanelEntry>) {
  state.panelEntryMap[id] = {
    ...defaultPanelEntry(id),
    ...state.panelEntryMap[id] ?? {},
    ...updates ?? {}
  };
}

function _openPanel(state: PanelStore, request: PanelRequest) {
  const { name, overrides = {} } = request;
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return;
  
  const id = panelRegistryEntry.isMulti ? nanoid() : name;
  
  if (!state.openPanels.includes(id)) {
    _addHistory(state);
    state.openPanels.push(id);
    _updatePanelEntryMap(state, id, overrides);
  }
}

function _closePanel(state: PanelStore, request: PanelRequest) {
  const panelId = _panelId(request);
  _addHistory(state);
  state.openPanels = state.openPanels.filter((p) => p !== panelId);
  delete state.panelEntryMap[panelId];
}

function _addHistory(state: PanelStore) {
  state.history.push(_currentState(state));
  state.future = [];
  state.canGoBack = true;
  state.canGoForward = false;
}

const panelSlice = createSlice({
  name: 'panels',
  initialState,
  reducers: {
    openPanel: (state, action: PayloadAction<PanelRequest>) => _openPanel(state, action.payload),
    closePanel: (state, action: PayloadAction<PanelRequest>) => _closePanel(state, action.payload),
    togglePanel: (state, action: PayloadAction<PanelRequest>) => {
      const { name } = action.payload;
      const panelEntry = defaultPanelEntry(name);
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
      const { overrides = {}} = action.payload;
      const panelId = _panelId(action.payload);
      _updatePanelEntryMap(state, panelId, overrides);
    },
    resetPanels: () => initialState,
    goBack: (state) => {
      if (state.history.length > 1) {
        const current = state.history.pop();
        if (current) {
          state.openPanels = current.openPanels;
          state.panelEntryMap = current.panelEntryMap;
          state.future.unshift(current);
        }
      }
      state.canGoBack = state.history.length > 1;
      state.canGoForward = state.future.length > 1;
    },
    goForward: (state) => {
      const next = state.future.shift();
      if (next) {
        state.openPanels = next.openPanels;
        state.panelEntryMap = next.panelEntryMap;
        state.history.push(next);
      }
      state.canGoBack = state.history.length > 1;
      state.canGoForward = state.future.length > 1;
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

export const selectOpenPanels = (state: RootState) => state.panels.openPanels;
export const selectPanelEntryMap = (state: RootState) => state.panels.panelEntryMap;
export const selectCanGoBack = (state: RootState) => state.panels.canGoBack;
export const selectCanGoForward = (state: RootState) => state.panels.canGoForward;

export default panelSlice.reducer;