import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBath,
  faCar,
  faCloudArrowUp,
  faHouseFlag,
  faHouseLock,
  faIdCard,
  faPlus,
  faSnowflake,
  faTv,
  faUtensils,
  faWifi,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProfileSubpage = () => {
  return <div>Profile subpage</div>;
};

const BookingSubpage = () => {
  return <div>Booking subpage</div>;
};

const FormInput = ({
  title,
  placeholder = "",
  inputType = "text",
  state = undefined,
  stateSetter = undefined,
  isTextarea = false,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-black">{title}</h2>
      {isTextarea ? (
        <textarea className="h-40" />
      ) : (
        <input
          type={inputType}
          placeholder={placeholder}
          value={state}
          onChange={(ev) => stateSetter(ev.target.value)}
        />
      )}
    </div>
  );
};

const ListingSubpage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(0);

  const checkboxes = [
    { id: 1, icon: faWifi, label: "Wifi" },
    { id: 2, icon: faCar, label: "Free parking" },
    { id: 3, icon: faTv, label: "TV" },
    { id: 4, icon: faUtensils, label: "Kitchen" },
    { id: 5, icon: faSnowflake, label: "Air conditioning" },
    { id: 6, icon: faBath, label: "Bathtub" },
  ];

  function handlePerksCheckBoxChange(ev) {
    const { name, checked } = ev.target;
    setPerks((prevPerks) => {
      if (checked) {
        return [...prevPerks, name];
      } else {
        return prevPerks.filter((perkName) => perkName !== name);
      }
    });
  }

  async function handlePhotoUploadByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/upload-by-link", {
        url: photoLink,
      });
      // setPhotoLink("");
      if (response.data.filename) {
        setAddedPhotos([
          ...addedPhotos,
          "http://localhost:4000" + response.data.filename,
        ]);
      }
    } catch (error) {
      alert("Upload failed, please try again!");
    }
  }

  function handlePhotoUpload(ev) {
    ev.preventDefault();
    const files = ev.target.files;
    const data = new FormData();
    data.set("photos", files);
    for (const file of files) {
      data.append("photos", file);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const filenames = response.data.filenames;
        if (filenames && filenames.length > 0) {
          for (let i = 0; i < filenames.length; i++)
            [(filenames[i] = "http://localhost:4000" + filenames[i])];
          setAddedPhotos([...addedPhotos, ...filenames]);
        }
      })
      .catch(() => {
        alert("Upload failed, please try again!");
      });
  }

  return (
    <div className="flex flex-col">
      {action === "new" ? (
        <form className="mt-6 flex flex-col gap-4">
          {/* Title */}
          <FormInput
            title="Title:"
            placeholder="example: Waterfront Cabin"
            state={title}
            stateSetter={setTitle}
          />
          {/* Address */}
          <FormInput
            title="Address:"
            placeholder="address of this place"
            state={address}
            stateSetter={setAddress}
          />

          {/* Photo Upload */}
          <div>
            <h2 className="text-2xl font-semibold text-black">Photos:</h2>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Add using a link... (jpg or png)"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              ></input>
              <button
                className="hover:bg-slate-dark my-1 whitespace-nowrap rounded-xl bg-slate px-6"
                onClick={handlePhotoUploadByLink}
              >
                Add photo
              </button>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-2 md:grid-cols-4">
              {/* Uploaded Photos */}
              {addedPhotos.length > 0 &&
                addedPhotos.map((photoLink) => (
                  <img
                    src={photoLink}
                    className="h-32 w-full rounded-2xl object-cover"
                  ></img>
                ))}
              <label className="flex h-32 cursor-pointer items-center justify-center rounded-2xl border text-center text-xl hover:bg-slate">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
                <FontAwesomeIcon icon={faCloudArrowUp} /> Upload
              </label>
            </div>
          </div>

          {/* Description */}
          <FormInput
            title="Description:"
            placeholder="details about this place"
            isTextarea={true}
            state={description}
            stateSetter={setDescription}
          />

          {/* Perks */}
          <h2 className="text-2xl font-semibold text-black">Amenities:</h2>
          <div className="grid grid-cols-2 gap-1 text-lg text-black lg:grid-cols-3">
            {checkboxes.map((checkbox) => (
              <label
                key={checkbox.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border p-4 accent-primary ${
                  perks.includes(checkbox.label) && "bg-slate"
                }`}
              >
                <input
                  type="checkbox"
                  name={checkbox.label}
                  className="mr-2"
                  onClick={(ev) => handlePerksCheckBoxChange(ev)}
                />
                {checkbox.icon && (
                  <FontAwesomeIcon className="text-2xl" icon={checkbox.icon} />
                )}
                <span>{checkbox.label}</span>
              </label>
            ))}
          </div>

          {/* Extra Info */}
          <FormInput
            title="Extra information:"
            placeholder="additional information you would like your guests to know"
            isTextarea={true}
            state={extraInfo}
            stateSetter={setExtraInfo}
          />
          {/* Check in time*/}
          <FormInput
            title="Check in time:"
            placeholder="example: 10:00 AM"
            state={checkIn}
            stateSetter={setCheckIn}
          />
          {/* Check out time */}
          <FormInput
            title="Check out time:"
            placeholder="example: 1:00 PM"
            state={checkOut}
            stateSetter={setCheckOut}
          />
          {/* Max guests */}
          <FormInput
            title="Max number of guests:"
            placeholder="2"
            inputType="number"
            state={maxGuests}
            stateSetter={setMaxGuests}
          />
          <button className="my-4 w-full rounded-xl bg-primary px-6 py-2 text-center text-white">
            Save
          </button>
        </form>
      ) : (
        <Link
          to={"/account/listings/new"}
          className="hover:bg-slate-dark inline-block w-full rounded-xl bg-slate px-6 py-2 text-center text-black"
        >
          <FontAwesomeIcon className="mr-2 text-xl" icon={faPlus} />
          Add New Accommodation
        </Link>
      )}
    </div>
  );
};

const AccountPage = () => {
  const { ready, userInfo } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  // if userInfo is not yet loaded
  if (!ready) {
    return <h1>Loading...</h1>;
  }

  // if userInfo is loaded but no userInfo
  if (ready && !userInfo) {
    return <Navigate to={"/login"} />;
  }

  function getLinkClasses(linkTo) {
    let className = "my-2 grow rounded-full px-2 py-2 text-center text-black";
    if (linkTo === subpage) {
      className += " bg-primary text-white";
    } else {
      className += " bg-slate hover:bg-slate-dark";
    }
    return className;
  }

  return (
    <div className="mx-auto flex w-full min-w-fit max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-black">Account</h1>
        <span>
          {userInfo.name}, {userInfo.email}
        </span>
      </div>
      <nav className="flex h-14 justify-around gap-6 whitespace-nowrap md:gap-12">
        <Link to={"/account/"} className={getLinkClasses("profile")}>
          <FontAwesomeIcon className="mr-2 text-xl" icon={faIdCard} />
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={getLinkClasses("bookings")}>
          <FontAwesomeIcon className="mr-2 text-xl" icon={faHouseFlag} />
          Bookings
        </Link>
        <Link to={"/account/listings"} className={getLinkClasses("listings")}>
          <FontAwesomeIcon className="mr-2 text-xl" icon={faHouseLock} />
          Accommodations
        </Link>
      </nav>
      {subpage === "profile" && <ProfileSubpage />}
      {subpage === "bookings" && <BookingSubpage />}
      {subpage === "listings" && <ListingSubpage />}
    </div>
  );
};

export default AccountPage;
