import { useRef } from "react";
import { v4 as uuid } from "uuid";

import useConditionalClick from "../../../hooks/useConditionalClick";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import BorderedApp from "../../BorderedApp";
import { Dimensions } from "../../../hooks/useDragToResize";
import { MenuItemProps } from "../../MenuItems";

import "./Launcher.scss";
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

  function addWindow() {
    const id = windowId ?? uuid();
    winMan.addWindow(windowType, id, {
      component: BorderedApp,
      props: {
        id,
        title: WindowTitle,
        type: windowType,
        initialDimensions,
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
    // TODO: Display a context menu with various options that are
    // specified by the program-specific launcher and passed via props.
    // This will include things like "open new window", "close windows", etc.
    console.log("right clicked");
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

  return (
    <div ref={ref} tabIndex={1} className="launcher">
      <img src={icon} className="launcher-icon" alt={windowType}></img>
    </div>
  );
}

export default Launcher;
