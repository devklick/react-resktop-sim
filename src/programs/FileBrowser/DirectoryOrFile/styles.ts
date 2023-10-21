import styled from "@emotion/styled";
import { ReactComponent as FolderIcon } from "../../../assets/icons/folder-icon.svg";

export const StyledItem = styled.div<{ selected: boolean }>`
  width: 100%;
  padding: 10px;
  overflow-wrap: break-word;
  word-break: normal;
  box-sizing: border-box;
  aspect-ratio: 1/1;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
`;

export const StyledItemName = styled.span``;

export const StyledFolderIcon = styled(FolderIcon)`
  height: 80%;
  width: 80%;
  path {
    fill: white;
  }
`;
