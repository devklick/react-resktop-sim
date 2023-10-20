import styled from "@emotion/styled";

interface StyledMenuItemsProps {
  position: "relative" | "absolute";
  left: number;
  top: number;
  backgroundColor: string;
}

export const StyledItems = styled.div<StyledMenuItemsProps>`
  width: auto;
  white-space: nowrap;
  box-sizing: border-box;
  box-shadow: 0 0 2px rgb(0, 0, 0, 0.5);
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  background-color: ${(props) => props.backgroundColor};
  position: ${(props) => props.position};
`;

export const StyledItemsContent = styled.div`
  box-sizing: border-box;
`;

export const StyledMenuItem = styled.div`
  padding: 5px 12px;
  height: 20px;
`;
