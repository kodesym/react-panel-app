import type { PanelMenuItem } from '@/types/panels';
import { resolveValue } from '@/utils/common';
import { Tooltip, ListItem, ListItemButton, ListItemIcon } from '@mui/material';
import { memo } from 'react';

const SidebarMenuItem = memo(({ isDisabled, icon, label, name, onClick }: PanelMenuItem) => (
  <Tooltip title={label} placement="right">
    <ListItem key={name} disablePadding>
      <ListItemButton
        disabled={resolveValue(isDisabled)}
        sx={{ justifyContent: 'center', minHeight: 48 }}
        onClick={() => onClick?.()}
      >
        <ListItemIcon sx={{ minWidth: 0 }}>{icon}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  </Tooltip>
));

export default SidebarMenuItem;