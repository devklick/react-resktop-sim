import styled from "@emotion/styled";

export const StyledLauncher = styled.div`
  min-width: 0;
  height: 100% !important;
  aspect-ratio: 1/1;
  background-color: white;
  border-radius: 50%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  justify-content: center;
  vertical-align: middle;
  box-shadow: 0px -2px 10px 1px rgb(0, 0, 0, 0.5);
  transform: scale(1);
  transition: all 0.2s ease;
  &:hover {
    box-shadow: 0px 0px 10px 5px rgb(0, 0, 0, 0.5);
    transform: scale(1.3);
    transition: all 0.2s ease;
  }
`;

export const StyledIcon = styled.img`
  width: 100%;
  height: 100%;
`;
