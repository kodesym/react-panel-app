export type PanelAnchor = 'left' | 'right' | 'top' | 'bottom';

export type VerticalPosition = 'top' | 'center' | 'bottom';

export interface PanelState {
  id: string;
  anchor: PanelAnchor;
  parentId?: string; // optional parent panel ID for nested panels
  width: number;
}

export interface PanelMenuItem {
  id: string;
  label?: string;
  icon?: React.ReactNode;
  menuPosition?: VerticalPosition; // position for menu item
  onClick?: () => void;
  isDisabled?: boolean; // for disabling menu item
  isHidden?: boolean; // for conditional rendering
}

export interface PanelMemory extends PanelState {
  props?: Record<string, any>;
}

export interface PanelRegistryEntry extends PanelState, PanelMenuItem {
  children?: ReactNode;
}

export type PanelMemoryMap = Record<string, PanelMemory>;
export type PanelRegistry = Record<string, PanelRegistryEntry>;

export interface PanelStoreOptions {
  onChange?: (state: PanelStoreState) => void;
}

export interface PanelStoreState {
  openPanels: string[];
  panelMemoryMap: PanelMemoryMap;
  panelRegistry: PanelRegistry;
}

export type PanelHistoryEntry = {
  openPanels: string[];
  panelMemoryMap: PanelMemoryMap;
};

export interface PanelHistoryManagement {
  // History management
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => PanelHistoryEntry | null;
  goForward: () => PanelHistoryEntry | null;
  pushHistory?: () => PanelHistoryEntry | null;
  getBreadcrumbs: () => PanelMemory[];
}

export interface PanelStore extends PanelStoreState, PanelHistoryManagement {
  openPanel: (id: string, overrides?: Partial<PanelMemory>) => void;
  closePanel: (id: string) => void;
  togglePanel: (id: string) => void;
  updatePanel: (id: string, updates: Partial<PanelMemory>) => void;
  setOpenPanels: (ids: string[]) => void;
  setPanelMemoryMap?: (newMemoryMap: PanelMemoryMap) => void;
  reset: () => void;
}

export interface PanelSectionProps {
  id: string;
  className?: string;
  sx?: React.CSSProperties;
  children?: React.ReactNode;
}