import { StyledRow } from "./styles";

interface RowProps {
  gap?: number;
  width?: string | number;
}

function Row({
  gap = 10,
  width = "100%",
  children,
}: React.PropsWithChildren<RowProps>) {
  return (
    <StyledRow width={width} gap={gap}>
      {children}
    </StyledRow>
  );
}

export default Row;
