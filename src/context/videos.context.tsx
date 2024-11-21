import { createContext, useState } from "react";
import { debounce, getVideosFromFirebaseStorage } from "../firebase/utils";
import { VideosObject } from "../types";

export const VideosContext = createContext({
  videos: {} as VideosObject,
  videosError: "",
  videosLoading: false,
  setVideos: (videos: VideosObject) => {},
  setVideosError: (errorMessage: string) => {},
  setVideosLoading: (value: boolean) => {},
  getVideos: (folderName: string) => {},
});

export const VideosProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideosObject>({});
  const [videosError, setVideosError] = useState("");
  const [videosLoading, setVideosLoading] = useState(false);

  const getVideos = debounce((folderName: string) => {
    return new Promise<void>(async (resolve, reject) => {
      if (videos[folderName] !== undefined) {
        setVideosLoading(false);
        console.log("already has videos");
        resolve();
      }

      getVideosFromFirebaseStorage(folderName)
        .then((resp: any[]) => {
          videos[folderName] = resp;
          console.log(videos);
          setVideos(videos);
          setVideosLoading(false);
          resolve();
        })
        .catch((err: any) => {
          setVideosError(`Videos Error: ${err}`);
          setVideosLoading(false);
          console.log(err);
          reject(`${err}`);
        });
    });
  }, 1000);

  const value = {
    videos,
    videosError,
    videosLoading,
    setVideos,
    setVideosError,
    setVideosLoading,
    getVideos,
  };

  return (
    <VideosContext.Provider value={value}>{children}</VideosContext.Provider>
  );
};
