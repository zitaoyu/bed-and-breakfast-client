import { useContext, useState } from "react";
import ProfilePageContainer from "../components/ProfilePageContainer";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const ProfilePage = () => {
  const { ready, userInfo } = useContext(UserContext);
  const [loadedProfile, setLoadedProfile] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [editMode, setEditMode] = useState(false);

  if (ready && userInfo && !loadedProfile) {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setLoadedProfile(true);
  }

  async function submitProfileUpdate() {
    if (name !== userInfo.name || email !== userInfo.email || password) {
      try {
        await axios.put("/register", {
          name,
          email,
          password,
        });
      } catch (error) {
        console.log(error);
      }
    }
    setEditMode(!editMode);
  }

  function cancelEdit() {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setPassword("");
    setEditMode(false);
  }

  return (
    <ProfilePageContainer>
      {ready && (
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-black">Name:</h2>
            <input
              type="text"
              value={name}
              disabled={!editMode}
              onChange={(ev) => setName(ev.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-black">Email:</h2>
            <input
              type="text"
              value={email}
              disabled={!editMode}
              onChange={(ev) => setEmail(ev.target.value)}
            ></input>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-black">New password:</h2>
            <input
              type="password"
              value={password}
              disabled={!editMode}
              onChange={(ev) => setPassword(ev.target.value)}
            ></input>
          </div>

          {editMode ? (
            <button
              onClick={submitProfileUpdate}
              className="w-full rounded-xl bg-primary px-6  py-2 text-center text-white"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setEditMode(!editMode)}
              className="w-full rounded-xl bg-slate-dark px-6  py-2 text-center text-black"
            >
              Edit
            </button>
          )}

          {editMode && (
            <button
              onClick={cancelEdit}
              className="w-full rounded-xl bg-slate-dark px-6 py-2 text-center text-black"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </ProfilePageContainer>
  );
};

export default ProfilePage;
