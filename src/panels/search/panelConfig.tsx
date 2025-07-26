import type { PanelRegistry } from '@/types/panels';
import SearchIcon from '@mui/icons-material/Search';
import { LazyPanel } from '@/components/panels/LazyPanel';
import { AppPanels } from '..';

const name = AppPanels.search;

export const searchPanels : PanelRegistry = {
  [name]: {
    name,
    anchor: 'left',
    width: 400,
    label: 'Search',
    icon: <SearchIcon />,
    menuAnchor: 'left',
    menuPosition: 'middle',
    children: <LazyPanel loader={() => import('@/panels/search/SearchPanel')} />,
  }
};