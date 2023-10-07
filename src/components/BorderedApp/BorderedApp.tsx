import React, { useRef } from "react";
import useDragToMove from "../../hooks/useDragToMove";
import useWindowManagerStore from "../../stores/windowManagerStore";

import "./BorderedApp.scss";
import useDragToResize, { Dimensions } from "../../hooks/useDragToResize";
import BorderedAppMenu, {
  BorderedAppMenuItemProps,
} from "./BorderedAppMenu/BorderedAppMenu";

interface BorderedAppProps {
  title: string;
  type: string;
  id: string;
  initialDimensions: Dimensions;
  maxDimensions?: Dimensions;
  minDimensions?: Dimensions;
  menus?: Array<BorderedAppMenuItemProps>;
}

function BorderedApp({
  title,
  type,
  id,
  children,
  initialDimensions,
  minDimensions = { height: 350, width: 350 },
  menus,
}: React.PropsWithChildren<BorderedAppProps>) {
  const winMan = useWindowManagerStore();

  // Need a ref to point to the app for moving it around the screen
  const appRef = useRef<HTMLDivElement>(null);

  // Need a ref for each of the cardinal (n,e,s,w)
  // and ordinal (ne, se, sw, nw) directions. These represent
  // the edges and corners of the app and are used for resizing it
  const resizeNRef = useRef<HTMLDivElement>(null);
  const resizeERef = useRef<HTMLDivElement>(null);
  const resizeSRef = useRef<HTMLDivElement>(null);
  const resizeWRef = useRef<HTMLDivElement>(null);
  const resizeNERef = useRef<HTMLDivElement>(null);
  const resizeNWRef = useRef<HTMLDivElement>(null);
  const resizeSERef = useRef<HTMLDivElement>(null);
  const resizeSWRef = useRef<HTMLDivElement>(null);

  useDragToResize({
    elementRef: appRef,
    resizeERef,
    resizeNRef,
    resizeSRef,
    resizeWRef,
    resizeNERef,
    resizeNWRef,
    resizeSERef,
    resizeSWRef,
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
      <div className="bordered-app__corner-nw" ref={resizeNWRef} />
      <div className="bordered-app__edge-n" ref={resizeNRef} />
      <div className="bordered-app__corner-ne" ref={resizeNERef} />
      <div className="bordered-app__edge-e" ref={resizeERef} />
      <div className="bordered-app__title-bar" ref={clickRef}>
        <div className="bordered-app__window-menus-wrapper">
          <div className="bordered-app__window-menus">
            {menus?.map((m) => (
              <BorderedAppMenu title={m.title} items={m.items ?? []} />
            ))}
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
      <div className="bordered-app__corner-sw" ref={resizeSWRef} />
      <div className="bordered-app__edge-s" ref={resizeSRef} />
      <div className="bordered-app__corner-se" ref={resizeSERef} />
      <div className="bordered-app__edge-w" ref={resizeWRef} />
    </div>
  );
}

export default BorderedApp;
