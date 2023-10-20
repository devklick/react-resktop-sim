import { StyledBox } from "./styles";

interface BoxProps {
  flow?: "horizontal" | "vertical";
  gap?: number;
}

function Box({
  flow = "vertical",
  gap = 10,
  children,
}: React.PropsWithChildren<BoxProps>) {
  return (
    <StyledBox flow={flow} gap={gap}>
      {children}
    </StyledBox>
  );
}

export default Box;
