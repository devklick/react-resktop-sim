import useSystemSettings from "../../stores/systemSettingsStore";
import ClockMenu from "./ClockMenu";
import FocusedWindowMenu from "./FocusedWindowMenu";
import SystemTray from "./SystemTray";
import "./TopBar.scss";

interface TopBarProps {}

// eslint-disable-next-line no-empty-pattern
function TopBar({}: TopBarProps) {
  const settings = useSystemSettings();
  return (
    <div id="top-bar__container">
      <div id="top-bar" style={{ backgroundColor: settings.mainColor }}>
        <div id="top-bar__contents">
          <FocusedWindowMenu />
          <ClockMenu />
          <SystemTray />
        </div>
      </div>
    </div>
  );
}

export default TopBar;
