import styled from "@emotion/styled";

export const StyledTabBar = styled.div<{ backgroundColor: string }>`
  height: 40px;
  padding: 4px;
  gap: 4px;
  box-sizing: border-box;
  display: flex;
  /* background-color: ${(props) => props.backgroundColor}; */
  background-color: transparent;
`;

export const StyledTab = styled.div<{
  active: boolean;
  backgroundColor: string;
}>`
  height: 100%;
  width: 100px;
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: inherit;
  border: none;
  &:hover {
    filter: brightness(${(props) => (props.active ? "100%" : "150%")});
    transition: ease-in 0.2s;
  }
  &:active {
    box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5) inset;
  }
`;

export const StyledNewTabButton = styled.button`
  height: 100%;
  width: auto;
  aspect-ratio: 1/1;
  border-radius: 10px;
  background-color: inherit;
  border: none;
  display: flex;
  color: inherit;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 0);
  &:hover {
    backdrop-filter: brightness(150%);
    transition: ease-in 0.2s;
  }
  &:active {
    box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5) inset;
  }
`;
