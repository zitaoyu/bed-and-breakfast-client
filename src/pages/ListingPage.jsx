import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ProfilePageContainer from "../components/ProfilePageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const ListingPage = () => {
  const [listedPlaces, setListedPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/user-places")
      .then(({ data }) => {
        setListedPlaces(data);
      })
      .catch(() => {
        alert("Unable to fetch listed places.");
      });
  }, []);

  return (
    <ProfilePageContainer>
      <Link
        to={"/account/listings/new"}
        className="inline-block w-full rounded-xl bg-slate px-6 py-2 text-center text-black hover:bg-slate-dark"
      >
        <FontAwesomeIcon className="mr-2 text-xl" icon={faPlus} />
        Add New Accommodation
      </Link>

      <div className="mb-4 flex max-w-full flex-col gap-4">
        {listedPlaces.length > 0 &&
          listedPlaces.map((place) => (
            <Link
              to={"/account/listings/" + place._id}
              className="flex h-40 w-full cursor-pointer gap-4 rounded-2xl bg-slate p-4 shadow-md hover:bg-slate-dark"
            >
              <div className="h-32 w-32 shrink-0">
                <img
                  className="h-full w-full rounded-2xl object-cover"
                  src={place.photos?.[0]}
                />
              </div>
              <div className="grow-0 overflow-scroll">
                <h2 className="text-base font-semibold text-black md:text-xl">
                  {place.title}
                </h2>
                <p className="mt-2 text-sm">{place.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </ProfilePageContainer>
  );
};

export default ListingPage;
