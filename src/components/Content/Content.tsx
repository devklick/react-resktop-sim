import useWindowManagerStore from "../../stores/windowManagerStore";
import "./Content.scss";

interface ContentProps {}

// eslint-disable-next-line no-empty-pattern
function Content({}: ContentProps) {
  const winMan = useWindowManagerStore();

  return (
    <div id="content__container">
      <div id="content" ref={winMan.contentRef}>
        {winMan.getWindowDefinitions().map((definition) => (
          <definition.component {...definition.props} key={definition.key}>
            {definition.children}
          </definition.component>
        ))}
      </div>
    </div>
  );
}

export default Content;
