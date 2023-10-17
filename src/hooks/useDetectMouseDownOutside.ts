import React, { useEffect } from "react";

interface UseDetectMouseDownOutsideProps<Element extends HTMLElement> {
  /**
   * A reference to the top-most element./
   * Clicks on any parents of this element will trigger the callback.
   * Clicking this element or any of it's children will not trigger the callback.
   */
  elementRef: React.RefObject<Element>;

  /**
   * The callback to be invoked when a mouse down
   * has been detected outside the element
   */
  onMouseDown: () => void;

  enabled?: boolean;
}

/**
 * Detects a mouse down event that has occurred outside of the specified element.
 *
 * Note that the term "_outside_" refers to the DOM structure and not the
 * position that the element is displayed on screen. Any clicks on the specified
 * element of any of its children (or it's childrens childrens, recursively)
 * is considered _inside_. Everything else is considered _outside_
 */
function useDetectMouseDownOutside<Element extends HTMLElement>({
  elementRef,
  onMouseDown,
  enabled = true,
}: UseDetectMouseDownOutsideProps<Element>) {
  useEffect(() => {
    if (!enabled) return;
    function handler(event: MouseEvent) {
      if (!elementRef.current || elementRef.current === event.target) {
        return;
      }

      console.log(elementRef.current);

      let call = true;
      function process(children: HTMLCollection) {
        for (const child of children) {
          if (child === event.target) {
            call = false;
            return;
          }

          if (child.children) {
            process(child.children);
          }
        }
      }

      if (elementRef.current.children) {
        process(elementRef.current.children);
      }

      if (call) {
        onMouseDown();
      }
    }

    window.addEventListener("mousedown", handler);

    return () => window.removeEventListener("mousedown", handler);
  }, [elementRef, enabled, onMouseDown]);
}

export default useDetectMouseDownOutside;
