import { useRef } from "react";
import useConditionalClick from "../../../hooks/useConditionalClick";
import "./Launcher.scss";
import useWindowManagerStore from "../../../stores/windowManagerStore";
import { v4 as uuid } from "uuid";
import BorderedApp from "../../BorderedApp";
import { Dimensions } from "../../../hooks/useDragToResize";
import { BorderedAppMenuItemProps } from "../../BorderedApp/BorderedAppMenu/BorderedAppMenu";

interface LauncherProps {
  windowType: string;
  WindowTitle: string;
  windowId?: string;
  initialDimensions: Dimensions;
  menus?: Array<BorderedAppMenuItemProps>;
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
        key={id}
      >
        {appContent}
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
      <img src={icon} className="launcher-icon" alt={windowType}></img>
    </div>
  );
}

export default Launcher;
