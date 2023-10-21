import styled from "@emotion/styled";

export const StyledTextEditor = styled.div`
  height: 100%;
  width: 100%;
`;

export const StyledTextArea = styled.textarea<{ selectedColor: string }>`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: white;
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  border-radius: 10px;
  padding: 10px;
  box-sizing: border-box;

  &:focus-visible {
    outline: none;
  }

  ::selection {
    background-color: ${(props) => props.selectedColor};
  }
`;
