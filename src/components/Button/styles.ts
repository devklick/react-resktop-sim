import styled from "@emotion/styled";

export const StyledButton = styled.button<{ width: string | number }>`
  width: ${(props) =>
    typeof props.width === "string" ? props.width : `${props.width}px`};
`;
