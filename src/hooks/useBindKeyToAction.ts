import { useEffect } from "react";
import { KeyCode, isKeyCode } from "../common/keyCode";

interface UseBindKeyToActionProps {
  keys: Array<KeyCode>;
  action: () => void;
}

function useBindKeyToAction({ keys, action }: UseBindKeyToActionProps) {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (isKeyCode(event.code) && keys.includes(event.code)) {
        action();
      }
    }

    window?.addEventListener("keydown", handler);

    return () => {
      window?.addEventListener("keydown", handler);
    };
  }, [action, keys]);
}

export default useBindKeyToAction;
