import { MenuItemProps } from "../../components/MenuItems";

export function getMainContentContextItems(): Array<MenuItemProps> {
  return [
    {
      title: "Create Directory",
    },
    {
      title: "Create File",
    },
    {
      title: "Open in Terminal",
    },
  ];
}
