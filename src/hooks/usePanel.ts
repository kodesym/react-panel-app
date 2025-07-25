// src/hooks/usePanel.ts
import { useMemo } from 'react';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';
import { usePanelStore } from './usePanelStore';
import type { PanelEntry } from '@/types/panels';

  export const usePanel = (id?: string) => {

    if (!id) {
      const { panelId } = usePanelInstance();
      if (!panelId) {
        throw new Error('No Panel ID provided. Use within a PanelInstanceProvider.');
      }
      id = panelId;
    }

    const {
      openPanels,
      panelEntryMap,
      openPanel,
      closePanel,
      togglePanel,
      updatePanel,
    } = usePanelStore();

    const isOpenPanel = openPanels.includes(id);
    const panelEntry = panelEntryMap[id] ?? {};

    return useMemo(
      () => ({
        id,
        isOpenPanel,
        openPanel: (overrides = {}) => openPanel(id, overrides),
        closePanel: () => closePanel(id),
        togglePanel: () => togglePanel(id),
        updatePanel: (updates: Partial<PanelEntry>) => updatePanel(id, updates),
        panelEntry,
        openPanels,
        panelEntryMap,
      }),
      [id, isOpenPanel, openPanels, panelEntry, openPanel, closePanel, togglePanel, updatePanel, panelEntryMap]
    );
  };
