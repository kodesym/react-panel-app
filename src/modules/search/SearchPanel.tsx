
import { useState } from 'react';
import { PanelSectionLayout } from '@/components/layout/PanelSectionLayout';
import { SearchHeader } from './views/SearchHeader';
import { SearchContent } from './views/SearchContent';
import { SearchFooter } from './views/SearchFooter';
import { usePanelInstance } from '@/contexts/PanelInstanceContext';

const SearchPanel = () => {
  const { panelId } = usePanelInstance();
  const [filters, setFilters] = useState({
    status: 'active',
    keyword: '',
  });

  return (
    <PanelSectionLayout
      id={panelId} // Unique ID for this panel
      header={<SearchHeader filters={filters} setFilters={setFilters} />}
      content={<SearchContent filters={filters} />}
      footer={<SearchFooter />}
    />
  );
};

export default SearchPanel;