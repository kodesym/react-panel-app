import React, { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';

interface LazyPanelProps {
  loader: () => Promise<{ default: React.ComponentType }>;
}

const cache = new WeakMap<() => Promise<any>, React.LazyExoticComponent<any>>();

export const LazyPanel = ({ loader }: LazyPanelProps) => {
  let Lazy = cache.get(loader);
  if (!Lazy) {
    Lazy = React.lazy(loader);
    cache.set(loader, Lazy);
  }
  return (
    <Suspense fallback={<Box sx={{p:4}}>Loading...</Box>}>
      <Lazy />
    </Suspense>
  );
};