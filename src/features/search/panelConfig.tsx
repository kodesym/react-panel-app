import type { PanelRegistry } from '@/types/panels';
import SearchIcon from '@mui/icons-material/Search';
import { LazyPanel } from '@/components/panels/LazyPanel';
import { AppPanels } from '..';

export const searchPanels : PanelRegistry = {
  [AppPanels.search]: {
    name: AppPanels.search,
    anchor: 'left',
    width: 400,
    label: 'Search',
    icon: <SearchIcon />,
    menuAnchor: 'left',
    menuPosition: 'middle',
    children: <LazyPanel loader={() => import('@features/search/SearchPanel')} />,
  },
  [AppPanels.searchResults]: {
    name: AppPanels.searchResults,
    anchor: 'left',
    width: 400,
    parentName: AppPanels.search, // indicates this is a nested panel
    children: <LazyPanel loader={() => import('@features/search/SearchResultPanel')} />,
  },
};