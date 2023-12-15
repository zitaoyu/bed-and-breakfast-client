import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import PlacePhotoGallery from "../components/PlacePhotoGallery";
import ShareSaveButtons from "../components/ShareSaveButtons";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`/places/${id}`)
        .then((response) => {
          setPlace(response.data);
        })
        .catch(() => {
          alert("Cannot fetch place data, redirecting...");
        });
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-2 lg:px-10">
      {/* Title */}
      <div className="pt-6">
        <h1 className="text-2xl font-semibold text-black">{place?.title}</h1>
        <div className="flex flex-col justify-between sm:flex-row">
          <a
            className="text-black underline"
            target="_blank"
            href={"https://maps.google.com/?q=" + place?.address}
          >
            <FontAwesomeIcon className="m-auto mr-2" icon={faLocationDot} />
            {place?.address}
          </a>
          <ShareSaveButtons />
        </div>
      </div>
      {/* Photo Gallery */}
      <PlacePhotoGallery photos={place?.photos} />
    </div>
  );
};

export default PlacePage;
