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
      // If the element has been clicked on, we dont want to invoke the callback
      if (e.target === elementRef.current) return;

      for (const child of elementRef.current?.childNodes ?? []) {
        // If any of the elements children have been clicked,
        // we dont want to invoke the callback
        if (e.target === child) return;
      }

      // Click must be outside, so invoke callback
      onMouseDown();
    }

    window.addEventListener("mousedown", handler);

    return () => window.removeEventListener("mousedown", handler);
  });
}

export default useDetectMouseDownOutside;
