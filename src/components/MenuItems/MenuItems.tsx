import { useEffect, useRef, useState } from "react";
import useSystemSettings from "../../stores/systemSettingsStore";
import "./MenuItems.scss";

export interface MenuItemsProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
}

export interface MenuItemProps {
  title: string;
  action?: () => void;
  items?: Array<MenuItemProps>;
}

function MenuItems({ items, position }: MenuItemsProps) {
  const settings = useSystemSettings();
  return (
    <div
      className="menu-items"
      style={{
        left: position.x,
        top: position.y,
        backgroundColor: settings.mainColor,
      }}
    >
      <div className="menu-items__content">
        {items.map((item, i) => (
          <MenuItem
            title={item.title}
            action={item.action}
            items={item.items}
            itemNo={i + 1}
            position={{ ...position }}
            key={`${item.title}-${i}`}
          />
        ))}
      </div>
    </div>
  );
}

function MenuItem({
  title,
  action,
  items,
  itemNo,
  position,
}: MenuItemProps & {
  itemNo: number;
  position: { x: number; y: number };
}) {
  const hoverDelayMs = 400;
  const elementRef = useRef<HTMLDivElement>(null);
  const elementPosition = useRef({ ...position });
  const hoverOpenDelayRef = useRef<NodeJS.Timeout>();
  const hoverCloseDelayRef = useRef<NodeJS.Timeout>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      clearTimeout(hoverCloseDelayRef.current);
      clearTimeout(hoverOpenDelayRef.current);
    };
  }, []);

  useEffect(() => {
    const rect = elementRef.current?.getBoundingClientRect();
    elementPosition.current.x = rect?.width ?? 0;
    elementPosition.current.y = (rect?.height ?? 0) * (itemNo - 1);
  }, [elementRef, itemNo, position]);

  function handleOnMouseEnter() {
    // Now that we've entered the item, if it's open
    // and there's a pending timeout to close it,
    // we want to cancel that
    if (open && hoverCloseDelayRef.current) {
      clearTimeout(hoverCloseDelayRef.current);
      hoverCloseDelayRef.current = undefined;
    }

    // If it's not open yet and there's no pending
    // timeout to open it, lets start one.
    if (!open && !hoverOpenDelayRef.current) {
      hoverOpenDelayRef.current = setTimeout(() => {
        if (!open) {
          setOpen(true);
          hoverOpenDelayRef.current = undefined;
        }
      }, hoverDelayMs);
    }
  }
  function handleOnMouseLeave() {
    // Now that we've left the item, if it's closed
    // and there's a pending timeout to open it,
    // we want to cancel that
    if (!open && hoverOpenDelayRef.current) {
      clearTimeout(hoverOpenDelayRef.current);
      hoverOpenDelayRef.current = undefined;
    }

    // If it's not closed yet and there's no pending
    // timeout to close it, lets start one.
    if (open && !hoverCloseDelayRef.current) {
      hoverCloseDelayRef.current = setTimeout(() => {
        if (open) {
          setOpen(false);
          hoverCloseDelayRef.current = undefined;
        }
      }, hoverDelayMs);
    }
  }

  function handleOnClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!items) return;
    setOpen(!open);
  }

  return (
    <div
      ref={elementRef}
      className="menu-item"
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <span className="menu-item__title" onClick={action}>
        {title}
      </span>
      {items && open && (
        <MenuItems items={items} position={{ ...elementPosition.current }} />
      )}
    </div>
  );
}

export default MenuItems;
