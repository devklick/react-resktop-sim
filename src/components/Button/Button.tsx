import "./Button.scss";

interface ButtonProps {
  name: string;
  onClick: () => void;
  width?: string | number;
}

function Button({ name, width = "100%", onClick }: ButtonProps) {
  return (
    <button style={{ width }} onClick={onClick}>
      {name}
    </button>
  );
}
export default Button;
