import type { PanelAnchor, PanelRegistry } from '@/types/panels';
import { Box, Typography } from '@mui/material';
import { AppPanels } from '../common';

const id = AppPanels.settings; // Unique ID for this panel`

export const settingsPanels : PanelRegistry = {
  [id]: {
    id,
    anchor: 'right' as PanelAnchor,
    width: 400,
    label: 'Settings',
    icon: <Typography variant="h6">⚙️</Typography>,
    menuPosition: 'bottom',
    children: <Box p={2} sx={{backgroundColor: 'background.default', height: '100%'}}><Typography variant="h6">Settings</Typography></Box>,
  },
};