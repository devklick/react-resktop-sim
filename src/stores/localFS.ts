import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";

export type FSDirectory = {
  id: string;
  name: string;
  path: string;
  type: "directory";
  contents: Record<string, FSObject>;
};

export type FSFile = {
  id: string;
  name: string;
  path: string;
  type: "file";
  contents: string;
};

export type FSObject = FSDirectory | FSFile;

const rootDirId = uuid();
const homeDirId = uuid();
const userDirId = uuid();

const pathSeparator = "/";

const userDir: FSDirectory = {
  id: userDirId,
  name: "user",
  get path() {
    return [homeDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};

const homeDir: FSDirectory = {
  id: homeDirId,
  name: "home",
  get path() {
    return pathSeparator + this.name;
  },
  type: "directory",
  contents: { [userDir.name]: userDir },
};

const rootDir: FSDirectory = {
  id: rootDirId,
  name: pathSeparator,
  path: pathSeparator,
  type: "directory",
  contents: { [homeDir.name]: homeDir },
};

export function isFSDirectory(fsObject: FSObject): fsObject is FSDirectory {
  return fsObject.type === "directory";
}

export function isFSFile(fsObject: FSObject): fsObject is FSFile {
  return fsObject.type === "file";
}

export interface LocalFSState {
  root: FSObject;
  getDirectory: (path: string) => FSDirectory | null;
}

export const useLocalFS = create<LocalFSState>()(
  persist(
    (set, get) => ({
      root: rootDir,
      getDirectory(path) {
        console.log(path);
        if (!path.startsWith(pathSeparator)) {
          throw new Error("Invalid path");
        }

        let dir: FSDirectory | undefined = get().root as FSDirectory;

        if (path === dir.path) return dir;

        // for each path part, skipping the initial separator
        for (const pathPart of path.slice(1).split(pathSeparator)) {
          // If we dont have a dir, we cant check for any child objects,
          // so need to break out - path doesnt exist
          if (!dir) break;

          // if we have a dir, we need to look in it's contents for the path part
          const fsObject: FSObject | undefined = dir.contents[pathPart];

          // if the path part pointed to an existing dir, capture it
          if (fsObject && isFSDirectory(fsObject)) {
            dir = fsObject;
          }
          // Otherwise the specified path does not exist
          else {
            throw new Error("Path not found");
          }
        }

        return dir ?? null;
      },
    }),
    {
      name: "local-fs",
    }
  )
);

export default useLocalFS;
