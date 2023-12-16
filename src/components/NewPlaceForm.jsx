import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faTrashCan,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ALL_PERKS from "../util/perks";

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
        <textarea
          className="h-40"
          placeholder={placeholder}
          value={state}
          onChange={(ev) => stateSetter(ev.target.value)}
        />
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

const PhotoUploader = ({ addedPhotos, setAddedPhotos }) => {
  const [photoLink, setPhotoLink] = useState("");

  async function handlePhotoUploadByLink(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post("/upload-by-link", {
        url: photoLink,
      });
      if (response.data.filename) {
        setAddedPhotos([
          ...addedPhotos,
          "http://localhost:4000/uploads/" + response.data.filename,
        ]);
      }
      setPhotoLink("");
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
            [(filenames[i] = "http://localhost:4000/uploads/" + filenames[i])];
          setAddedPhotos([...addedPhotos, ...filenames]);
        }
      })
      .catch(() => {
        alert("Upload failed, please try again!");
      });
  }

  function removePhoto(ev, photoLink) {
    ev.preventDefault();
    setAddedPhotos(addedPhotos.filter((link) => link !== photoLink));
  }

  function setPrimaryPhoto(ev, photoLink) {
    ev.preventDefault();
    const otherPhotos = addedPhotos.filter((link) => link !== photoLink);
    setAddedPhotos([photoLink, ...otherPhotos]);
  }

  return (
    <div className="text-black">
      <div className="flex gap-2">
        <input
          type="url"
          placeholder="Add using a link... (jpg or png)"
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
        ></input>
        <button
          className="my-1 whitespace-nowrap rounded-xl bg-slate px-6 hover:bg-slate-dark"
          onClick={handlePhotoUploadByLink}
        >
          Add photo
        </button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Uploaded Photos */}
        {addedPhotos.length > 0 &&
          addedPhotos.map((photoLink) => (
            <div key={photoLink} className="relative flex h-40">
              <img
                src={photoLink}
                className="w-full rounded-2xl object-cover"
              ></img>
              <div className="absolute bottom-1 right-1 flex gap-2">
                <button
                  onClick={(ev) => setPrimaryPhoto(ev, photoLink)}
                  className={`${
                    photoLink === addedPhotos[0] && "text-yellow-500 opacity-80"
                  } cursor-pointer rounded-xl bg-slate px-3 py-2 text-lg text-black opacity-50 hover:opacity-80`}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
                <button
                  onClick={(ev) => removePhoto(ev, photoLink)}
                  className="cursor-pointer rounded-xl bg-slate px-3 py-2 text-lg text-black opacity-50 hover:opacity-80"
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
          ))}
        <label className="flex h-40 cursor-pointer items-center justify-center rounded-2xl border text-center text-xl hover:bg-slate">
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
  );
};

const NewPlaceForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("After 4:00 PM");
  const [checkOut, setCheckOut] = useState("Before 11:00 AM");
  const [maxGuests, setMaxGuests] = useState(0);
  const [price, setPrice] = useState(100);
  const [redirectToListing, setRedirectToListing] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`/places/${id}`)
        .then((response) => {
          const { data } = response;
          setTitle(data.title);
          setAddress(data.address);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setCheckIn(data.checkIn);
          setCheckOut(data.checkOut);
          setMaxGuests(data.maxGuests);
          setPrice(data.price);
        })
        .catch(() => {
          alert("Cannot fetch place data, redirecting...");
        });
    }
  }, []);

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

  async function handleSavePlace(ev) {
    ev.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      // update place
      await axios.put("/user-places", { id, ...placeData });
    } else {
      // create new place
      await axios.post("/user-places", placeData);
    }
    setRedirectToListing(true);
  }

  async function removeListing(ev) {
    ev.preventDefault();
    // delete place
    await axios.delete("/user-places", { data: { id } });
    setRedirectToListing(true);
  }

  function cancelEditing(ev) {
    ev.preventDefault();
    setRedirectToListing(true);
  }

  if (redirectToListing) {
    return <Navigate to={"/account/listings"} />;
  }

  return (
    <form className="my-6 flex flex-col gap-4" onSubmit={handleSavePlace}>
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
        <PhotoUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />
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
      <div className="grid grid-cols-1 gap-1 text-lg text-black sm:grid-cols-2 lg:grid-cols-3">
        {ALL_PERKS.map((perk, index) => (
          <label
            key={index}
            className={`flex cursor-pointer items-center gap-2 rounded-xl border p-4 accent-primary ${
              perks.includes(perk.label) && "bg-slate"
            }`}
          >
            <input
              type="checkbox"
              checked={perks.includes(perk.label)}
              name={perk.label}
              className="mr-2"
              onChange={(ev) => handlePerksCheckBoxChange(ev)}
            />
            {perk.icon && (
              <FontAwesomeIcon className="text-2xl" icon={perk.icon} />
            )}
            <span>{perk.label}</span>
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
      {/* Price Per Night */}
      <FormInput
        title="Price per night:"
        placeholder="100"
        inputType="number"
        state={price}
        stateSetter={setPrice}
      />
      <button className="w-full rounded-xl bg-primary px-6 py-2 text-center text-white">
        Save
      </button>
      <button
        onClick={(ev) => cancelEditing(ev)}
        className="w-full rounded-xl bg-slate-dark px-6 py-2 text-center text-black"
      >
        Cancel
      </button>
      {id && (
        <button
          onClick={(ev) => removeListing(ev)}
          className="w-full rounded-xl bg-grey px-6 py-2 text-center text-white"
        >
          Delete
        </button>
      )}
    </form>
  );
};

export default NewPlaceForm;
