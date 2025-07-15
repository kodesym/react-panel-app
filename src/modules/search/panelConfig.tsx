import type { PanelAnchor, PanelRegistry } from '@/types/panels';
import SearchIcon from '@mui/icons-material/Search';
import { LazyPanel } from '@/components/panels/LazyPanel';
import { AppPanels } from '../common';

export const searchPanels : PanelRegistry = {
  [AppPanels.search]: {
    id: AppPanels.search,
    anchor: 'left' as PanelAnchor,
    width: 400,
    label: 'Search',
    icon: <SearchIcon />,
    menuPosition: 'center',
    children: <LazyPanel loader={() => import('@/modules/search/SearchPanel')} />
  },
  [AppPanels.searchResults]: {
    id: AppPanels.searchResults,
    anchor: 'left' as PanelAnchor,
    width: 400,
    parentId: AppPanels.search, // indicates this is a nested panel
    children: <LazyPanel loader={() => import('@/modules/search/SearchResultPanel')} />,
  },
};