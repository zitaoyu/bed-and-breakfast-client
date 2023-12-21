import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import ProfilePageNavBar from "./ProfilePageNav";

const ProfilePageContainer = ({ children }) => {
  const { ready, userInfo } = useContext(UserContext);

  // if userInfo is not yet loaded
  if (!ready) {
    return <h1 className="m-auto text-xl font-bold">Loading...</h1>;
  }

  // if userInfo is loaded but no userInfo
  if (ready && !userInfo) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="mx-auto mt-2 flex w-full flex-col gap-4 lg:w-3/4">
      <ProfilePageNavBar />
      {children}
    </div>
  );
};

export default ProfilePageContainer;
