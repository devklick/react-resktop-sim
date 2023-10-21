import React, { useRef, useState } from "react";
import useLocalFS, {
  FSDirectory,
  FSObject,
  isFSDirectory,
} from "../../../stores/localFS";
import ContextMenu from "../../../components/ContextMenu/ContextMenu";
import { ContextMenuAction, getFSObjectContextMenu } from "../contextMenus";

import useBindKeyToAction from "../../../hooks/useBindKeyToAction";
import AppPopup from "../../../components/AppPopup";
import HeaderBar from "../../../components/HeaderBar";
import Box from "../../../components/Box";
import InputField from "../../../components/InputField";
import Row from "../../../components/Row";
import Button from "../../../components/Button";
import { StyledFolderIcon, StyledItem, StyledItemName } from "./styles";
import useSystemSettings from "../../../stores/systemSettingsStore";

interface DirectoryOrFileProps {
  fsObject: FSObject;
  selected: boolean;
  openFSObject: (fsObject: FSObject) => void;
  setSelected: (path: string) => void;
  appRef: React.RefObject<HTMLDivElement>;
  currentDirectory: FSDirectory;
}

function DirectoryOrFile({
  fsObject,
  openFSObject,
  selected,
  setSelected,
  appRef,
  currentDirectory,
}: DirectoryOrFileProps) {
  const clickPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextAction, setContextAction] = useState<ContextMenuAction | null>(
    null
  );
  const settings = useSystemSettings();

  function handleRightClick(event: React.MouseEvent) {
    clickPosition.current = { x: event.clientX, y: event.clientY };
    event.stopPropagation();
    event.preventDefault();
    setContextMenuOpen(true);
  }

  return (
    <StyledItem
      selected={selected}
      selectedColor={settings.accentColor}
      onDoubleClick={() => openFSObject(fsObject)}
      onClick={() => setSelected(fsObject.path)}
      key={fsObject.path}
      onContextMenu={handleRightClick}
    >
      {contextMenuOpen && (
        <ContextMenu
          position={clickPosition.current}
          items={getFSObjectContextMenu(
            fsObject.type,
            setContextAction,
            setContextMenuOpen
          )}
          close={() => setContextMenuOpen(!contextMenuOpen)}
        />
      )}
      {contextAction === "rename" && (
        <RenamePopup
          appRef={appRef}
          close={() => setContextAction(null)}
          currentDirectory={currentDirectory}
          fsObject={fsObject}
        />
      )}
      {contextAction === "delete" && (
        <DeletePopup
          appRef={appRef}
          close={() => setContextAction(null)}
          currentDirectory={currentDirectory}
          fsObject={fsObject}
        />
      )}
      {isFSDirectory(fsObject) ? (
        <StyledFolderIcon fillColor={settings.iconColor} />
      ) : null}
      <StyledItemName>{fsObject.name}</StyledItemName>
    </StyledItem>
  );
}

interface RenamePopupProps {
  fsObject: FSObject;
  appRef: React.RefObject<HTMLDivElement>;
  currentDirectory: FSDirectory;
  close: () => void;
}

function RenamePopup({
  appRef,
  fsObject,
  currentDirectory,
  close,
}: RenamePopupProps) {
  const valueRef = useRef("");
  const fs = useLocalFS();
  const [error, setError] = useState(fs.validateFSObjectName(""));

  useBindKeyToAction({
    keys: ["Escape"],
    action: close,
  });
  useBindKeyToAction({
    keys: ["Enter", "NumpadEnter"],
    action: handleClickConfirm,
  });

  function handleValueChange(value: string) {
    valueRef.current = value;

    const invalid = fs.validateFSObjectName(value);
    if (invalid) {
      setError(invalid);
      return;
    }

    const available = fs.fsObjectNameIsAvailable(value, currentDirectory);
    if (!available) {
      setError(`${value} already exists`);
      return;
    }

    setError(null);
  }

  function handleClickConfirm() {
    if (error) return;
    fs.rename(currentDirectory, fsObject, valueRef.current);
    close();
  }

  return (
    <AppPopup appRef={appRef} close={close}>
      <HeaderBar header={`Rename ${fsObject.type}`} />
      <Box>
        <InputField
          name="Name"
          type="string"
          onChange={handleValueChange}
          error={error}
        />

        <Row>
          <Button name="Cancel" onClick={close} />
          <Button name="Confirm" onClick={handleClickConfirm} />
        </Row>
      </Box>
    </AppPopup>
  );
}

interface DeletePopupProps {
  appRef: React.RefObject<HTMLDivElement>;
  fsObject: FSObject;
  currentDirectory: FSDirectory;
  close: () => void;
}

function DeletePopup({
  appRef,
  fsObject,
  currentDirectory,
  close,
}: DeletePopupProps) {
  const fs = useLocalFS();

  function handleClickConfirm() {
    fs.delete(currentDirectory, fsObject);
  }

  return (
    <AppPopup appRef={appRef} close={close}>
      <HeaderBar header={`Delete ${fsObject.type}?`} />
      <Box>
        <Row>
          <Button name="Cancel" onClick={close} />
          <Button name="Confirm" onClick={handleClickConfirm} />
        </Row>
      </Box>
    </AppPopup>
  );
}

export default DirectoryOrFile;
