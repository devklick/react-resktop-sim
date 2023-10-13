import TopBar from "../TopBar";
import Content from "../Content";
import BottomBar from "../BottomBar";
import useSystemSettings from "../../stores/systemSettingsStore";

import "./Desktop.scss";

interface DesktopProps {}

// eslint-disable-next-line no-empty-pattern
function Desktop({}: DesktopProps) {
  const settings = useSystemSettings();
  return (
    <div id="desktop" style={{ color: settings.fontColor }}>
      <div
        id="desktop__background"
        style={{
          backgroundImage: `url(${settings.background})`,
        }}
      />
      <TopBar />
      <Content />
      <BottomBar />
    </div>
  );
}

export default Desktop;
