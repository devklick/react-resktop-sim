import TextEditor from "..";
import { BorderedAppMenuItemProps } from "../../../components/BorderedApp/BorderedAppMenu/BorderedAppMenu";
import Launcher from "../../../components/BottomBar/Launcher";
import "./TextEditorLauncher.scss";

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
    >
      <TextEditor />
    </Launcher>
  );
}

export default TextEditorLauncher;
