import { configureStore } from '@reduxjs/toolkit';
import panelReducers from '@features/panels/panelSlice';

const store = configureStore({
  reducer: {
    panels: panelReducers,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;