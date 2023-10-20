import { StyledPowerIcon, StyledPowerMenu } from "./styles";

interface PowerMenuProps {}

// eslint-disable-next-line no-empty-pattern
function PowerMenu({}: PowerMenuProps) {
  return (
    <StyledPowerMenu id="power-menu">
      <StyledPowerIcon />
    </StyledPowerMenu>
  );
}

export default PowerMenu;
