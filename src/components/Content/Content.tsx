import useWindowManagerStore from "../../stores/windowManagerStore";
import "./Content.scss";

interface ContentProps {}

// eslint-disable-next-line no-empty-pattern
function Content({}: ContentProps) {
  const winMan = useWindowManagerStore();
  return (
    <div id="content__container" ref={winMan.contentRef}>
      <div id="content">{winMan.getWindows()}</div>
    </div>
  );
}

export default Content;
