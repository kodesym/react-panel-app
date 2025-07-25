import type { PanelRegistry } from '@/types/panels';
import { Box, Typography } from '@mui/material';
import { AppPanels } from '..';

const name = AppPanels.settings; // Unique ID for this panel`

export const settingsPanels : PanelRegistry = {
  [name]: {
    name,
    anchor: 'right',
    width: 400,
    label: 'Settings',
    icon: <Typography variant="h6">⚙️</Typography>,
    menuAnchor: 'right',
    menuPosition: 'end',
    children: <Box p={2} sx={{backgroundColor: 'background.default', height: '100%'}}><Typography variant="h6">Settings</Typography></Box>,
  },
};