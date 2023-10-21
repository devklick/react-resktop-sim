import { useEffect, useRef, useState } from "react";
import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledItemsContent, StyledItems, StyledMenuItem } from "./styles";

export interface MenuItemsProps {
  items: Array<MenuItemProps>;
  position: { x: number; y: number };
  positionType: "relative" | "absolute";
}

export interface MenuItemProps {
  title: string;
  action?: () => void;
  items?: Array<MenuItemProps>;
}

function MenuItems({
  items,
  position: { x, y },
  positionType,
}: MenuItemsProps) {
  const settings = useSystemSettings();
  return (
    <StyledItems
      left={x}
      top={y}
      backgroundColor={settings.mainColor}
      position={positionType}
    >
      <StyledItemsContent>
        {items.map((item, i) => (
          <MenuItem
            title={item.title}
            action={item.action}
            items={item.items}
            itemNo={i + 1}
            position={{ x, y }}
            key={`${item.title}-${i}`}
          />
        ))}
      </StyledItemsContent>
    </StyledItems>
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
  const settings = useSystemSettings();

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
    if (action) {
      action();
    } else if (items) {
      setOpen(!open);
    }
  }

  return (
    <StyledMenuItem
      ref={elementRef}
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      hoverColor={settings.accentColor}
    >
      <span>{title}</span>
      {items && open && (
        <MenuItems
          items={items}
          position={{ ...elementPosition.current }}
          positionType="absolute"
        />
      )}
    </StyledMenuItem>
  );
}

export default MenuItems;
