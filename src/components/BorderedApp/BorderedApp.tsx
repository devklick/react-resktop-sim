import React, { useRef } from "react";
import useDragToMove from "../../hooks/useDragToMove";
import useWindowManagerStore from "../../stores/windowManagerStore";

import "./BorderedApp.scss";
import useDragToResize, { Dimensions } from "../../hooks/useDragToResize";

interface BorderedAppProps {
  title: string;
  type: string;
  id: string;
  initialDimensions: Dimensions;
  maxDimensions?: Dimensions;
  minDimensions?: Dimensions;
}

function BorderedApp({
  title,
  type,
  id,
  children,
  initialDimensions,
  minDimensions = { height: 350, width: 350 },
}: React.PropsWithChildren<BorderedAppProps>) {
  const winMan = useWindowManagerStore();
  const appRef = useRef<HTMLDivElement>(null);
  const resizeNRef = useRef<HTMLDivElement>(null);
  const resizeERef = useRef<HTMLDivElement>(null);
  const resizeSRef = useRef<HTMLDivElement>(null);
  const resizeWRef = useRef<HTMLDivElement>(null);

  useDragToResize({
    elementRef: appRef,
    resizeERef,
    resizeNRef,
    resizeSRef,
    resizeWRef,
    minDimensions,
  });

  const [clickRef] = useDragToMove({
    moveRef: appRef,
  });

  function onClickClose() {
    winMan.closeWindow(type, id);
  }

  return (
    <div
      className="bordered-app"
      ref={appRef}
      style={{
        width: initialDimensions.width,
        height: initialDimensions.height,
      }}
    >
      <div className="bordered-app__corner-nw" />
      <div className="bordered-app__edge-n" ref={resizeNRef} />
      <div className="bordered-app__corner-ne" />
      <div className="bordered-app__edge-e" ref={resizeERef} />
      <div className="bordered-app__title-bar" ref={clickRef}>
        <div className="bordered-app__window-menus-wrapper">
          <div className="bordered-app__window-menus">
            <div className="bordered-app__window-menu file">File</div>
            <div className="bordered-app__window-menu file">Edit</div>
            <div className="bordered-app__window-menu file">Help</div>
          </div>
        </div>
        <div className="bordered-app__title-wrapper">
          <div className="bordered-app__title">{title}</div>
        </div>
        <div className="bordered-app__window-buttons-wrapper">
          <div className="bordered-app__window-buttons">
            <div className="bordered-app__window-button minimize">-</div>
            <div className="bordered-app__window-button maximize">+</div>
            <div
              className="bordered-app__window-button close"
              onClick={onClickClose}
            >
              x
            </div>
          </div>
        </div>
      </div>
      <div className="bordered-app__content">{children}</div>
      <div className="bordered-app__corner-sw" />
      <div className="bordered-app__edge-s" ref={resizeSRef} />
      <div className="bordered-app__corner-se" />
      <div className="bordered-app__edge-w" ref={resizeWRef} />
    </div>
  );
}

export default BorderedApp;
