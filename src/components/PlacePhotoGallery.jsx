import {
  faImage,
  faImages,
  faArrowAltCircleLeft,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ShareSaveButtons from "./ShareSaveButtons";

const PlacePhotoGallery = ({ photos, showAllPhotos, setShowAllPhotos }) => {
  if (showAllPhotos) {
    return (
      <div className="absolute left-0 top-0 min-h-screen w-screen bg-white">
        <div className="fixed top-0 flex w-full justify-between bg-white p-2">
          <button
            onClick={() => setShowAllPhotos(!showAllPhotos)}
            className="p-2 text-2xl text-black"
          >
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </button>
          <ShareSaveButtons />
        </div>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2">
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
        {[...Array(5).keys()].map((index) => {
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
                  className="aspect-square object-cover"
                  src={photos[index]}
                />
              </div>
            );
          } else {
            // not enough photos, use unknow image icon
            return (
              <div key={index} className="flex justify-center bg-slate">
                <FontAwesomeIcon className="my-auto text-3xl" icon={faImage} />
              </div>
            );
          }
        })}
      </div>
      <button
        onClick={() => setShowAllPhotos(!showAllPhotos)}
        className="absolute bottom-3 right-3 rounded-md bg-white px-2 py-1 text-black opacity-80 outline outline-1 outline-black hover:opacity-100"
      >
        <FontAwesomeIcon className="mr-1" icon={faImages} />
        Show all photos
      </button>
    </div>
  );
};

export default PlacePhotoGallery;
