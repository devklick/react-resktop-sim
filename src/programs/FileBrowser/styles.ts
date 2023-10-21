import styled from "@emotion/styled";

export const StyledFileBrowser = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-rows: 50px auto 25px;
  grid-template-areas:
    "top-bar top-bar"
    "side-bar main-content"
    "side-bar bottom-bar";

  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  border-radius: 10px;
`;

export const StyledTopBar = styled.div`
  grid-area: top-bar;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 10px;
  padding: 10px;
  align-items: center;
`;

export const StyledTopBarButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const StyledTopBarButton = styled.div`
  width: 50px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
  &:hover {
    backdrop-filter: brightness(150%);
    transition: ease-in 0.2s;
  }
  &:active {
    box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5) inset;
  }
`;

export const StyledTopBarPath = styled.input`
  height: 30px;
  width: 100%;
  padding: 5px 10px;
  border-radius: 50px;
  border: none;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
  }
`;

export const StyledBottomBar = styled.div`
  grid-area: bottom-bar;
  width: 100%;
  height: 100%;
`;
