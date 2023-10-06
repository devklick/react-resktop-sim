import CalculatorLauncher from "../../programs/Calculator/CalculatorLauncher";
import FileBrowserLauncher from "../../programs/FileBrowser/FileBrowserLauncher";
import TextEditorLauncher from "../../programs/TextEditor/TextEditorLauncher";
import WebBrowserLauncher from "../../programs/WebBrowser/WebBrowserLauncher";

import "./BottomBar.scss";

interface BottomBarProps {}

// eslint-disable-next-line no-empty-pattern
function BottomBar({}: BottomBarProps) {
  return (
    <div id="bottom-bar__container">
      <div id="bottom-bar">
        <div id="bottom-bar__contents">
          <TextEditorLauncher />
          <CalculatorLauncher />
          <WebBrowserLauncher />
          <FileBrowserLauncher />
        </div>
      </div>
    </div>
  );
}

export default BottomBar;
