import React, {
  MutableRefObject,
  RefCallback,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Rect } from "./useDragToResize";

// https://stackoverflow.com/a/39192992/6236042

type StyledElement = {
  style: CSSStyleDeclaration;
};

function hasStyle(value: unknown): value is StyledElement {
  return !!value && typeof value === "object" && "style" in value;
}

interface UseDraggableProps {
  /**
   * A reference to the element that can be used to move the draggable element.
   * If omitted, clicking anywhere on the entire draggable element will
   * allow you to move it.
   */
  moveRef?: React.RefObject<HTMLElement> | null;

  elementRect: MutableRefObject<Partial<Rect>>;
}

// complex logic should be a hook, not a component
const useDragToMove = ({ moveRef = null, elementRect }: UseDraggableProps) => {
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const unsubscribe = useRef<VoidFunction>();
  const moveHandle: RefCallback<HTMLElement> = useCallback(
    (elem) => {
      ref.current = elem;
      if (unsubscribe.current) {
        unsubscribe.current;
      }
      if (!elem) {
        return;
      }
      const handleMouseDown = (e: MouseEvent) => {
        const elem = moveRef?.current ?? e.target;
        if (hasStyle(elem)) {
          elem.style.userSelect = "none";
        }
        setPressed(true);
      };
      elem.addEventListener("mousedown", handleMouseDown);
      unsubscribe.current = () => {
        elem.removeEventListener("mousedown", handleMouseDown);
      };
    },
    [moveRef]
  );

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = throttle(
      (event: { movementX: number; movementY: number }) => {
        if (!ref.current || !elementRect.current) {
          return;
        }

        elementRect.current.left =
          (elementRect.current.left ?? 0) + event.movementX;

        elementRect.current.top =
          (elementRect.current.top ?? 0) + event.movementY;

        const elem = moveRef?.current ?? ref.current;

        elem.style.left = `${elementRect.current.left}px`;
        elem.style.top = `${elementRect.current.top}px`;
      }
    );
    const handleMouseUp = (e: MouseEvent) => {
      const elem = moveRef?.current ?? e.target;
      if (hasStyle(elem)) {
        elem.style.userSelect = "auto";
      }
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
  }, [pressed, moveRef, elementRect]);

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
