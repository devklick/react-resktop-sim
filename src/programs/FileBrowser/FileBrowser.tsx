import React, { useState } from "react";
import useLocalFS, {
  FSDirectory,
  FSObject,
  LocalFSState,
} from "../../stores/localFS";
import "./FileBrowser.scss";

interface FileBrowserProps {
  path?: string;
}

const defaultPath = "/home/user";

function getDirOrDefault(
  fs: LocalFSState,
  path: string,
  defaultValue = defaultPath
) {
  let dir = fs.getDirectory(path);
  if (!dir) {
    // TODO: Some kind of user notification
    console.warn("Invalid path");
    dir = fs.getDirectory(defaultValue);
  }
  return dir!;
}

// eslint-disable-next-line no-empty-pattern
function FileBrowser({ path = defaultPath }: FileBrowserProps) {
  const fs = useLocalFS();

  const [currentDir, setCurrentDir] = useState<FSDirectory>(
    getDirOrDefault(fs, path)
  );

  const [pathSearch, setPathSearch] = useState<string>(currentDir.path);

  function onPathInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPathSearch(e.currentTarget.value);
  }

  function onPathInputSubmit(e: React.KeyboardEvent) {
    if (e.code === "Enter") {
      setCurrentDir(getDirOrDefault(fs, pathSearch));
    }
  }

  return (
    <div className="file-browser">
      <div className="file-browser__top-bar">
        <div className="file-browser__top-bar__left"></div>
        <div className="file-browser__top-bar__centre">
          <input
            className="file-browser__top-bar__centre__path-nav"
            value={pathSearch}
            onChange={onPathInputChange}
            onKeyDown={onPathInputSubmit}
          />
        </div>
        <div className="file-browser__top-bar__right"></div>
      </div>
      <div className="file-browser__side-bar"></div>
      <div className="file-browser__main-content">
        {Object.values<FSObject>(currentDir.contents).map((fsObject) => (
          <div>{fsObject.name}</div>
        ))}
      </div>
      <div className="file-browser__bottom-bar"></div>
    </div>
  );
}

export default FileBrowser;
