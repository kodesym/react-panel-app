import { searchPanels } from '@/panels/search/panelConfig';
import { searchResultPanels } from '@/panels/searchResults/panelConfig';
import { settingsPanels } from '@/panels/settings/panelConfig';
import type { PanelRegistry } from '@/types/panels';

export const panelRegistry: PanelRegistry = {
  ...searchPanels,
  ...searchResultPanels,
  ...settingsPanels,
};