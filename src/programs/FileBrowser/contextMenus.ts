import { MenuItemProps } from "../../components/MenuItems";
import { FSObjectType } from "../../stores/localFS";

export function getMainContentContextItems(
  setShowPrompt: (type: FSObjectType) => void,
  setContextMenuOpen: (open: boolean) => void
): Array<MenuItemProps> {
  return [
    {
      title: "Create Directory",
      action: () => {
        setShowPrompt("directory");
        setContextMenuOpen(false);
      },
    },
    {
      title: "Create File",
      action: () => {
        setShowPrompt("file");
        setContextMenuOpen(false);
      },
    },
    {
      title: "Open in Terminal",
    },
  ];
}
