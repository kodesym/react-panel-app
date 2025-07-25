import { useEffect, useState } from 'react';
import PanelShell from '@components/panels/PanelShell';
import { AnimatePresence } from 'framer-motion';
import { useAtom } from 'jotai';
import { openPanelsAtom, panelEntryMapAtom } from '@/store/panels/atoms';
import { panelRegistry } from '@/modules/panelRegistry';

const PanelRenderer = () => {
  const [openPanels] = useAtom(openPanelsAtom);
  const [panelEntryMap] = useAtom(panelEntryMapAtom);
  // Maintain a set of mounted panels to avoid unmounting/remounting
  const [mountedPanels, setMountedPanels] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMountedPanels((prev) => new Set([...prev, ...openPanels]));
  }, [openPanels]);

  return (
    <AnimatePresence mode="popLayout">
      {Array.from(mountedPanels).map((id) => {
        const panelEntry = panelEntryMap[id];
        if (!panelEntry) return null;
        const { children } = panelRegistry[panelEntry.name];
        if (!children) return null;
        return <PanelShell key={id} {...panelEntry} children={children} />;
      })}
    </ AnimatePresence>
  );
};

export default PanelRenderer;