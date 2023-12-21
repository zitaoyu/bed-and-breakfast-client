import { Link } from "react-router-dom";
import ProfilePageContainer from "../components/ProfilePageContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

const MyBookingWidget = ({ booking, placeId }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (placeId) {
      axios
        .get(`/places/${placeId}`)
        .then((response) => {
          setPlace(response.data);
        })
        .catch(() => {
          alert("Cannot fetch place data, redirecting...");
        });
    }
  }, []);

  return (
    place &&
    booking && (
      <Link
        to={"/places/" + place?._id}
        className="flex w-full cursor-pointer grid-cols-[1fr_2fr] gap-4 rounded-2xl bg-slate p-4 shadow-md hover:bg-slate-dark"
      >
        <div className="shrink-0">
          <img
            src={place?.photos[0]}
            className="aspect-square h-32 rounded-2xl object-cover"
          ></img>
        </div>

        <div className="flex grow flex-col justify-between overflow-hidden text-xs text-black sm:text-sm">
          <h2 className="mb-2 truncate text-base font-semibold text-black md:text-xl">
            {place.title}
          </h2>
          <div>
            <div className="flex">
              <span className="sm:w-32">Check in date: </span>
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                {booking.checkInDate.split("T")[0]}
              </span>
            </div>
            <div className="flex">
              <span className="sm:w-32">Check out date:</span>
              <span className="font-semibold">
                <FontAwesomeIcon icon={faCalendar} className="mr-1" />
                {booking.checkOutDate.split("T")[0]}
              </span>
            </div>
            <div>Maximum guests: {booking.guests}</div>
          </div>
          <div className="flex justify-end text-base font-semibold md:text-lg">
            <span>Total: ${booking.total}</span>
          </div>
        </div>
      </Link>
    )
  );
};

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get("/bookings")
      .then(({ data }) => {
        setBookings(data);
      })
      .catch(() => {
        alert("Unable to fetch listed places.");
      });
  }, []);

  function cancelBooking(booking) {
    axios
      .delete("/bookings", { data: { id: booking._id } })
      .then(setBookings(bookings.filter((b) => b._id !== booking._id)))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ProfilePageContainer>
      <div className="mb-4 flex max-w-full flex-col gap-4">
        {bookings.length > 0 ? (
          <button
            onClick={() => setEditMode(!editMode)}
            className="inline-block w-full rounded-xl bg-slate px-6 py-2 text-center text-black hover:bg-slate-dark"
          >
            {editMode ? "Cancel" : "Remove booking"}
          </button>
        ) : (
          <div className="m-auto">
            <h1 className="my-10 text-xl text-grey">
              You do not have any booking yet.
            </h1>
            <Link
              to={"/"}
              className="inline-block w-full rounded-xl bg-slate px-6 py-2 text-center text-black hover:bg-slate-dark"
            >
              Browse Places
            </Link>
          </div>
        )}
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <div key={booking._id} className="relative">
              <MyBookingWidget booking={booking} placeId={booking.place} />
              {editMode && (
                <button
                  onClick={() => cancelBooking(booking)}
                  className="absolute -right-2 -top-2 z-10 text-3xl text-red-500"
                >
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="rounded-full bg-white"
                  />
                </button>
              )}
            </div>
          ))}
      </div>
    </ProfilePageContainer>
  );
};

export default BookingPage;
