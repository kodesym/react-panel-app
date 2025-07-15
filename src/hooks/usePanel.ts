// src/hooks/usePanel.ts
import { useMemo } from 'react';
import { usePanelContext } from '@/contexts/PanelContext';
import type { PanelMemory } from '@/types/panels';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';

export const usePanel = (id?: string) => {

  const { panelId } = usePanelInstance();
  if (!id && !panelId) {
    throw new Error('No Panel ID provided. Use within a PanelInstanceProvider.');
  }

  id = id ?? panelId;

  const {
    openPanels,
    panelMemoryMap,
    openPanel,
    closePanel,
    togglePanel,
    updatePanel,
    setOpenPanels,
  } = usePanelContext();

  const isOpenPanel = openPanels.includes(id);
  const panelMemory = panelMemoryMap[id] ?? {};

  return useMemo(
    () => ({
      id,
      isOpenPanel,
      openPanel: (overrides = {}) => openPanel(id, overrides),
      closePanel: () => closePanel(id),
      togglePanel: () => togglePanel(id),
      updatePanel: (updates: Partial<PanelMemory>) => updatePanel(id, updates),
      panelMemory
    }),
    [id, isOpenPanel, panelMemory, openPanel, closePanel, togglePanel, updatePanel, setOpenPanels]
  );
};
