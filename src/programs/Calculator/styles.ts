import styled from "@emotion/styled";

export const StyledCalc = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr 3fr;
  grid-template-areas:
    "input"
    "output"
    "buttons";
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  padding: 10px;
  border-radius: 10px;
  box-sizing: border-box;
  gap: 10px;
`;

export const StyledInputOutput = styled.div<{
  direction: "input" | "output";
}>`
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  font-size: ${(props) => (props.direction === "input" ? 22 : 18)}px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  grid-area: ${(props) => props.direction};
`;

export const StyledInputOutputContents = styled.div`
  text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
`;

export const StyledButtons = styled.div`
  min-height: 0;
  grid-area: buttons;
  width: 100%;
  height: 100%;
  justify-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  box-sizing: border-box;
`;

export const StyledButton = styled.button`
  text-align: center;
  cursor: default;
  border-radius: 20px;
  justify-self: center;
  width: 80%;
  height: 80%;
  box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  color: inherit;
  border: none;

  &:hover {
    backdrop-filter: brightness(150%);
    transition: ease-in 0.2s;
  }
  &:active {
    box-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5) inset;
  }
`;

export const StyledButtonContent = styled.span``;
