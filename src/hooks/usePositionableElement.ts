import { useEffect, useRef } from "react";
import useDragToResize, { Dimensions, Rect } from "./useDragToResize";
import useDragToMove from "./useDragToMove";
import useWindowMinMax from "./useWindowMinMax";

interface UsePositionableElementProps {
  elementRef: React.RefObject<HTMLElement>;
  minDimensions: Dimensions;
  resizeNRef?: React.RefObject<HTMLElement> | null;
  resizeNERef?: React.RefObject<HTMLElement> | null;
  resizeERef?: React.RefObject<HTMLElement> | null;
  resizeSERef?: React.RefObject<HTMLElement> | null;
  resizeSRef?: React.RefObject<HTMLElement> | null;
  resizeSWRef?: React.RefObject<HTMLElement> | null;
  resizeWRef?: React.RefObject<HTMLElement> | null;
  resizeNWRef?: React.RefObject<HTMLElement> | null;
}

/**
 * Allows an element to be moved and resized.
 *
 * Essentially wraps around a bunch of other hooks,
 * holding the elements position in a single shared ref.
 */
function usePositionableElement({
  elementRef,
  minDimensions,
  resizeNRef,
  resizeNERef,
  resizeERef,
  resizeSERef,
  resizeSRef,
  resizeSWRef,
  resizeWRef,
  resizeNWRef,
}: UsePositionableElementProps) {
  // Hold a single ref for the elements rect,
  // so we dont have to call getBoundingClientRect every
  // time we need to make a change to the position/dimensions.
  const elementRect = useRef<Partial<Rect>>({
    width: undefined,
    height: undefined,
    left: undefined,
    top: undefined,
  });

  // Since we dont know the size that the element should initialize to,
  // we need to grab the sizes from the element rect
  useEffect(() => {
    if (elementRef.current) {
      const rect = elementRef.current?.getBoundingClientRect();
      elementRect.current = {
        height: rect.height,
        width: rect.width,
        left: rect.left,
        top: rect.top,
      };
    }
  }, [elementRef]);

  // The resize hook allows the app to be resized
  // by dragging the corners or edges of the element.
  // It needs to know the elementRect, so any changes
  // it makes can be shared with the other hooks.
  useDragToResize({
    elementRef,
    elementRect,
    minDimensions,
    resizeNRef,
    resizeNERef,
    resizeERef,
    resizeSERef,
    resizeSRef,
    resizeSWRef,
    resizeWRef,
    resizeNWRef,
  });

  // The move hook allows the app to be moved when
  // the element that has the clickToMoveRef is clicked and dragged.
  // Again, it needs to know the elementRect for the same reason mentioned above.
  const [clickToMoveRef] = useDragToMove({
    moveRef: elementRef,
    elementRect,
  });

  // Allows the the element to be minimized or maximized.
  // Again, it needs to know the elementRect for the same reason mentioned above.
  const { maximize, minimize } = useWindowMinMax({
    windowRef: elementRef,
    windowRect: elementRect,
  });

  return {
    clickToMoveRef,
    minimize,
    maximize,
  };
}

export default usePositionableElement;
