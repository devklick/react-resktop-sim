import styled from "@emotion/styled";
import { Position } from "../../hooks/useDragToResize";

export const StyledContextMenu = styled.div<{ position: Position }>`
  position: fixed;
  // Kind of hacky - we need the context menu to always
  // display on top of everything else. We could use the zIndex that's
  // stored in global state, but this is fine for now.
  // It will hit an issue in a very rare case, when window zindexes have
  // been switched enough and the bordered app hits or exceeds this number.
  z-index: 9999;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;
