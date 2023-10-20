import { StyledButton } from "./styles";

interface ButtonProps {
  name: string;
  onClick: () => void;
  width?: string | number;
}

function Button({ name, width = "100%", onClick }: ButtonProps) {
  return (
    <StyledButton width={width} onClick={onClick}>
      {name}
    </StyledButton>
  );
}
export default Button;
