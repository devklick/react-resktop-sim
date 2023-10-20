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
  contents: string | undefined;
};

export type FSObject = FSDirectory | FSFile;

export type FSObjectType = FSObject["type"];

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
  createDirectory: (
    name: string,
    parentDirectory: FSDirectory
  ) => FSDirectory | null;
  createFile: (
    name: string,
    parentDirectory: FSDirectory,
    contents?: string
  ) => FSFile | null;
  favorites: Array<{ path: string; name: string }>;
  validateFSObjectName: (name: string) => string | null;
  fsObjectNameIsAvailable: (name: string, directory: FSDirectory) => boolean;
  create: (
    type: FSObjectType,
    name: string,
    parentDirectory: FSDirectory
  ) => FSObject | null;
  rename: (
    parentDirectory: FSDirectory,
    fsObject: FSObject,
    newName: string
  ) => void;
  delete: (parentDirectory: FSDirectory, fsObject: FSObject) => void;
  getParentDirectory: (path: string) => FSDirectory | null;
  getLastFromPath: (path: string) => string | null;
}

export const useLocalFS = create<LocalFSState>()(
  persist(
    (set, get) => {
      const getLastFromPath: LocalFSState["getLastFromPath"] = (path) => {
        const parts = path.split(pathSeparator);
        return parts.length ? parts[parts.length - 1] : null;
      };

      const getDirectory: LocalFSState["getDirectory"] = (path) => {
        const parent = get().getParentDirectory(path);
        const lastPart = get().getLastFromPath(path);

        if (parent && lastPart) {
          const fsObject = parent.contents[lastPart];
          if (fsObject.type === "directory") return fsObject;
        }

        return null;
      };

      const createDirectory: LocalFSState["createDirectory"] = (
        name,
        parentDirectory
      ) => {
        if (parentDirectory.contents[name]) return null;

        const directory: FSDirectory = {
          name,
          path: [parentDirectory.path, name].join(pathSeparator),
          type: "directory",
          contents: {},
        };

        parentDirectory.contents[name] = directory;

        // parentDirectory should be a pointer to whatever was returned
        // from getDirectory, which means updating it should update the root.
        // This means we can just update the root state
        set({ root: get().root });

        return directory;
      };

      const createFile: LocalFSState["createFile"] = (
        name,
        parentDirectory,
        contents
      ) => {
        if (parentDirectory.contents[name]) {
          return null;
        }

        const file: FSFile = {
          name,
          path: [parentDirectory.path, name].join(pathSeparator),
          type: "file",
          contents,
        };

        parentDirectory.contents[name] = file;

        // parentDirectory should be a pointer to whatever was returned
        // from getDirectory, which means updating it should update the root.
        // This means we can just update the root state

        set({ root: get().root });

        return file;
      };

      const validateFSObjectName: LocalFSState["validateFSObjectName"] = (
        name
      ) => {
        if (!name) {
          return "A value is required";
        }
        if (name.includes(pathSeparator)) {
          return `${pathSeparator} is not allowed`;
        }

        return null;
      };

      const create: LocalFSState["create"] = (type, name, parentDirectory) => {
        switch (type) {
          case "directory":
            return get().createDirectory(name, parentDirectory);
          case "file":
            return get().createFile(name, parentDirectory);
        }
      };

      const fsObjectNameIsAvailable: LocalFSState["fsObjectNameIsAvailable"] = (
        name,
        directory
      ) => {
        return !directory.contents[name];
      };
      const getParentDirectory: LocalFSState["getParentDirectory"] = (path) => {
        if (!path.startsWith(pathSeparator)) {
          throw new Error("Invalid path");
        }

        let dir: FSDirectory | undefined = get().root as FSDirectory;

        if (path === dir.path) return dir;

        // for each path part, skipping the initial separator
        const pathParts = path.slice(1).split(pathSeparator);

        for (const [index, pathPart] of pathParts.entries()) {
          if (index === pathParts.length - 1) break;

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
      };

      const deleteFSObject: LocalFSState["delete"] = (
        parentDirectory,
        fsObject
      ) => {
        delete parentDirectory.contents[fsObject.name];
        set({ root: get().root });
      };

      const rename: LocalFSState["rename"] = (
        parentDirectory,
        fsObject,
        newName
      ) => {
        const oldName = fsObject.name;
        fsObject.name = newName;
        fsObject.path = [
          ...fsObject.path.split(pathSeparator).slice(0, -1),
          newName,
        ].join(pathSeparator);
        parentDirectory.contents[newName] = fsObject;
        delete parentDirectory.contents[oldName];

        set({ root: get().root });
      };
      return {
        root: rootDir,
        favorites: [
          { name: userDir.name, path: userDir.path },
          { name: documentsDir.name, path: documentsDir.path },
          { name: downloadsDir.name, path: downloadsDir.path },
          { name: musicDir.name, path: musicDir.path },
          { name: videosDir.name, path: videosDir.path },
        ],
        create,
        createDirectory,
        createFile,
        delete: deleteFSObject,
        fsObjectNameIsAvailable,
        getDirectory,
        getLastFromPath,
        getParentDirectory,
        rename,
        validateFSObjectName,
      };
    },
    {
      name: "local-fs",
    }
  )
);

export default useLocalFS;
