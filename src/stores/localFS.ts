import { create } from "zustand";
import { persist } from "zustand/middleware";

export type FSDirectory = {
  name: string;
  path: string;
  type: "directory";
  contents: Record<string, FSObject>;
};

export type FSFile = {
  name: string;
  path: string;
  type: "file";
  contents: string;
};

export type FSObject = FSDirectory | FSFile;

const pathSeparator = "/";

const documentsDir: FSDirectory = {
  name: "Documents",
  get path() {
    return [userDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};
const picturesDir: FSDirectory = {
  name: "Pictures",
  get path() {
    return [userDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};
const downloadsDir: FSDirectory = {
  name: "Downloads",
  get path() {
    return [userDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};
const musicDir: FSDirectory = {
  name: "Music",
  get path() {
    return [userDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};
const videosDir: FSDirectory = {
  name: "Videos",
  get path() {
    return [userDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {},
};

const userDir: FSDirectory = {
  name: "user",
  get path() {
    return [homeDir.path, this.name].join(pathSeparator);
  },
  type: "directory",
  contents: {
    [documentsDir.name]: documentsDir,
    [downloadsDir.name]: downloadsDir,
    [picturesDir.name]: picturesDir,
    [videosDir.name]: videosDir,
    [musicDir.name]: musicDir,
  },
};

const homeDir: FSDirectory = {
  name: "home",
  get path() {
    return pathSeparator + this.name;
  },
  type: "directory",
  contents: { [userDir.name]: userDir },
};

const rootDir: FSDirectory = {
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
  favorites: Array<FSDirectory>;
}

export const useLocalFS = create<LocalFSState>()(
  persist(
    (set, get) => ({
      root: rootDir,
      favorites: [userDir, documentsDir, downloadsDir, musicDir, videosDir],
      getDirectory(path) {
        if (!path.startsWith(pathSeparator)) {
          throw new Error("Invalid path");
        }

        let dir: FSDirectory | undefined = get().root as FSDirectory;

        if (path === dir.path) return dir;

        // for each path part, skipping the initial separator
        const pathParts = path.slice(1).split(pathSeparator);

        for (const pathPart of pathParts) {
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
