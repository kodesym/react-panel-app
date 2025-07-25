import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from '@contexts/ThemeContext';
import theme from '@styles/theme';
import App from './App';

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const muiTheme = useMemo(() => theme(mode), [mode]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </React.StrictMode>
);