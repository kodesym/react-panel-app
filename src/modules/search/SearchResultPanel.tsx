
import { useState } from 'react';
import { PanelSectionLayout } from '@/components/layout/PanelSectionLayout';
import { SearchResultContent } from './views/SearchResultContent';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';

const SearchResultPanel = () => {
  const { panelId } = usePanelInstance();
  const [filters] = useState({
    status: 'active',
    keyword: '',
  });

  return (
    <PanelSectionLayout
      id={panelId} // Unique ID for this panel
      content={<SearchResultContent filters={filters} />}
    />
  );
};

export default SearchResultPanel;