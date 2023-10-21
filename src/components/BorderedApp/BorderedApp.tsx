import React, { useRef } from "react";
import useWindowManagerStore, {
  BaseProps,
} from "../../stores/windowManagerStore";
import { Dimensions, Position } from "../../hooks/useDragToResize";
import BorderedAppMenu from "./BorderedAppMenu/BorderedAppMenu";
import usePositionableElement from "../../hooks/usePositionableElement";
import useSystemSettings from "../../stores/systemSettingsStore";
import { MenuItemProps } from "../MenuItems";

import {
  StyledBorderedApp,
  StyledCorner,
  StyledContent,
  StyledEdge,
  StyledTitleBar,
  StyledTitleWrapper,
  StyledWindowButton,
  StyledWindowButtons,
  StyledWindowButtonsWrapper,
  StyledWindowMenus,
  StyledWindowMenusWrapper,
} from "./styles";

interface BorderedAppProps extends BaseProps {
  title: string;
  type: string;
  id: string;
  initialDimensions: Dimensions;
  initialPosition: Position;
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
  initialPosition,
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
    initialPosition,
    windowType: type,
    windowId: id,
  });

  function onClickClose() {
    winMan.closeWindow(type, id);
  }
  console.log("Bordered app, hidden", String(hidden));

  return (
    <StyledBorderedApp
      ref={appRef}
      onMouseDown={() => winMan.focusWindow(type, id)}
      initialDimensions={initialDimensions}
      initialPosition={initialPosition}
      zIndex={zIndex}
      backgroundColor={settings.mainColor}
      display={hidden === true ? "none" : "grid"}
    >
      <StyledCorner location="nw" ref={resizeHandleNW} />
      <StyledEdge location="n" ref={resizeHandleN} />
      <StyledCorner location="ne" ref={resizeHandleNE} />
      <StyledEdge location="e" ref={resizeHandleE} />
      <StyledTitleBar
        className="drag-to-move"
        ref={moveHandle}
        onDoubleClick={maximize}
      >
        <StyledWindowMenusWrapper className="drag-to-move">
          <StyledWindowMenus className="drag-to-move">
            {menus?.map((m) => (
              <BorderedAppMenu
                appRef={appRef}
                title={m.title}
                items={m.items ?? []}
                key={m.title}
              />
            ))}
          </StyledWindowMenus>
        </StyledWindowMenusWrapper>
        <StyledTitleWrapper className="drag-to-move">
          <span className="drag-to-move">{title}</span>
        </StyledTitleWrapper>
        <StyledWindowButtonsWrapper className="drag-to-move">
          <StyledWindowButtons>
            <StyledWindowButton
              buttonType="min"
              onClick={minimize}
            ></StyledWindowButton>
            <StyledWindowButton
              buttonType="max"
              onClick={maximize}
            ></StyledWindowButton>
            <StyledWindowButton
              buttonType="close"
              onClick={onClickClose}
            ></StyledWindowButton>
          </StyledWindowButtons>
        </StyledWindowButtonsWrapper>
      </StyledTitleBar>
      <StyledContent>{children}</StyledContent>
      <StyledCorner location="sw" ref={resizeHandleSW} />
      <StyledEdge location="s" ref={resizeHandleS} />
      <StyledCorner location="se" ref={resizeHandleSE} />
      <StyledEdge location="w" ref={resizeHandleW} />
    </StyledBorderedApp>
  );
}

export default BorderedApp;
