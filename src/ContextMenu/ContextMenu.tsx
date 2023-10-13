import { useRef } from "react";
import MenuItems, { MenuItemProps } from "../components/MenuItems";
import useDetectMouseDownOutside from "../hooks/useDetectMouseDownOutside";

import "./ContextMenu.scss";

interface ContextMenuProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
  close: () => void;
}

function ContextMenu({ items, position, close }: ContextMenuProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useDetectMouseDownOutside({ elementRef, onMouseDown: close });

  return (
    <div
      className="context-menu"
      ref={elementRef}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <MenuItems
        items={items}
        position={{ x: 0, y: 0 }}
        positionType="relative"
      />
    </div>
  );
}

export default ContextMenu;
