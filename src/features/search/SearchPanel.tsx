
import { useState } from 'react';
import { PanelSectionLayout } from '@/components/layout/PanelSectionLayout';
import { SearchHeader } from './views/SearchHeader';
import { SearchContent } from './views/SearchContent';
import { SearchFooter } from './views/SearchFooter';
import { usePanel } from '@/hooks/usePanel';
import { PanelNavHeader } from '../common/PanelNavHeader';

const SearchPanel = () => {
  const { id } = usePanel();
  const [filters, setFilters] = useState({
    status: 'active',
    keyword: '',
  });

  return (
    <PanelSectionLayout
      id={id}
      headerNav={<PanelNavHeader />}
      header={<SearchHeader filters={filters} setFilters={setFilters} />}
      content={<SearchContent filters={filters} />}
      footer={<SearchFooter />}
    />
  );
};

export default SearchPanel;