import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { Icon } from "./Icon";
import { ICONS } from "../util/icons";

const ProfilePageNavBar = () => {
  const { userInfo } = useContext(UserContext);

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
          <Icon className="mr-2 text-xl" icon={ICONS.PROFILE} />
          My Profile
        </Link>
        <Link to={"/account/bookings"} className={getLinkClasses("bookings")}>
          <Icon className="mr-2 text-xl" icon={ICONS.BOOKINGS} />
          Bookings
        </Link>
        <Link to={"/account/listings"} className={getLinkClasses("listings")}>
          <Icon className="mr-2 text-xl" icon={ICONS.ACCOMMODATIONS} />
          Accommodations
        </Link>
      </nav>
    </div>
  );
};

export default ProfilePageNavBar;
