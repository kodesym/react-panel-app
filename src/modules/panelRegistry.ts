import { searchPanels } from '@/modules/search/panelConfig';
import { settingsPanels } from '@/modules/settings/panelConfig';
import type { PanelRegistry } from '@/types/panels';

export const panelRegistry: PanelRegistry = {
  ...searchPanels,
  ...settingsPanels,
};