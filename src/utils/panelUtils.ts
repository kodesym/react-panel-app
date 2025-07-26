import { panelRegistry } from "@/panels/panelRegistry";
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

export const panelIdSeperator = '.';

export function compositePanelId(id:string, name: string) {
  if (id === name) return id;
  return `${name}${panelIdSeperator}${id}`;
}

export function getPanelIdName(panelId: string) {
  const parts = panelId.split(panelIdSeperator);
  if (parts.length <= 1) return parts;
  if (parts.length > 2) throw new Error(`Invalid panelId: ${panelId}`);
  return { id: parts[1], name: parts[0] };
}

export function uniquePanelList() {
  return new Set(...Object.values(panelRegistry).map(p => p.name));
}