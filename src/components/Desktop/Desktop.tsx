import TopBar from "../TopBar";
import Content from "../Content";
import BottomBar from "../BottomBar";
import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledBackground, StyledDesktop } from "./Styled.Desktop";

interface DesktopProps {}

// eslint-disable-next-line no-empty-pattern
function Desktop({}: DesktopProps) {
  const settings = useSystemSettings();
  return (
    <StyledDesktop id="desktop">
      <StyledBackground id="background" backgroundUrl={settings.background} />
      <TopBar />
      <Content />
      <BottomBar />
    </StyledDesktop>
  );
}

export default Desktop;
