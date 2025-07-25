import React from 'react';
import {
  Box,
  List,
  styled,
  type BoxProps
} from '@mui/material';
import { panelRegistry } from '@/modules/panelRegistry';
import { isLeftRight, oppositeSide, SidebarWidth } from '@/utils/panelUtils';
import SidebarMenuItem from './SidebarMenuItem';
import type { Anchor, PanelMenuItem, PanelRegistryEntry } from '@/types/panels';
import { usePanelStore } from '@/hooks/usePanelStore';
import { capitalizeFirstLetter, resolveValue } from '@/utils/common';

interface SidebarProps extends BoxProps {
  anchor: Anchor;
}

function isMenuEnd(anchor: Anchor) {
  return ['bottom', 'right'].includes(anchor);
}

const Root = styled(Box, { 
  name: 'Sidebar', 
  shouldForwardProp: (prop: string) => !['anchor'].includes(prop) 
})<SidebarProps>(({ theme, anchor }) => ({
  width: isLeftRight(anchor) ? `${SidebarWidth}px` : '100dvw',
  height: isLeftRight(anchor) ? '100dvh' : `${SidebarWidth}px`,
  position: 'fixed',
  backgroundColor: theme.palette.background.paper,
  [`border${capitalizeFirstLetter(oppositeSide(anchor))}`]: '1px solid #ddd',
  zIndex: 2500,
  display: 'flex',
  flexDirection: isLeftRight(anchor) ? 'column' : 'row',
  [anchor]: 0,
}));

const createMenus = (slot: string) => 
  styled('div', {
    name: 'Sidebar', 
    slot, 
    shouldForwardProp: (prop: string) => !['anchor'].includes(prop) 
  })<SidebarProps>(({ theme, anchor }) => ({
    flexBasis: slot === 'middle' ? '50%' : '25%', 
    display: 'flex', 
    flexDirection: isLeftRight(anchor) ? 'column' : 'row', 
    justifyContent: isMenuEnd(anchor) ? 'flex-end' : 'flex-start',
    overflow: 'auto'
}));

function getMenuProps(entry: PanelRegistryEntry): PanelMenuItem {
  const { name, icon, label, menuPosition, onClick, isHidden, isDisabled } = entry;
  return { name, icon, label, menuPosition, onClick, isHidden, isDisabled };
}

const Sidebar: React.FC<SidebarProps> = ({ anchor }) => {
  const { togglePanel } = usePanelStore();

  const menuItems = Object.values(panelRegistry).filter(p => !p.parentName && !resolveValue(p.isHidden) && p.menuAnchor === anchor); 

  return (
    <Root anchor={anchor}>

      {['start', 'middle', 'end'].map((position) => {
        const Menus = createMenus(position);
        return <Menus key={position} anchor={anchor}>
          <List disablePadding>
            {menuItems.filter((item) => item.menuPosition === position).map((panel) => (
              <SidebarMenuItem key={panel.name} {...getMenuProps(panel)} onClick={getMenuProps(panel).onClick ?? (() => togglePanel(panel.name))} />
            ))}
          </List>
        </Menus>
      })}

    </Root>
  );
};

export default Sidebar;