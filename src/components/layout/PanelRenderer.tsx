import { useEffect, useState } from 'react';
import PanelShell from '@components/panels/PanelShell';
import { AnimatePresence } from 'framer-motion';
import { panelRegistry } from '@features/panelRegistry';
import { useSelector } from 'react-redux';
import { selectOpenPanels, selectPanelEntryMap } from '@features/panels/panelSlice';

const PanelRenderer = () => {
  const openPanels = useSelector(selectOpenPanels);
  const panelEntryMap = useSelector(selectPanelEntryMap);
  // Maintain a set of mounted panels to avoid unmounting/remounting
  const [mountedPanels, setMountedPanels] = useState<Set<string>>(new Set());

  useEffect(() => {
    $log.debug('openPanels', openPanels);
    setMountedPanels((prev) => new Set([...prev, ...openPanels]));
  }, [openPanels]);

  return (
    <AnimatePresence mode="popLayout">
      {Array.from(mountedPanels).map((id) => {
        const panelEntry = panelEntryMap[id];
        if (!panelEntry) return null;
        const { name } = panelEntry;
        const { children } = panelRegistry[name];
        if (!children) return null;
        return <PanelShell key={id} {...panelEntry}>{children}</PanelShell>;
      })}
    </ AnimatePresence>
  );
};

export default PanelRenderer;