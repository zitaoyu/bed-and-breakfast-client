import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ImageSlider = ({ photos }) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [imageAnimation, setImageAnimation] = useState("");

  function updatePhotoIndex(e, offset) {
    let newIndex = (photoIndex + offset) % photos.length;
    if (newIndex < 0) {
      newIndex = photos.length + newIndex;
    }
    setPhotoIndex(newIndex);
    setImageAnimation("animate-image-fade-in");
    e.stopPropagation();
  }

  return (
    <div className="group relative h-full w-full">
      <img
        key={photoIndex}
        className={"aspect-square rounded-2xl object-cover " + imageAnimation}
        src={photos[photoIndex]}
      />
      <button
        className="absolute top-1/2 ml-1 hidden -translate-y-1/2 opacity-70 hover:opacity-100 group-hover:block"
        onClick={(e) => updatePhotoIndex(e, -1)}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="h-4 w-4 rounded-full bg-white p-2"
        />
      </button>
      <button
        className="absolute right-0 top-1/2 mr-1 hidden -translate-y-1/2 opacity-70 hover:opacity-100 group-hover:block"
        onClick={(e) => updatePhotoIndex(e, 1)}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="h-4 w-4 rounded-full bg-white p-2"
        />
      </button>
    </div>
  );
};

const PlaceContainer = ({ place }) => {
  const id = place._id;
  const [redirectToPlace, setReditectToPlace] = useState(false);

  if (redirectToPlace) {
    return <Navigate to={"/places/" + id} />;
  }

  return (
    <div
      className="flex cursor-pointer flex-col px-4 text-black sm:px-0"
      onClick={() => setReditectToPlace(true)}
    >
      <ImageSlider photos={place.photos} />
      <div className="mt-4 flex flex-col">
        <span className="mfont-semibold">{place.address}</span>
        <span className="truncate text-grey">{place.title}</span>
        <span>
          <span className="font-semibold">${place.price}</span> night
        </span>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoadingMessage("Uable to find places, please try again later...");
      });
  }, []);

  if (loading) {
    return (
      <div className="m-auto flex flex-col gap-4 text-lg text-primary">
        <PacmanLoader color="#E07400" className="m-auto" />
        <span>{loadingMessage}</span>
      </div>
    );
  }

  return (
    <div className="my-6 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {places.map((place, index) => (
        <PlaceContainer key={index} place={place} />
      ))}
    </div>
  );
};

export default HomePage;
