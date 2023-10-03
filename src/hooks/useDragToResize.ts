import { useEffect, useRef } from "react";

// reference: https://stackoverflow.com/questions/62436814/react-drag-corner-of-element-to-resize-contents

export interface Dimensions {
  width: number;
  height: number;
}

export interface Rect extends Dimensions {
  top: number;
  left: number;
}

interface Position {
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

function useDragToResize({
  elementRef,
  resizeERef,
  resizeNRef,
  resizeSRef,
  resizeWRef,
  minDimensions,
}: UseDragToResizeProps): Rect {
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

  useEffect(() => {
    function handleMouseDown({
      mouseDownEvent,
      widthFn,
      heightFn,
      topFn,
      leftFn,
    }: {
      mouseDownEvent: MouseEvent;
      widthFn?: MouseMovementHandler;
      heightFn?: MouseMovementHandler;
      topFn?: MouseMovementHandler;
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
      function onMouseUp() {
        document.body.removeEventListener("mousemove", onMouseMove);
      }
      document.body?.addEventListener("mousemove", onMouseMove);
      document.body?.addEventListener("mouseup", onMouseUp, { once: true });
    }

    function handleMouseDownE(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.width ?? 0) -
            mouseDownPosition.x +
            mouseMoveEvent.pageX
          );
        },
      });
    }

    function handleMouseDownN(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        heightFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.height ?? 0) +
            mouseDownPosition.y -
            mouseMoveEvent.pageY
          );
        },
        topFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.top ?? 0) - mouseDownPosition.y + mouseMoveEvent.pageY
          );
        },
      });
    }

    function handleMouseDownS(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        heightFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.height ?? 0) -
            mouseDownPosition.y +
            mouseMoveEvent.pageY
          );
        },
      });
    }

    function handleMouseDownW(mouseDownEvent: MouseEvent) {
      handleMouseDown({
        mouseDownEvent,
        widthFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.width ?? 0) +
            mouseDownPosition.x -
            mouseMoveEvent.pageX
          );
        },
        leftFn: (initialRect, mouseDownPosition, mouseMoveEvent) => {
          return (
            (initialRect.left ?? 0) - mouseDownPosition.x + mouseMoveEvent.pageX
          );
        },
      });
    }

    resizeERef?.current?.addEventListener("mousedown", handleMouseDownE);
    resizeNRef?.current?.addEventListener("mousedown", handleMouseDownN);
    resizeSRef?.current?.addEventListener("mousedown", handleMouseDownS);
    resizeWRef?.current?.addEventListener("mousedown", handleMouseDownW);

    const _resizeERef = resizeERef;
    const _resizeNRef = resizeNRef;
    const _resizeSRef = resizeSRef;
    const _resizeWRef = resizeWRef;

    return () => {
      _resizeERef?.current?.removeEventListener("mousedown", handleMouseDownE);
      _resizeNRef?.current?.removeEventListener("mousedown", handleMouseDownN);
      _resizeSRef?.current?.removeEventListener("mousedown", handleMouseDownS);
      _resizeWRef?.current?.removeEventListener("mousedown", handleMouseDownW);
    };
  });
  return {
    height: elementRect.current.height ?? 0,
    width: elementRect.current.width ?? 0,
    left: 0,
    top: 0,
  };
}

export default useDragToResize;
