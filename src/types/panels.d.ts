import type { MaybeFunction } from "./common";

export type Anchor = 'top' | 'bottom' | 'left' | 'right';

export type MenuPosition = 'start' | 'middle' | 'end';

export interface PanelRequest {
  id?: string;
  name: string;
  overrides?: Partial<PanelEntry>;
}

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

export interface PanelStoreStateNav {
  history: PanelStoreState[],
  future: PanelStoreState[],
  canGoBack: boolean,
  canGoForward: boolean,
}

export interface PanelStore extends PanelStoreState, PanelStoreStateNav {

}

// export interface PanelNavManager {
//   canGoBack: boolean;
//   canGoForward: boolean;
//   goBack: () => PanelStoreState | null;
//   goForward: () => PanelStoreState | null;
// }

// export interface PanelStore extends PanelStoreState, PanelStoreStateNav, PanelNavManager {
//   openPanel: (name: string, overrides?: Partial<PanelEntry>) => void;
//   closePanel: (id: string) => void;
//   togglePanel: (name: string) => void;
//   updatePanel: (id: string, updates: Partial<PanelEntry>) => void;
//   reset: () => void;
// }

export interface PanelSectionProps {
  id: string;
  children?: React.ReactNode;
  className?: string;
  sx?: React.CSSProperties;
}