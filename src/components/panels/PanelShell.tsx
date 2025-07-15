import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { PanelMemoryMap, PanelState } from '@/types/panels';
import ResizeHandle from './ResizeHandle';
import { usePanelContext } from '@/contexts/PanelContext';
import { PanelInstanceProvider } from '@/contexts/PanelInstanceContext';
import { styled, useTheme } from '@mui/material/styles';

const Root = styled(motion.div, { name: 'PanelShell' })({});

interface PanelShellProps extends PanelState {
  children: React.ReactNode;
  nestingLevel?: number;
}

function getPanelOffset(id: string, openPanels: string[], panelMemory: PanelMemoryMap): number {
  let offset = 0;
  let currentId = panelMemory[id]?.parentId;

  while (currentId) {
    if (!openPanels.includes(currentId)) {
      break; // Stop if the parent panel is not open
    }
    offset += panelMemory[currentId].width;
    currentId = panelMemory[currentId].parentId;
  }

  return offset;
}

const PanelShell = ({
  id,
  anchor = 'left',
  width,
  children,
  nestingLevel = 0,
}: PanelShellProps) => {

  const [exiting, setExiting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { panelMemoryMap, openPanels } = usePanelContext();
  const isOpen = openPanels.includes(id);
  const { palette } = useTheme();
  
  const isLeft = anchor === 'left';
  // Get all panels on this anchor
  const panelsOnSide = openPanels.filter((pid) => (panelMemoryMap[pid]?.anchor ?? 'left') === anchor);
  // Is the panel furthest from the sidebar
  const isEdgePanel = panelsOnSide.at(-1) === id;
  // Offset for the current panel
  const offset = getPanelOffset(id, openPanels, panelMemoryMap);

  const zIndex = 1300 + (exiting ? 10 : nestingLevel); // Base zIndex for panels, incremented by nesting level
  // The direction from which the panel should slide
  const slideFrom = isLeft ? -width : width;

  const boxShadow = isEdgePanel
  ? isLeft
    ? '4px 0 12px rgba(0,0,0,0.2)'  // shadow to right
    : '-4px 0 12px rgba(0,0,0,0.2)' // shadow to left
  : 'none';
  const borderProp = isLeft ? 'borderRight' : 'borderLeft';

  return <PanelInstanceProvider value={{ panelId: id }}>
    <Root
      data-panel-id={id}
      key={id}
      ref={panelRef}
      initial={{ x: slideFrom }}
      animate={{ x: isOpen ? 0 : slideFrom,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? 'visible' : 'hidden', }}
      exit={{ x: slideFrom }}
      transition={{ type: 'tween', duration: 0.2 }}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [anchor]: offset,
        width,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: palette.background.default,
        boxShadow: boxShadow,
        zIndex,
        overflow: 'hidden',
        pointerEvents: exiting ? 'none' : 'auto',
        [borderProp]: isEdgePanel ? 'unset' : '1px solid rgba(0, 0, 0, 0.1)',
      }}
      onAnimationStart={() => setExiting(true)}
      onAnimationComplete={() => setExiting(false)}
    >
      {children}

      <ResizeHandle
        isLeft={isLeft}
        panelId={id}
        parentRef={panelRef as React.RefObject<HTMLElement>}
      />
    </Root>
  </PanelInstanceProvider>
};

export default PanelShell;