import type { PanelStateConfig } from '@/types/panels';
import { searchState } from '@/panels/search/panelStateConfig';
import { searchResultState } from '@/panels/searchResults/panelStateConfig';
import { settingState } from './settings/panelStateConfig';

export const panelStateConfig: PanelStateConfig = {
  ...searchState,
  ...searchResultState,
  ...settingState,
};