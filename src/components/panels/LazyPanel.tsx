import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';

interface LazyPanelProps {
  loader: () => Promise<{ default: React.ComponentType }>;
}

export const LazyPanel = ({ loader }: LazyPanelProps) => {
  const Component = lazy(loader);

  return (
    <Suspense fallback={<Box sx={{p:4}}>Loading...</Box>}>
      <Component />
    </Suspense>
  );
};