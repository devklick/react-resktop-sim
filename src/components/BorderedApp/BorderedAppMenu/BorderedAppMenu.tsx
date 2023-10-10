import { useEffect, useRef, useState } from "react";
import "./BorderedAppMenu.scss";
import useSystemSettings from "../../../stores/systemSettingsStore";

export interface BorderedAppMenuItemProps {
  title: string;
  action?: () => void;
  items?: Array<BorderedAppMenuItemProps>;
}

export interface BorderedAppMenuProps {
  title: string;
  items: Array<BorderedAppMenuItemProps>;
}

function BorderedAppMenuItem({
  title,
  action,
  items,
  itemNo,
  position,
}: BorderedAppMenuItemProps & {
  itemNo: number;
  position: { x: number; y: number };
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const elementPosition = useRef({ ...position });
  const hoverRevealDelayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const rect = elementRef.current?.getBoundingClientRect();

    // Since we're adding to the ref value, we first check if it's
    // still it's initial value. This avoids incorrectly adding
    // multiple times when the effect fires multiple times.
    if (elementPosition.current.x === position.x) {
      elementPosition.current.x += rect?.width ?? 0;
    }
    if (elementPosition.current.y === position.y) {
      elementPosition.current.y += (rect?.height ?? 0) * (itemNo - 1);
    }
  }, [elementRef, itemNo, position]);
  const [open, setOpen] = useState<boolean>(false);

  function handleOnMouseEnter() {
    if (!open) {
      hoverRevealDelayRef.current = setTimeout(() => {
        if (!open) setOpen(true);
      }, 400);
    }
  }
  function handleOnMouseLeave() {
    if (hoverRevealDelayRef.current) {
      clearTimeout(hoverRevealDelayRef.current);
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
      className="bordered-app-menu-item"
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <span className="bordered-app-menu-item__title" onClick={action}>
        {title}
      </span>
      {items && open && (
        <BorderedAppMenuItems
          items={items}
          position={{ ...elementPosition.current }}
        />
      )}
    </div>
  );
}

function BorderedAppMenuItems({
  items,
  position,
}: {
  items: Array<BorderedAppMenuItemProps>;
  position: { x: number; y: number };
}) {
  const settings = useSystemSettings();
  return (
    <div
      className="bordered-app-menu-items"
      style={{
        left: position.x,
        top: position.y,
        backgroundColor: settings.mainColor,
      }}
    >
      <div className="bordered-app-menu-items__content">
        {items.map((item, i) => (
          <BorderedAppMenuItem
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

function BorderedAppMenu({ title, items }: BorderedAppMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const position = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const settings = useSystemSettings();

  useEffect(() => {
    const rect = elementRef.current?.getBoundingClientRect();
    // TODO: Look into where this -12 comes from
    position.current = { x: (rect?.left ?? 0) - 12, y: rect?.height ?? 0 };
  }, [elementRef]);

  return (
    <div
      ref={elementRef}
      className="bordered-app-menu"
      onClick={() => setOpen(!open)}
    >
      <span className="bordered-app-menu__title">{title}</span>
      {open && (
        <BorderedAppMenuItems
          items={items}
          position={{ ...position.current }}
        />
      )}
    </div>
  );
}

export default BorderedAppMenu;
