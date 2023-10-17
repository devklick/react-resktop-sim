import React, { useRef } from "react";
import useWindowManagerStore, {
  BaseProps,
} from "../../stores/windowManagerStore";
import { Dimensions } from "../../hooks/useDragToResize";
import BorderedAppMenu from "./BorderedAppMenu/BorderedAppMenu";
import usePositionableElement from "../../hooks/usePositionableElement";
import useSystemSettings from "../../stores/systemSettingsStore";
import { MenuItemProps } from "../MenuItems";

import "./BorderedApp.scss";

interface BorderedAppProps extends BaseProps {
  title: string;
  type: string;
  id: string;
  initialDimensions: Dimensions;
  maxDimensions?: Dimensions;
  minDimensions?: Dimensions;
  menus?: Array<MenuItemProps>;
}

function BorderedApp({
  title,
  type,
  id,
  children,
  initialDimensions,
  minDimensions = { height: 350, width: 350 },
  menus,
  zIndex,
  hidden,
}: React.PropsWithChildren<BorderedAppProps>) {
  const winMan = useWindowManagerStore();
  const settings = useSystemSettings();

  // Need a ref to point to the app for moving it around the screen
  const appRef = useRef<HTMLDivElement>(null);

  const {
    resizeHandleN,
    resizeHandleNE,
    resizeHandleE,
    resizeHandleSE,
    resizeHandleS,
    resizeHandleSW,
    resizeHandleW,
    resizeHandleNW,
    moveHandle,
    maximize,
    minimize,
  } = usePositionableElement({
    elementRef: appRef,
    minDimensions,
    windowType: type,
    windowId: id,
  });

  function onClickClose() {
    winMan.closeWindow(type, id);
  }

  return (
    <div
      className="bordered-app"
      ref={appRef}
      onMouseDown={() => winMan.focusWindow(type, id)}
      style={{
        width: initialDimensions.width,
        height: initialDimensions.height,
        zIndex,
        backgroundColor: settings.mainColor,
        display: hidden === true ? "none" : "grid",
      }}
    >
      <div className="bordered-app__corner-nw" ref={resizeHandleNW} />
      <div className="bordered-app__edge-n" ref={resizeHandleN} />
      <div className="bordered-app__corner-ne" ref={resizeHandleNE} />
      <div className="bordered-app__edge-e" ref={resizeHandleE} />
      <div
        className="bordered-app__title-bar drag-to-move"
        ref={moveHandle}
        onDoubleClick={maximize}
      >
        <div className="bordered-app__window-menus-wrapper drag-to-move">
          <div className="bordered-app__window-menus drag-to-move">
            {menus?.map((m) => (
              <BorderedAppMenu
                title={m.title}
                items={m.items ?? []}
                key={m.title}
              />
            ))}
          </div>
        </div>
        <div className="bordered-app__title-wrapper drag-to-move">
          <div className="bordered-app__title drag-to-move">{title}</div>
        </div>
        <div className="bordered-app__window-buttons-wrapper drag-to-move">
          <div className="bordered-app__window-buttons">
            <div
              className="bordered-app__window-button minimize"
              onClick={minimize}
            ></div>
            <div
              className="bordered-app__window-button maximize"
              onClick={maximize}
            ></div>
            <div
              className="bordered-app__window-button close"
              onClick={onClickClose}
            ></div>
          </div>
        </div>
      </div>
      <div className="bordered-app__content">{children}</div>
      <div className="bordered-app__corner-sw" ref={resizeHandleSW} />
      <div className="bordered-app__edge-s" ref={resizeHandleS} />
      <div className="bordered-app__corner-se" ref={resizeHandleSE} />
      <div className="bordered-app__edge-w" ref={resizeHandleW} />
    </div>
  );
}

export default BorderedApp;
