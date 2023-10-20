import PowerMenu from "./PowerMenu";
import { StyledSystemTray } from "./Styled.SystemTray";

interface SystemTrayProps {}

// eslint-disable-next-line no-empty-pattern
function SystemTray({}: SystemTrayProps) {
  return (
    <StyledSystemTray id="system-tray">
      <PowerMenu />
    </StyledSystemTray>
  );
}

export default SystemTray;
