import React, {
  MutableRefObject,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Position, Rect } from "./useDragToResize";

// https://stackoverflow.com/a/39192992/6236042

interface UseDraggableProps {
  /**
   * A reference to the element that can be used to move the draggable element.
   * If omitted, clicking anywhere on the entire draggable element will
   * allow you to move it.
   */
  moveRef?: React.RefObject<HTMLElement> | null;

  elementRect: MutableRefObject<Partial<Rect>>;

  threshold?: number;
}

// complex logic should be a hook, not a component
const useDragToMove = ({
  moveRef = null,
  elementRect,
  threshold = 7,
}: UseDraggableProps) => {
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const tempRect = useRef<Position>({ x: 0, y: 0 });
  const moving = useRef(false);

  const unsubscribe = useRef<VoidFunction>();
  const moveHandle: RefCallback<HTMLElement> = useCallback((elem) => {
    ref.current = elem;
    if (unsubscribe.current) {
      unsubscribe.current;
    }
    if (!elem) {
      return;
    }
    const handleMouseDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).classList.contains("drag-to-move")) return;
      setPressed(true);
    };
    elem.addEventListener("mousedown", handleMouseDown);
    unsubscribe.current = () => {
      elem.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = throttle(
      (event: { movementX: number; movementY: number }) => {
        const element = moveRef?.current ?? ref.current;

        if (!element) return;

        tempRect.current.x += event.movementX;
        tempRect.current.y += event.movementY;

        if (
          Math.abs(tempRect.current.x) >= threshold ||
          Math.abs(tempRect.current.y) >= threshold ||
          moving.current
        ) {
          elementRect.current.left =
            (elementRect.current.left ?? 0) + tempRect.current.x;

          elementRect.current.top =
            (elementRect.current.top ?? 0) + tempRect.current.y;

          tempRect.current.x = 0;
          tempRect.current.y = 0;
          moving.current = true;
        }

        element.style.left = `${elementRect.current.left}px`;
        element.style.top = `${elementRect.current.top}px`;
      }
    );
    const handleMouseUp = () => {
      tempRect.current.x = 0;
      tempRect.current.y = 0;
      moving.current = false;
      setPressed(false);
    };
    // subscribe to mousemove and mouseup on document, otherwise you
    // can escape bounds of element while dragging and get stuck
    // dragging it forever
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // if `onDrag` wasn't defined with `useCallback`, we'd have to
    // resubscribe to 2 DOM events here, not to say it would mess
    // with `throttle` and reset its internal timer
  }, [pressed, moveRef, elementRect, threshold]);

  // actually it makes sense to return an array only when
  // you expect that on the caller side all of the fields
  // will be usually renamed
  return { moveHandle, pressed };

  // > seems the best of them all to me
  // this code doesn't look pretty anymore, huh?
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle(f: any) {
  let token: number | null = null;
  let lastArgs: unknown[] | null = null;

  const invoke = () => {
    f(...(lastArgs ?? []));
    token = null;
  };

  const result = (...args: unknown[]) => {
    lastArgs = args;
    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };

  result.cancel = () => token && cancelAnimationFrame(token);
  return result;
}

export default useDragToMove;
