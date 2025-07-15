import { createTheme } from '@mui/material/styles';
import { colors } from './colors';

const theme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    ...colors()[mode],
  },
  spacing: 8, // 1 spacing unit = 8px
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
    },
  },
});

export default theme;