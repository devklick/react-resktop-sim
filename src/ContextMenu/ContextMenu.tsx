import { useRef } from "react";
import MenuItems, { MenuItemProps } from "../components/MenuItems";
import "./ContextMenu.scss";
import useDetectClickOutside from "../hooks/useDetectClickOutside";

interface ContextMenuProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
  close: () => void;
}

function ContextMenu({ items, position, close }: ContextMenuProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useDetectClickOutside({ elementRef, onClick: close });

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
