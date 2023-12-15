import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouseFlag,
  faHouseLock,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../contexts/UserContext";

const ProfilePageNavBar = () => {
  const { ready, userInfo } = useContext(UserContext);

  const { pathname } = useLocation();
  let subpage = pathname.split("/")?.[2];
  if (subpage === undefined || subpage === "") {
    subpage = "profile";
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
    <div className="">
      <h1 className="text-3xl font-semibold text-black">Account</h1>
      <span>
        {userInfo.name}, {userInfo.email}
      </span>
      <nav className="flex grow flex-col gap-0 whitespace-nowrap sm:h-auto sm:flex-row sm:justify-around sm:gap-6 md:gap-12">
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
    </div>
  );
};

export default ProfilePageNavBar;
