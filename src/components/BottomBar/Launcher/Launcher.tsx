import { useRef } from "react";
import useConditionalClick from "../../../hooks/useConditionalClick";
import "./Launcher.scss";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import { v4 as uuid } from "uuid";
import BorderedApp from "../../BorderedApp";
import { Dimensions } from "../../../hooks/useDragToResize";
import { BorderedAppMenuProps } from "../../BorderedApp/BorderedAppMenu";
import { BorderedAppMenuItemProps } from "../../BorderedApp/BorderedAppMenu/BorderedAppMenu";

interface LauncherProps {
  windowType: string;
  WindowTitle: string;
  windowId?: string;
  initialDimensions: Dimensions;
  menus?: Array<BorderedAppMenuItemProps>;
}

// eslint-disable-next-line no-empty-pattern
function Launcher({
  windowType,
  windowId,
  WindowTitle,
  children,
  initialDimensions,
  menus,
}: React.PropsWithChildren<LauncherProps>) {
  const winMan = useWindowManagerStore();
  const ref = useRef<HTMLDivElement>(null);

  function onLeftClick() {
    const id = windowId ?? uuid();
    winMan.addWindow(
      windowType,
      id,
      <BorderedApp
        id={id}
        title={WindowTitle}
        type={windowType}
        initialDimensions={initialDimensions}
        menus={menus}
      >
        {children}
      </BorderedApp>
    );
  }
  function onRightClick() {
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
      {windowType}
    </div>
  );
}

export default Launcher;
