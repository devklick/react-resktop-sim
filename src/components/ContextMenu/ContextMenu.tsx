import { useRef } from "react";
import MenuItems, { MenuItemProps } from "../MenuItems";
import useDetectMouseDownOutside from "../../hooks/useDetectMouseDownOutside";

import { StyledContextMenu } from "./styles";
import useBindKeyToAction from "../../hooks/useBindKeyToAction";

interface ContextMenuProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
  close: () => void;
}

function ContextMenu({ items, position, close }: ContextMenuProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useDetectMouseDownOutside({ elementRef, onMouseDown: close });
  useBindKeyToAction({ keys: ["Escape"], action: close });

  return (
    <StyledContextMenu position={position} ref={elementRef}>
      <MenuItems
        items={items}
        position={{ x: 0, y: 0 }}
        positionType="relative"
      />
    </StyledContextMenu>
  );
}

export default ContextMenu;
