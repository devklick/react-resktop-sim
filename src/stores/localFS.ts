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
const rootDirPath = "/";
const homeDirPath = rootDirPath + "home";
const userDirPath = [homeDirPath, "user"].join(pathSeparator);
const documentsDirPath = [userDirPath, "Documents"].join(pathSeparator);
const picturesDirPath = [userDirPath, "Pictures"].join(pathSeparator);
const downloadsDirPath = [userDirPath, "Downloads"].join(pathSeparator);
const musicDirPath = [userDirPath, "Music"].join(pathSeparator);
const videosDirPath = [userDirPath, "Videos"].join(pathSeparator);

const documentsDir: FSDirectory = {
  name: "Documents",
  path: documentsDirPath,
  type: "directory",
  contents: {},
};
const picturesDir: FSDirectory = {
  name: "Pictures",
  path: picturesDirPath,
  type: "directory",
  contents: {},
};
const downloadsDir: FSDirectory = {
  name: "Downloads",
  path: downloadsDirPath,
  type: "directory",
  contents: {},
};
const musicDir: FSDirectory = {
  name: "Music",
  path: musicDirPath,
  type: "directory",
  contents: {},
};
const videosDir: FSDirectory = {
  name: "Videos",
  path: videosDirPath,
  type: "directory",
  contents: {},
};

const userDir: FSDirectory = {
  name: "user",
  path: userDirPath,
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
  path: homeDirPath,
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
  favorites: Array<string>;
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
  addToFavorites: (path: string) => void;
  removeFromFavorites: (path: string) => void;
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
        get().removeFromFavorites(fsObject.path);
        set({ root: get().root });
      };

      const rename: LocalFSState["rename"] = (
        parentDirectory,
        fsObject,
        newName
      ) => {
        const oldName = fsObject.name;
        const oldPath = fsObject.path;
        const newPath = [
          ...fsObject.path.split(pathSeparator).slice(0, -1),
          newName,
        ].join(pathSeparator);

        // Update the parent so it knows about the rename
        parentDirectory.contents[newName] = fsObject;
        delete parentDirectory.contents[oldName];

        // Update the FSObject to have the new name
        fsObject.name = newName;

        // The path is also stored on each of the children,
        // so we need to update the renamed dir on them to.
        // This isnt ideal, as we'll going to have to loop over
        // them all recursively. A better way to do this might be to not
        // store the path on each FSObject and instead store a reference to
        // the parent FSDirectory, but this would very tricky to persist
        function updatePathRecursive(fsObject: FSObject) {
          console.log("Updating", fsObject.path);
          const regex = new RegExp(`^${oldPath}`);
          fsObject.path = fsObject.path.replace(regex, newPath);
          console.log("Updated to", fsObject.path);

          if (!isFSDirectory(fsObject)) return;

          for (const child of Object.values<FSObject>(fsObject.contents)) {
            updatePathRecursive(child);
          }
        }

        updatePathRecursive(fsObject);

        // If the FSObject is in the favorites, update that too.
        const favorites = get().favorites;
        const favIndex = favorites.findIndex((fav) => fav === oldPath);
        if (favIndex >= 0) {
          favorites[favIndex] = fsObject.path;
        }

        set({ root: get().root, favorites });
      };

      const addToFavorites: LocalFSState["addToFavorites"] = (path) => {
        const oldFavorites = get().favorites;
        const favorites = [...oldFavorites];
        if (!favorites.includes(path)) {
          favorites.push(path);
        }
        set({ favorites });
      };
      const removeFromFavorites: LocalFSState["removeFromFavorites"] = (
        path
      ) => {
        const oldFavorites = get().favorites;
        const favorites = [...oldFavorites];
        const index = favorites.indexOf(path);
        if (index >= 0) {
          favorites.splice(index, 1);
        }
        set({ favorites });
      };
      return {
        root: rootDir,
        favorites: [
          userDir.path,
          documentsDir.path,
          downloadsDir.path,
          musicDir.path,
          picturesDir.path,
          videosDir.path,
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
        addToFavorites,
        removeFromFavorites,
      };
    },
    {
      name: "local-fs",
    }
  )
);

export default useLocalFS;
