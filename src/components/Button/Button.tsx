import { StyledButton } from "./styles";

interface ButtonProps {
  name: string;
  onClick: () => void;
  width?: string | number;
  disabled?: boolean;
}

function Button({
  name,
  width = "100%",
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <StyledButton width={width} onClick={onClick} disabled={disabled}>
      {name}
    </StyledButton>
  );
}
export default Button;
