import styled from "@emotion/styled";
import { CSSProperties } from "react";

type Position = "left" | "centre" | "right";
interface StyledHeaderBarProps {
  backgroundColor: string;
  position?: Position;
  padVertical?: number;
  padHorizontal?: number;
  borderRadiusTop?: number;
  borderRadiusBottom?: number;
}
function getJustifyContent(
  position?: Position
): CSSProperties["justifyContent"] {
  switch (position) {
    case "left":
      return "flex-start";
    case "right":
      return "flex-end";
    case "centre":
    default:
      return "center";
  }
}

export const StyledHeaderBar = styled.div<StyledHeaderBarProps>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => getJustifyContent(props.position)};
  padding-top: ${(props) => props.padVertical}px;
  padding-bottom: ${(props) => props.padVertical}px;
  padding-left: ${(props) => props.padHorizontal}px;
  padding-right: ${(props) => props.padHorizontal}px;
  background-color: ${(props) => props.backgroundColor}px;
  border-top-left-radius: ${(props) => props.borderRadiusTop}px;
  border-top-right-radius: ${(props) => props.borderRadiusTop}px;
  border-bottom-left-radius: ${(props) => props.borderRadiusBottom}px;
  border-bottom-right-radius: ${(props) => props.borderRadiusBottom}px;
`;
