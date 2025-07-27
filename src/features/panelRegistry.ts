import React from 'react';
import { searchPanels } from '@features/search/panelConfig';
import { settingsPanels } from '@features/settings/panelConfig';
import type { PanelRegistry } from '@/types/panels';

export function uniquePanelList() {
  return new Set(...Object.values(panelRegistry).map(p => p.name));
}

export const panelRegistry: PanelRegistry = {
  ...searchPanels,
  ...settingsPanels,
};

export const panelRenderMap = Object.fromEntries(Object.entries(panelRegistry).map(([key, importer]) => [key, React.lazy(importer.children)]));