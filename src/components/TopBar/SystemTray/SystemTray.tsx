import PowerMenu from "./PowerMenu";
import "./SystemTray.scss";

interface SystemTrayProps {}

// eslint-disable-next-line no-empty-pattern
function SystemTray({}: SystemTrayProps) {
  return (
    <div id="system-tray">
      <PowerMenu />
    </div>
  );
}

export default SystemTray;
