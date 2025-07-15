import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { PanelMemoryMap, PanelStore } from '@/types/panels';
import { createPanelStore } from '@/store/panelStore';

// ----------- Context ------------

const PanelContext = createContext<PanelStore | undefined>(undefined);

// ----------- Provider ------------

export const PanelProvider = ({ children }: { children: ReactNode }) => {
  const [openPanels, setOpenPanels] = useState<string[]>([]);
  const [panelMemoryMap, setPanelMemoryMap] = useState<PanelMemoryMap>({});
  
  const store = useMemo(() =>
    createPanelStore({
      onChange: (state) => {
        console.log('🧠 Panel Store onChange', state);
        setOpenPanels(state.openPanels);
        setPanelMemoryMap(state.panelMemoryMap);
      },
    }), []
  );
  if (!store) {
    throw new Error('PanelProvider must be used with a valid PanelStore');
  } 
  const contextValue: PanelStore = useMemo(() => ({...store}), [openPanels, panelMemoryMap]);
  return (
    <PanelContext.Provider value={contextValue}>
      {children}
    </PanelContext.Provider>
  );
};

// ----------- Hook ------------

export const usePanelContext = (): PanelStore => {
  const ctx = useContext(PanelContext);
  if (!ctx) throw new Error('usePanelContext must be used within PanelProvider');
  return ctx;
};