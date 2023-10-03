import TextEditor from "..";
import Launcher from "../../../components/BottomBar/Launcher";
import "./TextEditorLauncher.scss";

const windowType = "text-editor";

interface TextEditorLauncherProps {}

// eslint-disable-next-line no-empty-pattern
function TextEditorLauncher({}: TextEditorLauncherProps) {
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Text Editor"
      initialDimensions={{ height: 500, width: 500 }}
    >
      <TextEditor />
    </Launcher>
  );
}

export default TextEditorLauncher;
