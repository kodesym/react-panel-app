import type { PanelStateConfig } from '@/types/panels'
import { AppPanels } from '..';

export const searchState : PanelStateConfig = {
  [AppPanels.search]: {
    fields: {},
    actions: {}
  },
  [AppPanels.searchResults]: {
    fields: {},
    actions: {}
  },
};