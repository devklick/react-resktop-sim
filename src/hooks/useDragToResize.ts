import { MutableRefObject, useEffect, useRef } from "react";

// reference: https://stackoverflow.com/questions/62436814/react-drag-corner-of-element-to-resize-contents

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect extends Dimensions {
  top: number;
  left: number;
}

export interface Position {
  x: number;
  y: number;
}

type MouseMovementHandler = (
  initialRect: Partial<Rect>,
  mouseDownPosition: Position,
  mouseMoveEvent: MouseEvent
) => number;

interface UseDragToResizeProps {
  elementRef: React.RefObject<HTMLElement>;
  elementRect: MutableRefObject<Partial<Rect>>;
  minDimensions: Dimensions;
}

function useDragToResize({
  elementRef,
  minDimensions,
  elementRect,
}: UseDragToResizeProps) {
  const resizeHandleN = useRef<HTMLDivElement>(null);
  const resizeHandleNE = useRef<HTMLDivElement>(null);
  const resizeHandleE = useRef<HTMLDivElement>(null);
  const resizeHandleSE = useRef<HTMLDivElement>(null);
  const resizeHandleS = useRef<HTMLDivElement>(null);
  const resizeHandleSW = useRef<HTMLDivElement>(null);
  const resizeHandleW = useRef<HTMLDivElement>(null);
  const resizeHandleNW = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Whenever a mousedown event happens on any of the resize refs,
     * this function is invoked to handle the event
     */
    function handleMouseDown({
      mouseDownEvent,
      widthFn,
      heightFn,
      topFn,
      leftFn,
    }: {
      /** The event that occurred */
      mouseDownEvent: MouseEvent;
      /** Function to manipulate the elements width */
      widthFn?: MouseMovementHandler;
      /** Function to manipulate the elements height */
      heightFn?: MouseMovementHandler;
      /** Function to manipulate the elements top position */
      topFn?: MouseMovementHandler;
      /** Function to manipulate the elements left position */
      leftFn?: MouseMovementHandler;
    }) {
      const initialRect = { ...elementRect.current };
      const startPos = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };

      function onMouseMove(mouseMoveEvent: MouseEvent) {
        if (
          !elementRef?.current ||
          initialRect.width === undefined ||
          initialRect.height === undefined
        ) {
          return;
        }

        // Calculate the new width and left position.
        // If the width is within the allowed range, resize the element
        const newWidth =
          widthFn?.(initialRect, startPos, mouseMoveEvent) ?? initialRect.width;

        const newLeft =
          leftFn?.(initialRect, startPos, mouseMoveEvent) ?? initialRect.left;

        if (newWidth >= minDimensions.width) {
          elementRect.current.width = newWidth;
          elementRef.current.style.width = `${elementRect.current.width}px`;
          elementRect.current.left = newLeft;
          elementRef.current.style.left = `${elementRect.current.left}px`;
        }

        // Calculate the new height and top position.
        // If the width is within the allowed range, resize the element
        const newHeight =
          heightFn?.(initialRect, startPos, mouseMoveEvent) ??
          initialRect.height;
        const newTop =
          topFn?.(initialRect, startPos, mouseMoveEvent) ?? initialRect.top;

        if (newHeight >= minDimensions.height) {
          elementRect.current.height = newHeight;
          elementRef.current.style.height = `${elementRect.current.height}px`;
          elementRect.current.top = newTop;
          elementRef.current.style.top = `${elementRect.current.top}px`;
        }
      }

      // Whenever the mouse up happens, we need to remove the onMouseMove handler
      function onMouseUp() {
        document.body.removeEventListener("mousemove", onMouseMove);
      }

      document.body?.addEventListener("mousemove", onMouseMove);
      document.body?.addEventListener("mouseup", onMouseUp, { once: true });
    }

    //#region Comment Mouse Movement Functions
    const nHeightFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.height ?? 0) + mouseDownPosition.y - mouseMoveEvent.pageY;

    const nTopFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.top ?? 0) - mouseDownPosition.y + mouseMoveEvent.pageY;

    const eWidthFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.width ?? 0) - mouseDownPosition.x + mouseMoveEvent.pageX;

    const sHeightFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.height ?? 0) - mouseDownPosition.y + mouseMoveEvent.pageY;

    const wWidthFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.width ?? 0) + mouseDownPosition.x - mouseMoveEvent.pageX;

    const wLeftFn: MouseMovementHandler = (
      initialRect,
      mouseDownPosition,
      mouseMoveEvent
    ) => (initialRect.left ?? 0) - mouseDownPosition.x + mouseMoveEvent.pageX;
    //#endregion

    //#region Mouse Event Handlers
    function handleMouseDownN(mouseDownEvent: MouseEvent) {
      handleMouseDown({ mouseDownEvent, heightFn: nHeightFn, topFn: nTopFn });
    }

    function handleMouseDownNE(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: eWidthFn,
        heightFn: nHeightFn,
        topFn: nTopFn,
      });
    }

    function handleMouseDownE(mouseDownEvent: MouseEvent) {
      handleMouseDown({ mouseDownEvent, widthFn: eWidthFn });
    }

    function handleMouseDownSE(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        heightFn: sHeightFn,
        widthFn: eWidthFn,
      });
    }

    function handleMouseDownS(mouseDownEvent: MouseEvent) {
      handleMouseDown({ mouseDownEvent, heightFn: sHeightFn });
    }

    function handleMouseDownSW(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: wWidthFn,
        leftFn: wLeftFn,
        heightFn: sHeightFn,
      });
    }

    function handleMouseDownW(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: wWidthFn,
        leftFn: wLeftFn,
      });
    }

    function handleMouseDownNW(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: wWidthFn,
        leftFn: wLeftFn,
        heightFn: nHeightFn,
        topFn: nTopFn,
      });
    }
    //#endregion

    //#region add/remove handlers
    resizeHandleE?.current?.addEventListener("mousedown", handleMouseDownE);
    resizeHandleN?.current?.addEventListener("mousedown", handleMouseDownN);
    resizeHandleS?.current?.addEventListener("mousedown", handleMouseDownS);
    resizeHandleW?.current?.addEventListener("mousedown", handleMouseDownW);

    resizeHandleNE?.current?.addEventListener("mousedown", handleMouseDownNE);
    resizeHandleSE?.current?.addEventListener("mousedown", handleMouseDownSE);
    resizeHandleSW?.current?.addEventListener("mousedown", handleMouseDownSW);
    resizeHandleNW?.current?.addEventListener("mousedown", handleMouseDownNW);

    const _resizeERef = resizeHandleE;
    const _resizeNRef = resizeHandleN;
    const _resizeSRef = resizeHandleS;
    const _resizeWRef = resizeHandleW;

    const _resizeNERef = resizeHandleNE;
    const _resizeSERef = resizeHandleSE;
    const _resizeSWRef = resizeHandleSW;
    const _resizeNWRef = resizeHandleNW;

    return () => {
      _resizeERef?.current?.removeEventListener("mousedown", handleMouseDownE);
      _resizeNRef?.current?.removeEventListener("mousedown", handleMouseDownN);
      _resizeSRef?.current?.removeEventListener("mousedown", handleMouseDownS);
      _resizeWRef?.current?.removeEventListener("mousedown", handleMouseDownW);
      _resizeNERef?.current?.removeEventListener(
        "mousedown",
        handleMouseDownNE
      );
      _resizeSERef?.current?.removeEventListener(
        "mousedown",
        handleMouseDownSE
      );
      _resizeSWRef?.current?.removeEventListener(
        "mousedown",
        handleMouseDownSW
      );
      _resizeNWRef?.current?.removeEventListener(
        "mousedown",
        handleMouseDownNW
      );
    };
    //#endregion
  });

  return {
    resizeHandleN: resizeHandleN,
    resizeHandleNE: resizeHandleNE,
    resizeHandleE: resizeHandleE,
    resizeHandleSE: resizeHandleSE,
    resizeHandleS: resizeHandleS,
    resizeHandleSW: resizeHandleSW,
    resizeHandleW: resizeHandleW,
    resizeHandleNW: resizeHandleNW,
  };
}

export default useDragToResize;
