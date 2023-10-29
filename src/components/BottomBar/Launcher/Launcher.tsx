import { useRef, useState } from "react";
import { v4 as uuid } from "uuid";

import useConditionalClick from "../../../hooks/useConditionalClick";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import BorderedApp from "../../BorderedApp";
import { Dimensions, Position } from "../../../hooks/useDragToResize";
import { MenuItemProps } from "../../MenuItems";

import { StyledIcon, StyledLauncher } from "./styles";
import ContextMenu from "../../ContextMenu";
interface LauncherProps {
  windowType: string;
  WindowTitle: string;
  windowId?: string;
  initialDimensions: Dimensions;
  menus?: Array<MenuItemProps>;
  appContent: JSX.Element;
  icon: string;
}

function Launcher({
  windowType,
  windowId,
  WindowTitle,
  initialDimensions,
  menus,
  appContent,
  icon,
}: React.PropsWithChildren<LauncherProps>) {
  const winMan = useWindowManagerStore();
  const ref = useRef<HTMLDivElement>(null);
  const [contextOpen, setContextOpen] = useState(false);

  function addWindow() {
    const id = windowId ?? uuid();
    const boundingRect = winMan.contentRef.current?.getBoundingClientRect();
    function getInitialPosition(axis: "x" | "y"): number {
      if (!boundingRect) return 0;
      const dimension = axis === "x" ? "width" : "height";
      return (
        (boundingRect[axis] ?? 0) +
        (boundingRect[dimension] ?? 0) / 2 -
        initialDimensions[dimension] / 2
      );
    }
    winMan.addWindow(windowType, id, {
      component: BorderedApp,
      props: {
        id,
        title: WindowTitle,
        type: windowType,
        initialDimensions,
        initialPosition: {
          x: getInitialPosition("x"),
          y: getInitialPosition("y"),
        },
        menus,
      },
      key: id,
      children: appContent,
    });
  }
  function onLeftClick() {
    // If there are one or more windows of this type open,
    // we want to focus them. This means revealing them if they
    // are minimized and bring them to the top of the window stack.
    if (winMan.windowsOfTypeExist(windowType)) {
      winMan.focusWindowsOfType(windowType);
      return;
    }

    // If there are no windows of this type, we want to add one.
    addWindow();
  }
  function onRightClick() {
    setContextOpen(true);
  }

  useConditionalClick({
    mouseButton: "left",
    elementRef: ref,
    clickHandler: onLeftClick,
  });

  useConditionalClick({
    mouseButton: "right",
    elementRef: ref,
    clickHandler: onRightClick,
  });

  function getContextMenu() {
    const items: Array<MenuItemProps> = [
      {
        title: "New Window",
        action: () => {
          addWindow();
          setContextOpen(false);
        },
      },
      {
        title: "Change Icon",
        action: () => {},
      },
    ];
    return (
      <ContextMenu
        close={() => setContextOpen(false)}
        items={items}
        position={getContextPosition(items.length)}
      />
    );
  }
  function getContextPosition(numberOfItems: number): Position {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: rect.x,
      y: rect.y - 20 - numberOfItems * 30,
    };
  }
  return (
    <>
      {contextOpen && getContextMenu()}
      <StyledLauncher ref={ref} tabIndex={1} className="launcher">
        <StyledIcon
          src={icon}
          className="launcher-icon"
          alt={windowType}
        ></StyledIcon>
      </StyledLauncher>
    </>
  );
}

export default Launcher;
