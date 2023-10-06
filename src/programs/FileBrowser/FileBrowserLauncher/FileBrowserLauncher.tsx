import FileBrowser from "..";
import Launcher from "../../../components/BottomBar/Launcher";
import "./FileBrowserLauncher.scss";

interface FileBrowserLauncherProps {}

// eslint-disable-next-line no-empty-pattern
function FileBrowserLauncher({}: FileBrowserLauncherProps) {
  return (
    <Launcher
      windowType={"file-browser"}
      WindowTitle="File Browser"
      initialDimensions={{ height: 500, width: 500 }}
      menus={[]}
      appContent={<FileBrowser />}
      icon=""
    ></Launcher>
  );
}

export default FileBrowserLauncher;
