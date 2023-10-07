import React, { useEffect, useState } from "react";
import { ReactComponent as FolderIcon } from "../../assets/icons/folder-icon.svg";

import { FSDirectory, FSObject, isFSDirectory } from "../../stores/localFS";
import useLocalFSWithHistory from "../../hooks/useLocalFSWithHistory";

import "./FileBrowser.scss";
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

interface SideBarProps {
  favorites: Array<FSDirectory>;
  openFSObject: (fsObject: FSObject) => void;
}

function SideBar({ favorites, openFSObject }: SideBarProps) {
  return (
    <div className="file-browser__side-bar">
      <div className="file-browser__side-bar__favorites">
        {favorites.map((fav) => (
          <div
            className="file-browser__side-bar__favorite"
            onClick={() => openFSObject(fav)}
          >
            {fav.name}
          </div>
        ))}
      </div>
    </div>
  );
}

interface MainContentProps {
  diContents: Record<string, FSObject>;
  openFSObject: (fsObject: FSObject) => void;
}

function MainContent({ diContents, openFSObject }: MainContentProps) {
  return (
    <div className="file-browser__main-content">
      {Object.values<FSObject>(diContents).map((fsObject) => (
        <div
          className="file-browser__main-content__item"
          onDoubleClick={() => openFSObject(fsObject)}
        >
          {isFSDirectory(fsObject) ? (
            <FolderIcon className="file-browser__main-content__item-icon" />
          ) : null}
          <span className="file-browser__main-content__item-name">
            {fsObject.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// eslint-disable-next-line no-empty-pattern
function FileBrowser({ path = defaultPath }: FileBrowserProps) {
  // const fs = useLocalFS();
  const fs = useLocalFSWithHistory(path);

  // const [currentDir, setCurrentDir] = useState<FSDirectory>(
  //   getDirOrDefault(fs, path)
  // );

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
    <div className="file-browser">
      <TopBar
        pathSearch={pathSearch}
        onPathInputChange={onPathInputChange}
        onPathInputSubmit={onPathInputSubmit}
        navBack={fs.navBack}
        navForward={fs.navForward}
      />

      <SideBar favorites={fs.favorites} openFSObject={fs.navToObject} />

      <MainContent
        diContents={fs.currentDirectory.contents}
        openFSObject={fs.navToObject}
      />
      <div className="file-browser__bottom-bar"></div>
    </div>
  );
}

export default FileBrowser;
