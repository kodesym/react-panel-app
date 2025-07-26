import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import '@utils/globalLogger';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from '@contexts/ThemeContext';
import theme from '@styles/theme';
import App from './App';
import { GlobalKeyboardListener } from './components/GlobalKeyboardListener';

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const muiTheme = useMemo(() => theme(mode), [mode]);
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalKeyboardListener />
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