import useSystemSettings from "../../stores/systemSettingsStore";
import ClockMenu from "./ClockMenu";
import FocusedWindowMenu from "./FocusedWindowMenu";
import SystemTray from "./SystemTray";

import {
  StyledTopBar,
  StyledTopBarContainer,
  StyledTopBarContents,
} from "./Styled.TopBar";

interface TopBarProps {}

// eslint-disable-next-line no-empty-pattern
function TopBar({}: TopBarProps) {
  const settings = useSystemSettings();
  return (
    <StyledTopBarContainer id="top-bar__container">
      <StyledTopBar id="top-bar" backgroundColor={settings.mainColor}>
        <StyledTopBarContents id="top-bar__contents">
          <FocusedWindowMenu />
          <ClockMenu />
          <SystemTray />
        </StyledTopBarContents>
      </StyledTopBar>
    </StyledTopBarContainer>
  );
}

export default TopBar;
