import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface SearchFilters {
  keyword: string;
  categories: string[];
}

interface SearchContextValue {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
}

// ----------- Context ------------
export const SearchContext = createContext<SearchContextValue | undefined>(undefined);

// ----------- Provider ------------
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    categories: [],
  });

  return (
    <SearchContext.Provider value={{ filters, setFilters }}>
      {children}
    </SearchContext.Provider>
  );
};

// ----------- Hook ------------
export const useSearchContext = () => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearchContext must be used within SearchProvider');
  return ctx;
};