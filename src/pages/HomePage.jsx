import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacmanLoader } from "react-spinners";

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  useEffect(() => {
    setTimeout(() => {
      setLoadingMessage("Loading... (initial load takes longer)");
    }, 5000);
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
        setLoading(false);
      })
      .catch(() => {
        console.log("Unable to fetch places");
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
      {places.map((place) => (
        <Link
          key={place._id}
          to={"/places/" + place._id}
          className="px-4 sm:px-0"
        >
          <div key={place._id} className="flex flex-col text-black">
            <img
              className="aspect-square rounded-2xl object-cover"
              src={place.photos[0]}
            />
            <span className="mt-4 font-semibold">{place.address}</span>
            <span className="truncate text-grey">{place.title}</span>
            <span>
              <span className="font-semibold">${place.price}</span> night
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
