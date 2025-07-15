import type { PanelMenuItem } from '@/types/panels';
import { Tooltip, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { memo } from 'react';

const SidebarMenuItem = memo(({ id, label, icon, onClick }: PanelMenuItem) => (
  <Tooltip title={label} placement="right">
    <ListItem disablePadding>
      <ListItemButton
        sx={{ justifyContent: 'center', minHeight: 48 }}
        onClick={() => onClick?.()}
      >
        <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  </Tooltip>
));

export default SidebarMenuItem;