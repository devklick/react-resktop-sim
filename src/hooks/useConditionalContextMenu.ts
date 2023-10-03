import { useEffect, useRef } from "react";

function useConditionalContextMenu(modifierKey = "ControlLeft") {
  const keys = useRef<Set<string>>(new Set());

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      keys.current.add(e.code);
    }

    function onKeyUp(e: KeyboardEvent) {
      keys.current.delete(e.code);
    }

    function onContextMenu(e: MouseEvent) {
      const has = keys.current.has(modifierKey);

      if (!has) {
        e.preventDefault();
      } else {
        keys.current.delete(modifierKey);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("contextmenu", onContextMenu);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("contextmenu", onContextMenu);
    };
  });
}

export default useConditionalContextMenu;
