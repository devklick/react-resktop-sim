import styled from "@emotion/styled";

export const StyledContainer = styled.div`
  min-height: 0;
  min-width: 0;
  grid-area: bottom-bar;
  width: 100%;
  height: 100%;
  padding: 10px;
  padding-top: 0;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;

export const StyledBottomBar = styled.div<{ backgroundColor: string }>`
  height: 100%;
  width: 100%;
  display: flex;
  background-color: var(--ui-color-primary);
  border-radius: 50px;
  background-color: #2e3440;
  box-shadow: 0 -2px 10px 1px #11172b, 0 -2px 3px #bebebe inset;
  background-color: ${(props) => props.backgroundColor};
`;

export const StyledContents = styled.div`
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  height: 100%;
`;
