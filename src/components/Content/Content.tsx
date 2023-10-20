import useWindowManagerStore from "../../stores/windowManagerStore";

import { StyledContainer, StyledContent } from "./Styled.Content";

interface ContentProps {}

// eslint-disable-next-line no-empty-pattern
function Content({}: ContentProps) {
  const winMan = useWindowManagerStore();

  return (
    <StyledContainer id="content__container">
      <StyledContent id="content" ref={winMan.contentRef}>
        {winMan.getWindowDefinitions().map((definition) => {
          return (
            <definition.component {...definition.props} key={definition.key}>
              {definition.children}
            </definition.component>
          );
        })}
      </StyledContent>
    </StyledContainer>
  );
}

export default Content;
