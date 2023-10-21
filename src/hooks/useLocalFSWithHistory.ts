import { useRef, useState } from "react";
import useLocalFS, {
  FSDirectory,
  FSObject,
  isFSDirectory,
} from "../stores/localFS";

function useLocalFSWithHistory(currentPath: string) {
  const history = useRef<string[]>([currentPath]);
  const position = useRef<number>(0);
  const fs = useLocalFS();
  const [currentDirectory, setCurrentDirectory] = useState<FSDirectory>(
    getDirOrDefault(currentPath)
  );

  function getDirOrDefault(path: string, defaultValue = "/home/user") {
    let dir = fs.getDirectory(path);
    if (!dir) {
      // TODO: Some kind of user notification
      console.warn("Invalid path");
      dir = fs.getDirectory(defaultValue);
    }
    return dir!;
  }

  function navToPath(path: string) {
    const dir = getDirOrDefault(path);
    navToObject(dir);
  }

  function navToObject(fsObject: FSObject) {
    if (isFSDirectory(fsObject)) {
      history.current.splice(position.current + 1);
      position.current++;
      history.current.push(fsObject.path);
      setCurrentDirectory(fsObject);
    }
  }

  function navForward() {
    if (history.current.length - 1 > position.current) {
      position.current++;
      const dir = fs.getDirectory(history.current[position.current]);
      if (dir) setCurrentDirectory(dir);
    }
  }

  function navBack() {
    if (position.current && history.current.length) {
      position.current--;
      const newPath = history.current[position.current];
      const dir = fs.getDirectory(newPath);
      if (dir) setCurrentDirectory(dir);
    }
  }

  return {
    currentDirectory,
    favorites: fs.favorites,
    navToPath,
    navToObject,
    getDirOrDefault,
    navForward,
    navBack,
    getNameFromPath: fs.getLastFromPath,
  };
}

export default useLocalFSWithHistory;
