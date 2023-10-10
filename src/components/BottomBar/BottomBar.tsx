import CalculatorLauncher from "../../programs/Calculator/CalculatorLauncher";
import FileBrowserLauncher from "../../programs/FileBrowser/FileBrowserLauncher";
import SettingsLauncher from "../../programs/Settings/SettingsLauncher";
import TextEditorLauncher from "../../programs/TextEditor/TextEditorLauncher";
import WebBrowserLauncher from "../../programs/WebBrowser/WebBrowserLauncher";
import useSystemSettings from "../../stores/systemSettingsStore";

import "./BottomBar.scss";

interface BottomBarProps {}

// eslint-disable-next-line no-empty-pattern
function BottomBar({}: BottomBarProps) {
  const settings = useSystemSettings();
  return (
    <div id="bottom-bar__container">
      <div id="bottom-bar" style={{ backgroundColor: settings.mainColor }}>
        <div id="bottom-bar__contents">
          <TextEditorLauncher />
          <CalculatorLauncher />
          <WebBrowserLauncher />
          <FileBrowserLauncher />
          <SettingsLauncher />
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
