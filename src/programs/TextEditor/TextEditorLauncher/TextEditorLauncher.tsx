import TextEditor from "..";
import { BorderedAppMenuItemProps } from "../../../components/BorderedApp/BorderedAppMenu/BorderedAppMenu";
import Launcher from "../../../components/BottomBar/Launcher";
import "./TextEditorLauncher.scss";
// import { ReactComponent as Icon } from "./text-editor-launcher-icon.svg";
import icon from "./text-editor-launcher-icon.svg";

const windowType = "text-editor";

interface TextEditorLauncherProps {}

const menus: BorderedAppMenuItemProps[] = [
  {
    title: "File",
    items: [
      {
        title: "Save",
        items: [
          {
            title: "Really save?",
          },
        ],
      },
      {
        title: "Load",
        items: [
          {
            title: "Really load?",
            items: [
              {
                title: "REALLY LOAD???",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Edit",
    items: [
      {
        title: "Preferences",
        items: [
          {
            title: "Spacing",
          },
        ],
      },
      {
        title: "Document",
      },
    ],
  },
];

// eslint-disable-next-line no-empty-pattern
function TextEditorLauncher({}: TextEditorLauncherProps) {
  return (
    <Launcher
      windowType={windowType}
      WindowTitle="Text Editor"
      initialDimensions={{ height: 500, width: 500 }}
      menus={menus}
      appContent={<TextEditor />}
      icon={icon}
    >
      {/* <Icon style={{ width: "100%", height: "100%" }} /> */}
    </Launcher>
  );
}

export default TextEditorLauncher;
