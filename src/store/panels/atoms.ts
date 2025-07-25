import { atom } from 'jotai';
import type {
  PanelEntryMap,
  PanelStoreState,
} from '@/types/panels';

// Initial states
export const openPanelsAtom = atom<string[]>([]);
export const panelEntryMapAtom = atom<PanelEntryMap>({});
export const historyStackAtom = atom<PanelStoreState[]>([]);
export const historyIndexAtom = atom<number>(-1);