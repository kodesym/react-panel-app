import type { GetterFn, MaybeFunction, SetterFn } from "./common";
import type { AnyAtom, AtomScopedStore } from './atom';

export type Anchor = 'top' | 'bottom' | 'left' | 'right';

export type MenuPosition = 'start' | 'middle' | 'end';

export interface PanelModel {
  name: string;
  anchor: Anchor;
  parentName?: string; // optional parent panel name for nested panels
  width: number;
  isMulti?: boolean; // multi instance panel
}

export interface PanelMenuItem {
  name: string;
  label?: string;
  icon?: React.ReactNode;
  menuAnchor?: Anchor;
  menuPosition?: MenuPosition; // position for menu item
  onClick?: () => void;
  isDisabled?: MaybeFunction<boolean>; // for disabling menu item
  isHidden?: MaybeFunction<boolean>; // for conditional rendering
}

export interface PanelEntry extends PanelModel {
  id: string;
  name: string;
  parentId?: string;
  props?: Record<string, any>;
  store?: ViewState;
}

export interface PanelRegistryEntry extends PanelModel, PanelMenuItem {
  children?: ReactNode;
  props?: Record<string, any>;
}

export type PanelEntryMap = Record<string, PanelEntry>;
export type PanelRegistry = Record<string, PanelRegistryEntry>;

export interface PanelStoreState {
  openPanels: string[];
  panelEntryMap: PanelEntryMap;
}

export interface PanelHistoryManager {
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => PanelStoreState | null;
  goForward: () => PanelStoreState | null;
  // getBreadcrumbs: () => PanelEntry[];
}

export interface PanelStore extends PanelStoreState, PanelHistoryManager {
  openPanel: (name: string, overrides?: Partial<PanelEntry>) => void;
  closePanel: (id: string) => void;
  togglePanel: (name: string) => void;
  updatePanel: (id: string, updates: Partial<PanelEntry>) => void;
  setOpenPanels: (names: string[]) => void;
  reset: () => void;
}

export interface PanelSectionProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}

export interface ViewStateConfig {
  fields: Record<string, any>,
  actions?: Record<string, (get: GetterFn, set: SetterFn) => void>,
}

export interface ViewState {
  atoms: Record<string, AnyAtom>,
  store?: AtomScopedStore,
  get: GetterFn,
  set: SetterFn
}

export interface PanelStateConfig {
  [name: string]: ViewStateConfig
}