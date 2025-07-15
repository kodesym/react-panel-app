import React from 'react';
import {
  Box,
  List,
  styled,
  type BoxProps
} from '@mui/material';
import { usePanelContext } from '@contexts/PanelContext';
import { panelRegistry } from '@/modules/panelRegistry';
import { SidebarWidth } from '@/utils/panelUtils';
import SidebarMenuItem from './SidebarMenuItem';
import type { PanelAnchor, PanelMenuItem, PanelRegistryEntry } from '@/types/panels';

interface SidebarProps extends BoxProps {
  anchor: PanelAnchor;
}

const Root = styled(Box, { name: 'Sidebar' })<SidebarProps>(({ theme, anchor }) => ({
  width: SidebarWidth,
  height: '100vh',
  position: 'sticky',
  top: 0,
  backgroundColor: theme.palette.background.paper,
  borderRight: '1px solid #ddd',
  zIndex: 1200,
  display: 'flex',
  flexDirection: 'column',
}));

const TopMenus = styled('div', {name: 'Sidebar', slot: 'top' })({
  flexBasis: '25%', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'flex-start', 
  overflowY: 'auto'
}); 

const CenterMenus = styled('div', {name: 'Sidebar', slot: 'center' })({
  flexBasis: '50%', 
  display: 'flex', 
  flexDirection: 'column', 
  justifyContent: 'flex-start', 
  overflowY: 'auto'
}); 

const BottomMenus = styled('div', {name: 'Sidebar', slot: 'bottom' })({
  flexBasis: '25%',
  display: 'flex', 
  flexDirection: 'column-reverse', 
  justifyContent: 'flex-start', 
  overflowY: 'auto'
}); 

function getMenuProps(entry: PanelRegistryEntry): PanelMenuItem {
  const { id, icon, label, menuPosition, onClick, isHidden, isDisabled } = entry;
  return { id, icon, label, menuPosition, onClick, isHidden, isDisabled };
}

const Sidebar: React.FC<SidebarProps> = ({ anchor }) => {
  const { togglePanel } = usePanelContext();

  const menuItems = Object.values(panelRegistry).filter(p => !p.parentId && !p.isHidden && p.anchor === anchor); 

  return (
    <Root anchor={anchor}>
      <TopMenus>
        <List disablePadding>
          {menuItems.filter((item) => item.menuPosition === 'top').map((panel) => (
            <SidebarMenuItem key={panel.id} {...getMenuProps(panel)} onClick={getMenuProps(panel).onClick ?? (() => togglePanel(panel.id))} />
          ))}
        </List>
      </TopMenus>

      <CenterMenus>
        <List disablePadding>
          {menuItems.filter((item) => item.menuPosition === 'center').map((panel) => (
            <SidebarMenuItem key={panel.id} {...getMenuProps(panel)} onClick={getMenuProps(panel).onClick ?? (() => togglePanel(panel.id))} />
          ))}
        </List>
      </CenterMenus>

      <BottomMenus>
        <List disablePadding>
          {menuItems.filter((item) => item.menuPosition === 'bottom').map((panel) => (
            <SidebarMenuItem key={panel.id} {...getMenuProps(panel)} onClick={getMenuProps(panel).onClick ?? (() => togglePanel(panel.id))} />
          ))}
        </List>
      </BottomMenus>

    </Root>
  );
};

export default Sidebar;