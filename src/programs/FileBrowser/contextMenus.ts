import { MenuItemProps } from "../../components/MenuItems";
import { FSObjectType } from "../../stores/localFS";

export type ContextMenuAction = "delete" | "rename";

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

export function getFSObjectContextMenu(
  fsObjectType: FSObjectType,
  setContextAction: (action: ContextMenuAction) => void,
  setContextMenuOpen: (open: boolean) => void
): Array<MenuItemProps> {
  switch (fsObjectType) {
    case "file":
      return getFSFileContextMenu(setContextAction, setContextMenuOpen);
    case "directory":
      return getFSDirectoryContextMenu(setContextAction, setContextMenuOpen);
  }
}

function getFSFileContextMenu(
  setContextAction: (action: ContextMenuAction) => void,
  setContextMenuOpen: (open: boolean) => void
): Array<MenuItemProps> {
  return [
    {
      title: "Rename File",
      action: () => {
        setContextAction("rename");
        setContextMenuOpen(false);
      },
    },
    {
      title: "Delete File",
      action: () => {
        setContextAction("delete");
        setContextMenuOpen(false);
      },
    },
  ];
}

function getFSDirectoryContextMenu(
  setContextAction: (action: ContextMenuAction) => void,
  setContextMenuOpen: (open: boolean) => void
): Array<MenuItemProps> {
  return [
    {
      title: "Rename Directory",
      action: () => {
        setContextAction("rename");
        setContextMenuOpen(false);
      },
    },
    {
      title: "Delete Directory",
      action: () => {
        setContextAction("delete");
        setContextMenuOpen(false);
      },
    },
  ];
}
