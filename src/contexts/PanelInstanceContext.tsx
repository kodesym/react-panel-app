import { createContext, useContext } from 'react';

const PanelInstanceContext = createContext<{ panelId: string } | null>(null);

export const usePanelInstance = () => {
  const ctx = useContext(PanelInstanceContext);
  if (!ctx) throw new Error('Must be used within a PanelInstanceProvider');
  return ctx;
};

export const PanelInstanceProvider = PanelInstanceContext.Provider;