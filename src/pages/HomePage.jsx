import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces([...response.data, ...response.data, ...response.data]);
        // setPlaces(response.data);
      })
      .catch(() => {
        console.log("Unable to fetch places");
      });
  }, []);

  return (
    <div className="my-6 grid h-full w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {places.map((place) => (
        <Link to={"/place/" + place._id}>
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
