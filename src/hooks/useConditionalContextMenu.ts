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

      // If the modifier key is not down, we dont
      // want the context menu to show, so we prevent default.
      if (!has) {
        e.preventDefault();
      } else {
        // When the modifier key is down, we'll allow the context menu to show.
        // However if the user removes their finger from the modifier key while
        // the context menu is open, the keyup event wont fire. Because of this,
        // we assume they will remove their finger from the key and remove it
        // from the list of held keys. If we dont do this, the hook will think
        // the modifier key is still down next time they right click, even if its not
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
