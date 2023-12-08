import { useContext } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

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
    let className = "rounded-full py-2 px-4 mx-6 text-black my-2";
    if (linkTo === subpage) {
      className += " bg-primary text-white";
    } else {
      className += " hover:bg-slate";
    }
    return className;
  }

  return (
    <div className="mx-auto flex w-1/2 max-w-3xl flex-col gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-black">Account</h1>
        <span>
          {userInfo.name}, {userInfo.email}
        </span>
      </div>
      <nav className="flex h-14 justify-around whitespace-nowrap">
        <Link to={"/account/"} className={getLinkClasses("profile")}>
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={getLinkClasses("bookings")}>
          Bookings
        </Link>
        <Link to={"/account/listings"} className={getLinkClasses("listings")}>
          Listings
        </Link>
      </nav>
      {subpage === "profile" && <div>Profile subpage</div>}
      {subpage === "bookings" && <div>Bookings subpage</div>}
      {subpage === "listings" && <div>Listings subpage</div>}
    </div>
  );
};

export default AccountPage;
