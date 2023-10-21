import Launcher from "../../../components/BottomBar/Launcher";
import WebBrowser from "../WebBrowser";

interface WebBrowserLauncherProps {}

const windowType = "web-browser";

// eslint-disable-next-line no-empty-pattern
function WebBrowserLauncher({}: WebBrowserLauncherProps) {
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Web Browser"
      initialDimensions={{ height: 400, width: 400 }}
      appContent={<WebBrowser />}
      icon=""
      menus={[]}
    ></Launcher>
  );
}

export default WebBrowserLauncher;
