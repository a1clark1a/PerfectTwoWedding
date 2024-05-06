import { createContext, useState } from "react";
import { debounce, getImagesFromFirebase } from "../firebase/utils";
import { ImagesFolder, Images } from "../types";

export const ImagesContext = createContext({
  images: {} as ImagesFolder,
  imagesError: "",
  imagesLoading: false,
  setImages: (images: ImagesFolder) => {},
  setImagesError: (errorMessage: string) => {},
  setImagesLoading: (value: boolean) => {},
  getImages: (folderName: string) => {},
});

export const ImagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<ImagesFolder>({});
  const [imagesError, setImagesError] = useState("");
  const [imagesLoading, setImagesLoading] = useState(false);

  const getImages = debounce((folderName: string) => {
    return new Promise<void>(async (resolve, reject) => {
      if (images[folderName]?.length > 0) {
        setImagesLoading(false);
        console.log("already has images");
        resolve();
      }
      try {
        getImagesFromFirebase(folderName)
          .then((resp: Images[]) => {
            images[folderName] = resp;
            setImages(images);
            setImagesLoading(false);
            resolve();
          })
          .catch((err: any) => {
            setImagesError(`Images Error: ${err}`);
            setImagesLoading(false);
            console.log(err);
            reject(`${err}`);
          });
      } catch (error) {
        console.log(error);
      }
    });
  }, 1000);

  const value = {
    images,
    imagesError,
    imagesLoading,
    setImages,
    setImagesError,
    setImagesLoading,
    getImages,
  };

  return (
    <ImagesContext.Provider value={value}>{children}</ImagesContext.Provider>
  );
};
