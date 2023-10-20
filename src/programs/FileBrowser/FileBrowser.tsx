import React, { useEffect, useRef, useState } from "react";

import useLocalFSWithHistory from "../../hooks/useLocalFSWithHistory";
import AppSideBar from "../../components/AppSideBar";
import MainContent from "./MainContent";

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
