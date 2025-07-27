
import { useState } from 'react';
import { PanelSectionLayout } from '@/components/layout/PanelSectionLayout';
import { SearchResultContent } from './views/SearchResultContent';
import { usePanel } from '@/hooks/usePanel';
import { PanelNavHeader } from '../common/PanelNavHeader';

const SearchResultPanel = () => {
  const { id } = usePanel();
  const [filters] = useState({
    status: 'active',
    keyword: '',
  });

  return (
    <PanelSectionLayout
      id={id}
      headerNav={<PanelNavHeader />}
      content={<SearchResultContent filters={filters} />}
    />
  );
};

export default SearchResultPanel;