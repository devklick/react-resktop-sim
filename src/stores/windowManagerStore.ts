import React, { ReactNode, createRef } from "react";
import { create } from "zustand";

interface WindowManagerStoreState {
  contentRef: React.RefObject<HTMLDivElement>;
  /**
   * A map of all windows.
   * The key is the type of window, and the value is another map.
   * The key of the nested map is the ID of the window, and the value
   * is the window JSX element.
   */
  windowsMap: Map<string, Map<string, ReactNode>>;
  getWindows: () => Array<ReactNode>;
  addWindow: (windowType: string, windowId: string, window: ReactNode) => void;
  closeWindow: (windowType: string, windowId: string) => void;
}
const useWindowManagerStore = create<WindowManagerStoreState>()((set, get) => ({
  contentRef: createRef<HTMLDivElement>(),
  windowsMap: new Map(),
  getWindows() {
    return Array.from(get().windowsMap.values()).flatMap((map) =>
      Array.from(map.values())
    );
  },
  addWindow(windowType, windowId, window) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);

    if (!windowsOfType) {
      windowsMap.set(windowType, new Map([[windowId, window]]));
    } else {
      windowsOfType.set(windowId, window);
    }

    set({ windowsMap });
  },
  closeWindow(windowType, windowId) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);
    if (windowsOfType) {
      windowsOfType.delete(windowId);
    }
    set({ windowsMap });
  },
}));

export default useWindowManagerStore;
