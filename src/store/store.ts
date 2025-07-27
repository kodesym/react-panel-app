import { configureStore } from '@reduxjs/toolkit';
import panelReducers from '@features/panels/panelSlice';

export const store = configureStore({
  reducer: {
    panels: panelReducers,
  },
});