import { StyledPowerIcon, StyledPowerMenu } from "./Styled.PowerMenu";

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
