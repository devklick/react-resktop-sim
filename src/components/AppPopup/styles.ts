import styled from "@emotion/styled";
import { Rect } from "../../hooks/useDragToResize";

export const StyledPopup = styled.div<Rect>`
  backdrop-filter: brightness(80%);
  position: fixed;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const StyledContent = styled.div<{ backgroundColor: string }>`
  width: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 40px rgb(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: ${(props) => props.backgroundColor};
`;
