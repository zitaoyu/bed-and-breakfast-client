import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import PlacePhotoGallery from "../components/PlacePhotoGallery";
import ShareSaveButtons from "../components/ShareSaveButtons";
import ALL_PERKS from "../util/perks";

const SectionDevider = ({ className }) => {
  return <div className={`h-[1px] w-full bg-slate-dark ${className}`}></div>;
};

const BookingFormWidget = ({ place }) => {
  const price = place?.price || 0;
  const cleaningFee = 100;

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [priceReady, setPriceReady] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);

  useEffect(() => {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 5);
    updateDates(
      today.toISOString().split("T")[0],
      futureDate.toISOString().split("T")[0],
    );
  }, []);

  function updateDates(checkIn, checkOut) {
    const firstDate = new Date(checkIn);
    const secondDate = new Date(checkOut);
    setCheckInDate(firstDate.toISOString().split("T")[0]);
    setCheckOutDate(secondDate.toISOString().split("T")[0]);

    if (firstDate <= secondDate) {
      const differenceMs = Math.abs(secondDate - firstDate);
      const newNights = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setNights(newNights);
      setTotal(price * newNights);
      setServiceFee(price * newNights * 0.1);
      setPriceReady(true);
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  }

  return (
    <div className="mx-auto max-h-[500px] rounded-xl border border-slate-dark bg-white p-6 text-black shadow-around">
      {/* Price per night */}
      <div className="mb-4">
        <span className="text-xl font-semibold text-black">
          ${place?.price}{" "}
        </span>
        night
      </div>
      {/* Booking inputs */}
      <div className="border-grey-light rounded-xl border">
        <div className="flex">
          <div className="flex flex-col gap-1 p-3">
            <label className="text-xs font-semibold">CHECK-IN</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(ev) => updateDates(ev.target.value, checkOutDate)}
            ></input>
          </div>
          <div className="border-grey-light flex flex-col gap-1 border-l p-3">
            <label className="text-xs font-semibold">CHECK-OUT</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(ev) => updateDates(checkInDate, ev.target.value)}
            ></input>
          </div>
        </div>
        <div className="border-grey-light border-t p-3">
          <label className="text-xs font-semibold">Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
          ></input>
        </div>
      </div>
      {/* Reserve button */}
      <button className="my-4 w-full rounded-lg bg-primary px-6 py-2 text-center text-white">
        Reserve
      </button>
      {/* Calculation */}
      {priceReady &&
        (isDateValid ? (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <span className="text-black underline">
                ${place?.price} x {nights} nights
              </span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black underline">Cleaning fee</span>
              <span>${cleaningFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black underline">
                Airbnb service fee (%10)
              </span>
              <span>${serviceFee}</span>
            </div>
            <SectionDevider className={"my-2"} />
            <div className="text-blac flex justify-between font-semibold">
              <span>Total before taxes</span>
              <span>${total + cleaningFee + serviceFee}</span>
            </div>
          </div>
        ) : (
          <div> Please provide valid check-in and check-out dates!</div>
        ))}
    </div>
  );
};

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

  const SectionTitle = ({ title }) => {
    return <h1 className="mb-2 text-xl font-semibold">{title}</h1>;
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-2 text-base text-black lg:px-10">
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

      {/* Description and Book form*/}
      <div className="my-6 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <SectionTitle title={"About this place"} />
          {place?.description}
          <SectionDevider className={"my-6"} />
          <div className="mt-2">
            <SectionTitle title={"What this place offers"} />
            {place?.perks.map((label) => {
              const foundPerk = ALL_PERKS.find((perk) => perk.label === label);
              if (foundPerk) {
                return (
                  <div key={label} className="my-2">
                    <FontAwesomeIcon
                      icon={foundPerk.icon}
                      className="mr-6 h-6 w-6"
                    />
                    {label}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* Booking Form */}
        {place && <BookingFormWidget place={place} />}
      </div>
      <SectionDevider className={"my-10"} />
      {/* Things to know */}
      <div>
        <SectionTitle title={"Things to know"} />
        <div className="grid grid-cols-3">
          <div className="flex flex-col gap-2 pt-2">
            <span className="font-semibold">House rules</span>
            <span>{place?.checkIn}</span>
            <span>{place?.checkOut}</span>
            <span>{place?.maxGuests} guests maximum</span>
            <a className="font-semibold underline">Show more</a>
          </div>
          <div className="flex flex-col gap-4 pt-2">
            <span className="font-semibold">Safety & property</span>
            <span>Self check-in</span>
            <span>Smoke alarm</span>
            <span>Carbon monoxide alarm</span>
            <a className="font-semibold underline">Show more</a>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <span className="font-semibold">Cancelation policy</span>
            <span>Free cancellation for 48 hours.</span>
            <span>
              Review the Host's full cancellation policy which applies even if
              you cancel for illness or disruptions caused by COVID-19.
            </span>
            <a className="font-semibold underline">Show more</a>
          </div>
        </div>
        {/* More information */}
        <SectionDevider className={"my-10"} />
        <div>
          <SectionTitle title={"More Information"} />
          {place?.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
