import { searchState } from '@/modules/search/panelStateConfig';
import type { PanelStateConfig } from '@/types/panels';
import { settingState } from './settings/panelStateConfig';

export const panelStateConfig: PanelStateConfig = {
  ...searchState,
  ...settingState
};