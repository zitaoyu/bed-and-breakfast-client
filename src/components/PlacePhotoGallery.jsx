import ShareSaveButtons from "./ShareSaveButtons";
import { Icon } from "./Icon";
import { ICONS } from "../util/icons";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const PlacePhotoGallery = ({ photos, showAllPhotos, setShowAllPhotos }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (photos) {
      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = url;
          // wait 2 seconds to simulate loading time
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(url);
            }, 2000);

          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all(photos.map((image) => loadImage(image))).then(() =>
        setLoading(false),
      );
    }
  }, [photos]);

  if (showAllPhotos) {
    return (
      <div className="absolute left-0 top-0 min-h-screen w-screen bg-white">
        <div className="fixed top-0 flex w-full justify-between bg-white p-2">
          <button
            onClick={() => setShowAllPhotos(!showAllPhotos)}
            className="p-2 text-2xl text-black"
          >
            <Icon icon={ICONS.EXIT} />
          </button>
          <ShareSaveButtons />
        </div>
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-2">
          {photos.map((link, index) => {
            if (!link) {
              return;
            }
            const isLargePhoto =
              index % 3 === 0 ||
              (index === photos.length - 1 && index % 3 === 1);
            return (
              <img
                key={index}
                className={`${
                  isLargePhoto && "col-span-2 row-span-2"
                } aspect-video w-full object-cover`}
                src={link}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-2">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`${
                  index === 0
                    ? "col-span-2 row-span-2 "
                    : "col-span-1 row-span-1"
                } aspect-square`}
              >
                <Skeleton height={"100%"} />
              </div>
            ))
          : [...Array(5).keys()].map((index) => {
              if (photos?.[index]) {
                return (
                  <div
                    key={index}
                    className={`${
                      index === 0 && "col-span-2 row-span-2"
                    } cursor-pointer hover:brightness-75`}
                    onClick={() => setShowAllPhotos(!showAllPhotos)}
                  >
                    <img
                      key={index}
                      className="aspect-square object-cover"
                      src={photos[index]}
                      alt={`Image ${index}`}
                    />
                  </div>
                );
              } else {
                // not enough photos, use unknown image icon
                return (
                  <div key={index} className="flex justify-center bg-slate">
                    <Icon className="my-auto text-3xl" icon={ICONS.IMAGE} />
                  </div>
                );
              }
            })}
      </div>
      {!loading && (
        <button
          onClick={() => setShowAllPhotos(!showAllPhotos)}
          className="absolute bottom-3 right-3 rounded-md bg-white px-2 py-1 text-black opacity-80 outline outline-1 outline-black hover:opacity-100"
        >
          <Icon className="mr-1" icon={ICONS.IMAGES} />
          Show all photos
        </button>
      )}
    </div>
  );
};

export default PlacePhotoGallery;
