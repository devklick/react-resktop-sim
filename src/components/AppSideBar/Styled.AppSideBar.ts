import styled from "@emotion/styled";

export const StyledSideBar = styled.div`
  grid-area: side-bar;
  width: 100%;
  height: 100%;
`;

export const StyledItemContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

export const StyledItem = styled.div`
  border-radius: 10px;
  padding: 6px 10px;
  box-sizing: border-box;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 0);
  &:hover {
    backdrop-filter: brightness(150%);
    transition: ease-in 0.2s;
  }
  &:active {
    box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5) inset;
  }
`;
