import CalculatorLauncher from "../../programs/Calculator/CalculatorLauncher";
import FileBrowserLauncher from "../../programs/FileBrowser/FileBrowserLauncher";
import SettingsLauncher from "../../programs/Settings/SettingsLauncher";
import TextEditorLauncher from "../../programs/TextEditor/TextEditorLauncher";
import WebBrowserLauncher from "../../programs/WebBrowser/WebBrowserLauncher";
import useSystemSettings from "../../stores/systemSettingsStore";

import {
  StyledBottomBar,
  StyledContainer,
  StyledContents,
} from "./Styled.BottomBar";

interface BottomBarProps {}

// eslint-disable-next-line no-empty-pattern
function BottomBar({}: BottomBarProps) {
  const settings = useSystemSettings();
  return (
    <StyledContainer id="bottom-bar__container">
      <StyledBottomBar id="bottom-bar" backgroundColor={settings.mainColor}>
        <StyledContents id="bottom-bar__contents">
          <TextEditorLauncher />
          <CalculatorLauncher />
          <WebBrowserLauncher />
          <FileBrowserLauncher />
          <SettingsLauncher />
        </StyledContents>
      </StyledBottomBar>
    </StyledContainer>
  );
}

export default BottomBar;
