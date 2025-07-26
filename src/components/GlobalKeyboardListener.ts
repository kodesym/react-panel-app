import { usePanelStore } from "@/hooks/usePanelStore";
import { useEffect } from "react";

export function GlobalKeyboardListener() {
  const panelStore = usePanelStore();
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        $log.debug(panelStore.openPanels);
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  return null; // just side-effect
}