import { panelRegistry } from "@/modules/panelRegistry";
import type { Anchor } from "@/types/panels";

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

export function uniquePanelList() {
  return new Set(...Object.values(panelRegistry).map(p => p.name));
}