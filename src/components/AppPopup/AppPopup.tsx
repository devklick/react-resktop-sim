import React, { useEffect, useRef, useState } from "react";
import { Rect } from "../../hooks/useDragToResize";
import useDetectMouseDownOutside from "../../hooks/useDetectMouseDownOutside";
import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledContent, StyledPopup } from "./styles";

interface AppPopupProps<Element extends HTMLElement> {
  appRef: React.RefObject<Element>;
  close: () => void;
}

function AppPopup<Element extends HTMLElement>({
  appRef,
  children,
  close,
}: React.PropsWithChildren<AppPopupProps<Element>>) {
  const thisRef = useRef<HTMLDivElement>(null);
  const settings = useSystemSettings();
  const [rect, setRect] = useState<Rect>({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  });

  useDetectMouseDownOutside({ elementRef: thisRef, onMouseDown: close });

  useEffect(() => {
    if (appRef.current) {
      const bounds = appRef.current.getBoundingClientRect();
      setRect({
        height: bounds.height ?? 0,
        left: bounds.left ?? 0,
        top: bounds.top ?? 0,
        width: bounds.width ?? 0,
      });
    }
  }, [appRef]);

  function handleContextMenu(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <StyledPopup
      {...rect}
      ref={thisRef}
      onContextMenu={handleContextMenu}
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <StyledContent backgroundColor={settings.mainColor}>
        {children}
      </StyledContent>
    </StyledPopup>
  );
}

export default AppPopup;
