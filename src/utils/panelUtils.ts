import { panelRegistry } from "@/features/panelRegistry";
import type { Anchor, PanelEntry } from "@/types/panels";

export const SidebarWidth = 50;

export function isLeftRight(anchor: Anchor) {
  return ['left', 'right'].includes(anchor);
}

export function oppositeSide(anchor: Anchor) {
  switch (anchor) {
    case 'right': return 'left';
    case 'top': return 'bottom';
    case 'bottom': return 'top';
    default: return 'right';
  }
}

export function defaultPanelEntry(name: string): PanelEntry {
  const panelRegistryEntry = panelRegistry[name];
  if (!panelRegistryEntry) return {} as PanelEntry;
  const { anchor, isMulti, parentName, width } = panelRegistryEntry;
  return { anchor, isMulti, name, parentName, width } as PanelEntry;
}