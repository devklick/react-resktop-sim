import React, { useEffect, useRef, useState } from "react";
import useDetectMouseDownOutside from "../../../hooks/useDetectMouseDownOutside";
import MenuItems, { MenuItemProps } from "../../MenuItems";

import { StyledAppMenu } from "./styles";

export interface BorderedAppMenuProps {
  title: string;
  items: Array<MenuItemProps>;
  appRef: React.RefObject<HTMLDivElement>;
}

function BorderedAppMenu({ title, appRef, items }: BorderedAppMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const rect = elementRef.current?.getBoundingClientRect();
    const appRect = appRef.current?.getBoundingClientRect();
    if (!rect || !appRect) return;

    position.current = {
      x: (rect?.left ?? 0) - appRect.left,
      y: rect?.height ?? 0,
    };
  }, [appRef, elementRef]);

  // Close the menu if an outside click occurs
  useDetectMouseDownOutside({
    elementRef,
    onMouseDown: () => setOpen(false),
    enabled: open,
  });

  return (
    <StyledAppMenu ref={elementRef} onClick={() => setOpen(!open)}>
      <span>{title}</span>
      {open && (
        <MenuItems
          items={items}
          position={{ ...position.current }}
          positionType="absolute"
        />
      )}
    </StyledAppMenu>
  );
}

export default BorderedAppMenu;
