import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import ImageSlider from "../components/ImageSlider";
import AFramesIcon from "../assets/a-frames.jpeg";
import AmazingViewIcon from "../assets/amazing-view.jpeg";
import BeachFrontIcon from "../assets/beach-front.jpeg";
import CabinIcon from "../assets/cabin.jpeg";
import DesignIcon from "../assets/design.jpeg";
import TreeHouseIcon from "../assets//tree-house.jpeg";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

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

const FilterBar = ({
  typeFilter,
  setTypeFilter,
  priceRangeFilter,
  setPriceRangeFilter,
  filterPlaces,
  resetFilter,
}) => {
  const filterOptions = [
    { label: "A-frames", icon: AFramesIcon, value: "a-frames" },
    { label: "Amazing views", icon: AmazingViewIcon, value: "amazing-views" },
    { label: "Beachfront", icon: BeachFrontIcon, value: "beachfront" },
    { label: "Cabins", icon: CabinIcon, value: "cabins" },
    { label: "Design", icon: DesignIcon, value: "Design" },
    { label: "Treehouses", icon: TreeHouseIcon, value: "treehouses" },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl pt-4 lg:flex-row lg:gap-10">
      {/* Type Filter */}
      <div className="flex items-center gap-1 overflow-scroll sm:gap-4 md:gap-8">
        <span className="hidden font-semibold text-black xl:block">Types:</span>
        {filterOptions.map((option, index) => (
          <button
            key={index}
            className={`${
              option.value === typeFilter ? "opacity-100" : "opacity-60"
            } group flex flex-col gap-1 text-xs text-black hover:opacity-100`}
            onClick={() => setTypeFilter(option.value)}
          >
            <img src={option.icon} className="m-auto h-6 w-6" />
            <span>{option.label}</span>
            <div
              className={`${
                option.value === typeFilter && "bg-black"
              } h-[2px] w-full group-hover:bg-black`}
            ></div>
          </button>
        ))}
      </div>
      {/* Price Filter */}
      <div className="flex flex-col justify-center gap-6 text-black md:flex-row">
        <div className="flex items-center">
          <span className="hidden text-nowrap font-semibold text-black xl:block">
            Price range:
          </span>
          <div className="mx-4 min-w-[200px]">
            <Slider
              range
              allowCross={false}
              defaultValue={priceRangeFilter}
              value={priceRangeFilter}
              step={10}
              onChange={(values) => setPriceRangeFilter(values)}
              styles={{
                track: { backgroundColor: "#E07400" },
                handle: { borderColor: "#E07400", backgroundColor: "white" },
              }}
              min={0}
              max={600}
              marks={{
                0: <span>$0</span>,
                600: <span>$600</span>,
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <label className="mr-1">Min.$</label>
          <input
            value={priceRangeFilter[0]}
            className="mr-2 w-16 rounded-lg border p-2"
            onChange={(ev) =>
              setPriceRangeFilter((prev) => [ev.target.value, prev[1]])
            }
          />
          <label className="mr-1">Max.$</label>
          <input
            value={priceRangeFilter[1]}
            className="mr-4 w-16 rounded-lg border p-2"
            onChange={(ev) =>
              setPriceRangeFilter((prev) => [prev[0], ev.target.value])
            }
          />
          <div className="flex gap-4">
            <button
              className="rounded-lg border p-2 font-semibold text-black hover:border-black"
              onClick={resetFilter}
            >
              Reset
            </button>
            <button
              className="rounded-lg border border-black p-2 font-semibold text-black hover:border-primary hover:bg-primary hover:text-white"
              onClick={filterPlaces}
            >
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [typeFilter, setTypeFilter] = useState(null);
  const [priceRangeFilter, setPriceRangeFilter] = useState([0, 600]);

  useEffect(() => {
    axios
      .get("/places")
      .then((response) => {
        setPlaces(response.data);
        setFilteredPlaces(response.data);
        setLoading(false);
      })
      .catch(() => {
        setLoadingMessage("Uable to find places, please try again later...");
      });
  }, []);

  function filterPlaces() {
    let newFilteredPlaces = places.filter(
      (place) =>
        place.price >= priceRangeFilter[0] &&
        place.price <= priceRangeFilter[1],
    );
    setFilteredPlaces(newFilteredPlaces);
  }

  function resetFilter() {
    setTypeFilter([]);
    setPriceRangeFilter([0, 600]);
    setFilteredPlaces(places);
  }

  if (loading) {
    return (
      <div className="m-auto flex flex-col gap-4 text-lg text-primary">
        <PacmanLoader color="#E07400" className="m-auto" />
        <span>{loadingMessage}</span>
      </div>
    );
  }

  return (
    <div>
      <FilterBar
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        priceRangeFilter={priceRangeFilter}
        setPriceRangeFilter={setPriceRangeFilter}
        filterPlaces={filterPlaces}
        resetFilter={resetFilter}
      />
      {filteredPlaces.length > 0 ? (
        <div
          className={`my-6 grid h-full w-full grid-cols-1 gap-6 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5 
                    2xl:grid-cols-6`}
        >
          {filteredPlaces.map((place, index) => (
            <PlaceContainer key={index} place={place} />
          ))}
        </div>
      ) : (
        <div className="h-screen w-full">
          <div className="my-auto">Cannot find any match...</div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
