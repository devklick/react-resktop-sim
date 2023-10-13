import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as FolderIcon } from "../../assets/icons/folder-icon.svg";

import useLocalFS, {
  FSDirectory,
  FSObject,
  FSObjectType,
  isFSDirectory,
} from "../../stores/localFS";
import useLocalFSWithHistory from "../../hooks/useLocalFSWithHistory";

import "./FileBrowser.scss";
import AppSideBar from "../../components/AppSideBar";
import ContextMenu from "../../ContextMenu/ContextMenu";
import { getMainContentContextItems } from "./contextMenus";
import FullAppPrompt from "../../components/FullAppPrompt";
const defaultPath = "/home/user";

interface FileBrowserProps {
  path?: string;
}

interface TopBarProps {
  pathSearch: string;
  onPathInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPathInputSubmit: (e: React.KeyboardEvent) => void;
  navForward: () => void;
  navBack: () => void;
}
function TopBar({
  pathSearch,
  onPathInputChange,
  onPathInputSubmit,
  navForward,
  navBack,
}: TopBarProps) {
  return (
    <div className="file-browser__top-bar">
      <div className="file-browser__top-bar__button-nav">
        <div
          className="file-browser__top-bar__button-nav__left"
          onClick={navBack}
        >
          ←
        </div>
        <div
          className="file-browser__top-bar__button-nav__right"
          onClick={navForward}
        >
          →
        </div>
      </div>
      <input
        className="file-browser__top-bar__path-nav"
        value={pathSearch}
        onChange={onPathInputChange}
        onKeyDown={onPathInputSubmit}
      />
    </div>
  );
}

interface MainContentProps {
  currentDirectory: FSDirectory;
  openFSObject: (fsObject: FSObject) => void;
  appRef: React.RefObject<HTMLDivElement>;
}

function MainContent({
  currentDirectory,
  openFSObject,
  appRef,
}: MainContentProps) {
  const [selected, setSelected] = useState<string>("");
  const clickPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [promptFor, setPromptFor] = useState<FSObjectType | null>(null);
  const fs = useLocalFS();

  function handleRightClick(e: React.MouseEvent) {
    clickPosition.current = { x: e.clientX, y: e.clientY };
    e.stopPropagation();
    e.preventDefault();
    setContextMenuOpen(true);
  }

  return (
    <div
      className="file-browser__main-content"
      onContextMenu={handleRightClick}
    >
      {promptFor && (
        <FullAppPrompt
          fieldName="Name"
          promptName={`Create ${promptFor}`}
          appRef={appRef}
          close={() => setPromptFor(null)}
          submit={(value) => fs.create(promptFor, value, currentDirectory)}
          validate={fs.validateFSObjectName}
        />
      )}
      {contextMenuOpen && (
        <ContextMenu
          position={clickPosition.current}
          items={getMainContentContextItems(setPromptFor, setContextMenuOpen)}
          close={() => setContextMenuOpen(!contextMenuOpen)}
        />
      )}
      {Object.values<FSObject>(currentDirectory.contents).map((fsObject) => (
        <DirectoryOrFile
          fsObject={fsObject}
          openFSObject={openFSObject}
          selected={selected === fsObject.path}
          setSelected={setSelected}
          key={fsObject.path}
        />
      ))}
    </div>
  );
}

interface DirectoryOrFileProps {
  fsObject: FSObject;
  selected: boolean;
  openFSObject: (fsObject: FSObject) => void;
  setSelected: (path: string) => void;
}

function DirectoryOrFile({
  fsObject,
  openFSObject,
  selected,
  setSelected,
}: DirectoryOrFileProps) {
  function handleRightClick(event: React.MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  return (
    <div
      className={`file-browser__main-content__item ${selected ? "active" : ""}`}
      onDoubleClick={() => openFSObject(fsObject)}
      onClick={() => setSelected(fsObject.path)}
      key={fsObject.path}
      onContextMenu={handleRightClick}
    >
      {isFSDirectory(fsObject) ? (
        <FolderIcon className="file-browser__main-content__item-icon" />
      ) : null}
      <span className="file-browser__main-content__item-name">
        {fsObject.name}
      </span>
    </div>
  );
}

function FileBrowser({ path = defaultPath }: FileBrowserProps) {
  const fs = useLocalFSWithHistory(path);
  const appRef = useRef<HTMLDivElement>(null);

  const [pathSearch, setPathSearch] = useState<string>(
    fs.currentDirectory.path
  );

  useEffect(() => {
    setPathSearch(fs.currentDirectory.path);
  }, [fs.currentDirectory]);

  function onPathInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPathSearch(e.currentTarget.value);
  }

  function onPathInputSubmit(e: React.KeyboardEvent) {
    if (e.code === "Enter") {
      fs.navToPath(pathSearch);
    }
  }

  return (
    <div className="file-browser" ref={appRef}>
      <TopBar
        pathSearch={pathSearch}
        onPathInputChange={onPathInputChange}
        onPathInputSubmit={onPathInputSubmit}
        navBack={fs.navBack}
        navForward={fs.navForward}
      />

      <AppSideBar
        items={fs.favorites.map((fav) => ({
          title: fav.name,
          isActive: fav.path === fs.currentDirectory.path,
          onClick: () => fs.navToPath(fav.path),
        }))}
      />

      <MainContent
        currentDirectory={fs.currentDirectory}
        openFSObject={fs.navToObject}
        appRef={appRef}
      />
      <div className="file-browser__bottom-bar"></div>
    </div>
  );
}

export default FileBrowser;
