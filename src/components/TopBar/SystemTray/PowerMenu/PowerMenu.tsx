import { ReactComponent as PowerIcon } from "../../../../assets/icons/power-icon.svg";

import "./PowerMenu.scss";

interface PowerMenuProps {}

// eslint-disable-next-line no-empty-pattern
function PowerMenu({}: PowerMenuProps) {
  return (
    <div id="power-menu">
      <PowerIcon className="power-icon" />
    </div>
  );
}

export default PowerMenu;
