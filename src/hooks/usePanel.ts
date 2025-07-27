// src/hooks/usePanel.ts
import { useMemo } from 'react';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';
import type { PanelEntry } from '@/types/panels';
import { useSelector } from 'react-redux';
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

  export const usePanel = (id?: string) => {
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
    const panelEntry = panelEntryMap[id] ?? {};
    const request = { id, name: panelEntry.name };

    return useMemo(
      () => ({
        id,
        name: panelEntry.name,
        isOpenPanel,
        openPanel: (overrides = {}) => openPanel({ ...request, overrides}),
        closePanel: () => closePanel(request),
        togglePanel: () => togglePanel(request),
        updatePanel: (overrides: Partial<PanelEntry> = {}) => updatePanel({ ...request, overrides }),
        resetPanels: () => resetPanels(),
        goBack: () => goBack(),
        goForward: () => goForward(),
        panelEntry,
        openPanels,
        panelEntryMap,
        canGoBack,
        canGoForward,
      }),
      [id, name, isOpenPanel, openPanels, panelEntry, openPanel, closePanel, togglePanel, updatePanel, panelEntryMap]
    );
  };
