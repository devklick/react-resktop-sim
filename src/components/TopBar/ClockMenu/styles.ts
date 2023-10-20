import styled from "@emotion/styled";

export const StyledClockMenu = styled.div`
  grid-area: clock-menu;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &:hover {
    backdrop-filter: brightness(150%);
    border-radius: 50px;
    transition: ease 0.2s;
  }
`;

export const StyledTimeContainer = styled.div`
  padding: 0 10px;
`;
