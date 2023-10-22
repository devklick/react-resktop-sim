import { MenuItemProps } from "../../components/MenuItems";
import { FSObject, FSObjectType, LocalFSState } from "../../stores/localFS";

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
  fsObject: FSObject,
  fs: LocalFSState,
  setContextAction: (action: ContextMenuAction) => void,
  setContextMenuOpen: (open: boolean) => void
): Array<MenuItemProps> {
  switch (fsObject.type) {
    case "file":
      return getFSFileContextMenu(setContextAction, setContextMenuOpen);
    case "directory":
      return getFSDirectoryContextMenu(
        fsObject,
        fs,
        setContextAction,
        setContextMenuOpen
      );
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
  fsObject: FSObject,
  fs: LocalFSState,
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
    {
      title: fs.favorites.includes(fsObject.path)
        ? "Remove from Favorites"
        : "Add to Favorites",
      action: () => {
        fs.favorites.includes(fsObject.path)
          ? fs.removeFromFavorites(fsObject.path)
          : fs.addToFavorites(fsObject.path);
        setContextMenuOpen(false);
      },
    },
  ];
}
