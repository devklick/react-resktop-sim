import styled from "@emotion/styled";

interface StyledBoxProps {
  flow?: "horizontal" | "vertical";
  gap?: number;
}

export const StyledBox = styled.div<StyledBoxProps>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.flow == "horizontal" ? "row" : "column")};
  gap: ${(props) => props.gap}px;
  padding: ${(props) => props.gap}px;
  box-sizing: border-box;
`;
