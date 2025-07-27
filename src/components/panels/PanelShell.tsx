import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Anchor, PanelEntry, PanelEntryMap } from '@/types/panels';
import ResizeHandle from './ResizeHandle';
import { PanelInstanceProvider } from '@/contexts/PanelInstanceContext';
import { styled, useTheme } from '@mui/material/styles';
import { usePanel } from '@/hooks/usePanel';
import { isLeftRight, oppositeSide } from '@/utils/panelUtils';
import { capitalizeFirstLetter } from '@/utils/common';
import { Provider as StoreProvider } from 'jotai';

const Root = styled(motion.div, { name: 'PanelShell' })({});

interface PanelShellProps extends PanelEntry {
  children: React.ReactNode;
  nestingLevel?: number;
}

function getPanelOffset(id: string, name: string, openPanels: string[], panelEntryMap: PanelEntryMap): number {
  let offset = 0;
  let currentPanel = panelEntryMap[id]?.parentName;

  while (currentPanel) {
    if (!openPanels.includes(currentPanel)) {
      break; // Stop if the parent panel is not open
    }
    offset += panelEntryMap[currentPanel].width;
    currentPanel = panelEntryMap[currentPanel].parentName;
  }

  return offset;
}

function getPanelPositions(anchor: Anchor, offset: number) {
  return {
    ...(isLeftRight(anchor) && {
      top: 0,
      bottom: 0,
    }),
    ...(!isLeftRight(anchor) && {
      left: 0,
      right: 0,
    }),
    [anchor]: offset
  };
}


const PanelShell = ({
  id,
  name,
  anchor = 'left',
  width,
  children,
}: PanelShellProps) => {

  if (!id && name) id = name;

  const [exiting, setExiting] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { openPanels, panelEntry, panelEntryMap, isOpenPanel } = usePanel(id);
  const { palette } = useTheme();
  
  // Get all panels on this anchor
  // const panelsOnSide = Object.values(panelEntryMap).filter((p) => p.anchor === anchor).map(m => m.id);
  // Offset for the current panel
  const offset = getPanelOffset(id, name, openPanels, panelEntryMap);
  // The direction from which the panel should slide
  const slideFrom = ['left', 'top'].includes(anchor) ? - width : width;
  // Base zIndex for panels, incremented by nesting level
  const zIndex = 1300 + (exiting ? 10 : 0);
  // get the animation axis
  const axis = isLeftRight(anchor) ? 'x' : 'y';

  return <PanelInstanceProvider value={{ panelId: id }}>
      <Root
        data-panel-id={id}
        data-panel-name={panelEntry.name}
        key={id}
        ref={panelRef}
        initial={{ [axis]: slideFrom }}
        animate={{ [axis]: isOpenPanel ? 0 : slideFrom,
        opacity: isOpenPanel ? 1 : 0,
        visibility: isOpenPanel ? 'visible' : 'hidden', }}
        exit={{ [axis]: slideFrom }}
        transition={{ type: 'tween', duration: 0.2 }}
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: palette.background.default,
          zIndex,
          overflow: 'hidden',
          pointerEvents: exiting ? 'none' : 'auto',
          ...getPanelPositions(anchor, offset),
          ...(isLeftRight(anchor) && {
            width,
          }),
          ...(!isLeftRight(anchor) && {
            height: width,
          }),
          [`border${capitalizeFirstLetter(oppositeSide(anchor))}`]: '1px solid rgba(0, 0, 0, 0.1)',
        }}
        onAnimationStart={() => setExiting(true)}
        onAnimationComplete={() => setExiting(false)}
      >
        {children}

        <ResizeHandle
          anchor={anchor}
          panelId={id}
          parentRef={panelRef as React.RefObject<HTMLElement>}
        />
      </Root>
  </PanelInstanceProvider>
};

export default PanelShell;