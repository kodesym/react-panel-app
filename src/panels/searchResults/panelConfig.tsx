import type { PanelRegistry } from '@/types/panels';
import { LazyPanel } from '@/components/panels/LazyPanel';
import { AppPanels } from '..';

const name = AppPanels.searchResults;

export const searchResultPanels : PanelRegistry = {
  [name]: {
    name,
    anchor: 'left',
    width: 400,
    parentName: AppPanels.search, // indicates this is a nested panel
    children: <LazyPanel loader={() => import('@/panels/searchResults/SearchResultPanel')} />,
  },
};