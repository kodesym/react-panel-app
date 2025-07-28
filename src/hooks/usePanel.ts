// src/hooks/usePanel.ts
import { useMemo } from 'react';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';
import type { PanelEntry } from '@/types/panels';
import { useDispatch, useSelector } from 'react-redux';
import { 
  openPanel,
  closePanel,
  togglePanel,
  updatePanel,
  resetPanels,
  goBack,
  goForward,
  selectOpenPanels,
  selectPanelEntryMap,
  selectCanGoBack,
  selectCanGoForward,
} from '@features/panels/panelSlice';
import { defaultPanelEntry } from '@/utils/panelUtils';

  export const usePanel = (id?: string) => {
    const dispatch = useDispatch();
    if (!id) {
      const { panelId } = usePanelInstance();
      if (!panelId) {
        throw new Error('No Panel ID provided. Use within a PanelInstanceProvider.');
      }
      id = panelId;
    }

    const openPanels = useSelector(selectOpenPanels);
    const panelEntryMap = useSelector(selectPanelEntryMap);
    const canGoBack = useSelector(selectCanGoBack);
    const canGoForward = useSelector(selectCanGoForward);
    const isOpenPanel = openPanels.includes(id);
    const panelEntry = panelEntryMap[id] ?? defaultPanelEntry(id);
    const { name } = panelEntry;
    const request = { id, name };

    return useMemo(
      () => ({
        id,
        name,
        isOpenPanel,
        openPanel: (overrides = {}) => dispatch(openPanel({ ...request, overrides})),
        closePanel: () => dispatch(closePanel(request)),
        togglePanel: () => dispatch(togglePanel(request)),
        updatePanel: (overrides: Partial<PanelEntry> = {}) => dispatch(updatePanel({ ...request, overrides })),
        resetPanels: () => dispatch((resetPanels())),
        goBack: () => dispatch(goBack()),
        goForward: () => dispatch(goForward()),
        panelEntry,
        openPanels,
        panelEntryMap,
        canGoBack,
        canGoForward,
      }),
      [id, name, isOpenPanel, openPanels, panelEntry, openPanel, closePanel, togglePanel, updatePanel, panelEntryMap]
    );
  };
