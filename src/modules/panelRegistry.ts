// src/modules/panelRegistry.ts
import { searchPanels } from '@/modules/search/panelConfig';
import { settingsPanels } from '@/modules/settings/panelConfig';

export const panelRegistry = {
  ...searchPanels,
  ...settingsPanels,
};