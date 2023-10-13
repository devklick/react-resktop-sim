import TextEditor from "..";
import Launcher from "../../../components/BottomBar/Launcher";
import { MenuItemProps } from "../../../components/MenuItems";
import "./TextEditorLauncher.scss";
import icon from "./text-editor-launcher-icon.svg";

const windowType = "text-editor";

interface TextEditorLauncherProps {}

const menus: MenuItemProps[] = [
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
