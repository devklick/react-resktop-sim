import styled from "@emotion/styled";

interface StyledRowProps {
  width?: string | number;
  gap?: number;
}
export const StyledRow = styled.div<StyledRowProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
  gap: ${(props) =>
    typeof props.gap === "number" ? `${props.gap}px` : props.gap};
`;
