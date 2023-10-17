import React from "react";
import { create } from "zustand";

export interface BaseProps {
  zIndex?: number;
  hidden?: boolean;
  children?: React.ReactNode;
}

interface ComponentDefinition<Props extends BaseProps = BaseProps> {
  component: React.FC<Props>;
  props: Props;
  children?: React.ReactNode;
  key: string | number;
}

interface WindowManagerStoreState {
  contentRef: React.RefObject<HTMLDivElement>;
  windowsMap: Map<string, Map<string, ComponentDefinition>>;
  highestZIndex: number;
  getWindowDefinitions: () => Array<ComponentDefinition>;
  addWindow: <Props extends BaseProps = BaseProps>(
    windowType: string,
    windowId: string,
    definition: ComponentDefinition<Props>
  ) => void;
  closeWindow: (windowType: string, windowId: string) => void;
  focusWindowsOfType: (windowType: string) => void;
  focusWindow: (windowType: string, windowId: string) => void;
  windowsOfTypeExist: (windowType: string) => boolean;
  hideWindow: (windowType: string, windowId: string) => void;
}

const useWindowManagerStore = create<WindowManagerStoreState>()((set, get) => ({
  contentRef: React.createRef<HTMLDivElement>(),
  windowsMap: new Map(),
  highestZIndex: 0,
  getWindowDefinitions() {
    return Array.from(get().windowsMap.values()).flatMap((map) =>
      Array.from(map.values())
    );
  },
  addWindow<Props extends BaseProps = BaseProps>(
    windowType: string,
    windowId: string,
    definition: ComponentDefinition<Props>
  ) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);
    const highestZIndex = get().highestZIndex + 1;
    definition.props.zIndex = highestZIndex;

    // TODO: Need to find a better way of dealing with this rather than risky casting
    if (!windowsOfType) {
      windowsMap.set(
        windowType,
        new Map([[windowId, definition as unknown as ComponentDefinition]])
      );
    } else {
      windowsOfType.set(windowId, definition as unknown as ComponentDefinition);
    }

    set({ windowsMap, highestZIndex });
  },
  closeWindow(windowType, windowId) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);

    // Delete the window, and if there are no windows left of this type,
    // remove the window type map from the master window map
    windowsOfType?.delete(windowId);

    if (windowsOfType?.size === 0) {
      windowsMap.delete(windowType);
    }

    // If there are no windows left open, reset the zIndex counter
    let highestZIndex = get().highestZIndex;
    if (!windowsMap.size) highestZIndex = 1;

    set({ windowsMap, highestZIndex });
  },
  focusWindowsOfType(windowType) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);

    // If no windows of this type exist, nothing to do
    if (!windowsOfType?.size) return;

    let highestZIndex = get().highestZIndex;

    // There may be multiple instances of this window type open,
    // so we want to preserve the zindex order they have relative to each other.
    // To do this, we sort them so we're processing the one with the lowest zindex first
    Array.from(windowsOfType.values())
      .sort((a, b) => (a.props.zIndex ?? 0) - (b.props.zIndex ?? 0))
      .forEach((window) => {
        window.props.zIndex = ++highestZIndex;
        window.props.hidden = false;
      });

    set({ windowsMap });
  },
  focusWindow(windowType, windowId) {
    let highestZIndex = get().highestZIndex;
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);
    const window = windowsOfType?.get(windowId);

    // If the window doesnt exist, nothing to do
    if (!windowsOfType || !window) return;

    // If the window is already top most, nothing to do
    if (window.props.zIndex === highestZIndex) return;

    // Increase the zindex counter and set the window to have this zindex
    highestZIndex++;
    window.props.zIndex = highestZIndex;
    window.props.hidden = false;

    set({ windowsMap, highestZIndex });
  },
  windowsOfTypeExist(windowType) {
    return (get().windowsMap.get(windowType)?.size ?? 0) > 0;
  },
  hideWindow(windowType, windowId) {
    const windowsMap = get().windowsMap;
    const windowsOfType = windowsMap.get(windowType);
    const window = windowsOfType?.get(windowId);
    if (!windowsOfType || !window) return;
    window.props.hidden = true;
    set({ windowsMap });
  },
}));

export default useWindowManagerStore;
