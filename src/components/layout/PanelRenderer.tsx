import { useEffect, useState } from 'react';
import { usePanelContext } from '@contexts/PanelContext';
import PanelShell from '@components/panels/PanelShell';
import { AnimatePresence } from 'framer-motion';

const PanelRenderer = () => {
  const { openPanels, panelRegistry, panelMemoryMap } = usePanelContext();
  // Maintain a set of mounted panels to avoid unmounting/remounting
  const [mountedPanels, setMountedPanels] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMountedPanels((prev) => new Set([...prev, ...openPanels]));
  }, [openPanels]);

  const getNestingLevel = (
    id: string,
    openPanels: string[]
  ): number => {
    const index = openPanels.indexOf(id);
    if (index === -1) return 0; // fallback
    return index + 1
  };

  return (
    <AnimatePresence mode="popLayout">
      {Array.from(mountedPanels).map((id) => {
        const { children } = panelRegistry[id];
        if (!children) return null;
        const panelMemory = panelMemoryMap[id] ?? {};
        return <PanelShell key={id} {...panelMemory} children={children} nestingLevel={getNestingLevel(id, openPanels)} />;
      })}
    </ AnimatePresence>
  );
};

export default PanelRenderer;