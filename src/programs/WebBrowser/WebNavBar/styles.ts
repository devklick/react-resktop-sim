import styled from "@emotion/styled";

export const StyledUrlBar = styled.div<{
  backgroundColor: string;
  fontColor: string;
}>`
  width: 100%;
  height: 40px;
  display: flex;
  padding: 6px 0;
  gap: 6px;
  box-sizing: border-box;
  flex-direction: row;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
`;

export const StyledNavButton = styled.button`
  height: 100%;
  aspect-ratio: 1/1;
  margin: 0;
  border: none;
  padding: 0 !important;
  background-color: inherit;
  color: inherit;
  border-radius: 4px;
  :hover {
    filter: brightness(150%);
    transition: ease-in 0.2s;
  }
`;

export const StyledUrlInput = styled.input`
  background-color: inherit;
  color: inherit;
  outline: none;
  margin: 0;
  padding: 0 4px;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 4px;
  :hover {
    filter: brightness(150%);
    transition: ease-in 0.2s;
  }
`;
