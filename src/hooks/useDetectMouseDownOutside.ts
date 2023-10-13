import React, { useEffect } from "react";

interface UseDetectMouseDownOutsideProps<Element extends HTMLElement> {
  /**
   * A reference to the top-most element./
   * Clicks on any parents of this element will trigger the callback.
   * Clicking this element or any of it's children will not trigger the callback.
   */
  elementRef: React.RefObject<Element>;

  /**
   * The callback to be invoked when a click
   * has been detected outside
   */
  onMouseDown: () => void;
}

/**
 * Detects a click that has occurred outside of the specified element.
 */
function useDetectMouseDownOutside<Element extends HTMLElement>({
  elementRef,
  onMouseDown,
}: UseDetectMouseDownOutsideProps<Element>) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      // TODO: Fix this - doesnt work for fixed/absolute positioned items.
      // Instead of checking if it's inside/outside the rect,
      // we'll probs have to recursively check all children to see
      // if the child element is equal to the event target. If so,
      // the click is within, otherwise it's outside.
      const bounds = elementRef.current?.getBoundingClientRect();
      if (e.clientX < (bounds?.left ?? 0)) {
        return onMouseDown();
      }
      if (e.clientX > (bounds?.left ?? 0) + (bounds?.width ?? 0)) {
        return onMouseDown();
      }
      if (e.clientY < (bounds?.top ?? 0)) {
        return onMouseDown();
      }
      if (e.clientY > (bounds?.top ?? 0) + (bounds?.height ?? 0)) {
        return onMouseDown();
      }
    }

    window.addEventListener("mousedown", handler);

    return () => window.removeEventListener("mousedown", handler);
  });
}

export default useDetectMouseDownOutside;
