import styled from "@emotion/styled";

export const StyledTopBarContainer = styled.div`
  grid-area: top-bar;
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-bottom: 0;
  box-sizing: border-box;
`;

export const StyledTopBar = styled.div<{ backgroundColor: string }>`
  height: 100%;
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 -2px 10px 1px #11172b, 0 -2px 3px #bebebe inset;
  background-color: ${(props) => props.backgroundColor};
`;

export const StyledTopBarContents = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 100%;
  grid-template-areas: "focused-window-menu clock-menu system-tray";
  padding: 0 16px;
  box-sizing: border-box;
`;
