import { openPanelAtom, closePanelAtom, togglePanelAtom, goBackAtom, goForwardAtom, updatePanelAtom, canGoBackAtom, canGoForwardAtom, resetAtom } from '@/store/panels/actions';
import { openPanelsAtom, panelEntryMapAtom } from '@/store/panels/atoms';
import { useGlobalAtomValue, useGlobalSetAtom } from './useGlobalAtom';

export function usePanelStore() {
  return {
    openPanels: useGlobalAtomValue(openPanelsAtom),
    panelEntryMap: useGlobalAtomValue(panelEntryMapAtom),
    canGoBack: useGlobalAtomValue(canGoBackAtom),
    canGoForward: useGlobalAtomValue(canGoForwardAtom),
    setOpenPanels: useGlobalSetAtom(openPanelsAtom),
    openPanel: useGlobalSetAtom(openPanelAtom),
    closePanel: useGlobalSetAtom(closePanelAtom),
    updatePanel: useGlobalSetAtom(updatePanelAtom),
    togglePanel: useGlobalSetAtom(togglePanelAtom),
    goBack: useGlobalSetAtom(goBackAtom),
    goForward: useGlobalSetAtom(goForwardAtom),
    reset: useGlobalSetAtom(resetAtom),
  };
}