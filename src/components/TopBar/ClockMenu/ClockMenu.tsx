import useDateTime from "../../../hooks/useDateTime";

import { StyledClockMenu, StyledTimeContainer } from "./Styled.ClockMenu";

interface ClockMenuProps {}

// eslint-disable-next-line no-empty-pattern
function ClockMenu({}: ClockMenuProps) {
  const dateTime = useDateTime({
    tickFrequency: 1,
    tickFrequencyUnit: "minute",
    template: "hh:mm",
  });

  return (
    <StyledClockMenu id="clock-menu">
      <StyledTimeContainer id="clock-menu__time-container">
        <span id="clock-menu__time">{dateTime.formatted}</span>
      </StyledTimeContainer>
    </StyledClockMenu>
  );
}

export default ClockMenu;
