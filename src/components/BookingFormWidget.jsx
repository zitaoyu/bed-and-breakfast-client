import { useContext, useEffect, useState } from "react";
import SectionDivider from "./SectionDivider";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";

const BookingFormWidget = ({ place }) => {
  const { ready, userInfo } = useContext(UserContext);
  const price = place?.price || 0;
  const cleaningFee = 100;

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const [serviceFee, setServiceFee] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [priceReady, setPriceReady] = useState(false);
  const [isDateValid, setIsDateValid] = useState(true);
  const [reserved, setReserved] = useState(false);
  const [nevigateToLogin, setNevigateToLogin] = useState(false);

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
      setFinalTotal(price * newNights + price * newNights * 0.1 + cleaningFee);
      setPriceReady(true);
      setIsDateValid(true);
    } else {
      setIsDateValid(false);
    }
  }

  async function submitReserve() {
    if (ready && userInfo) {
      const bookingData = {
        booker: userInfo._id,
        place: place._id,
        checkInDate,
        checkOutDate,
        guests,
        total: finalTotal,
      };
      try {
        await axios.post("/bookings", bookingData);
        setReserved(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      setNevigateToLogin(true);
    }
  }

  if (nevigateToLogin) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mx-auto max-h-[500px] rounded-xl border border-slate-dark bg-white p-4 text-black shadow-around sm:p-6">
      {/* Price per night */}
      <div className="mb-4">
        <span className="text-xl font-semibold text-black">
          ${place?.price}{" "}
        </span>
        night
      </div>
      {/* Booking inputs */}
      <div className="rounded-xl border border-grey-light">
        <div className="flex">
          <div className="flex flex-col gap-1 p-3">
            <label className="text-xs font-semibold">CHECK-IN</label>
            <input
              type="date"
              value={checkInDate}
              onChange={(ev) => updateDates(ev.target.value, checkOutDate)}
            ></input>
          </div>
          <div className="flex flex-col gap-1 border-l border-grey-light p-3">
            <label className="text-xs font-semibold">CHECK-OUT</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(ev) => updateDates(checkInDate, ev.target.value)}
            ></input>
          </div>
        </div>
        <div className="border-t border-grey-light p-3">
          <label className="text-xs font-semibold">Guests</label>
          <input
            type="number"
            value={guests}
            onChange={(ev) => setGuests(ev.target.value)}
          ></input>
        </div>
      </div>
      {/* Reserve button */}
      <button
        className={
          "my-4 w-full rounded-lg  px-6 py-2 text-center text-white " +
          (!isDateValid ? "bg-grey" : "bg-primary")
        }
        onClick={submitReserve}
        disabled={!isDateValid || reserved}
      >
        {reserved ? "Reserved :)" : "Reserve"}
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
            <SectionDivider className={"my-2"} />
            <div className="text-blac flex justify-between font-semibold">
              <span>Total before taxes</span>
              <span>${finalTotal}</span>
            </div>
          </div>
        ) : (
          <div> Please provide valid check-in and check-out dates!</div>
        ))}
    </div>
  );
};

export default BookingFormWidget;
