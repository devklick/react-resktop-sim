import TopBar from "../TopBar";
import Content from "../Content";
import BottomBar from "../BottomBar";

import "./Desktop.scss";

interface DesktopProps {}

// eslint-disable-next-line no-empty-pattern
function Desktop({}: DesktopProps) {
  return (
    <div id="desktop">
      <div id="desktop__background" />
      <TopBar />
      <Content />
      <BottomBar />
    </div>
  );
}

export default Desktop;
