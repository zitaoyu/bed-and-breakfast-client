import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faMagnifyingGlass,
  faEarthAmericas,
  faBars,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

const Logo = ({ className }) => {
  return (
    <Link to={"/"} className={`my-auto flex gap-2 text-primary ${className}`}>
      <FontAwesomeIcon className="text-4xl" icon={faMugHot} />
      <h1 className="hidden translate-y-2 text-2xl font-bold lg:block">
        bednbreakfast
      </h1>
    </Link>
  );
};

const SearchBar = ({ className }) => {
  return (
    <div
      className={`outline-slate-300 hover:shadow-slate-300 mx-6 my-auto flex h-12 justify-between whitespace-nowrap rounded-full text-black shadow-lg outline outline-1 ${className}`}
    >
      <button className="px-4">
        <div className="my-auto">Anywhere</div>
      </button>
      <div className="bg-slate-400 my-2 w-[1px]"></div>
      <button className="px-4">
        <div className="my-auto">Any week</div>
      </button>
      <div className="bg-slate-400 my-2 w-[1px]"></div>
      <button className="px-4">
        <div className="my-auto text-grey">Add guests</div>
      </button>
      <button className="my-auto mr-2 h-8 w-8 rounded-full bg-primary">
        <FontAwesomeIcon
          className="m-auto text-white"
          icon={faMagnifyingGlass}
        />
      </button>
    </div>
  );
};

const ProfileBar = ({ className }) => {
  const [showMenu, setShowMenu] = useState(false);

  const { userInfo, setUserInfo } = useContext(UserContext);
  const isUserLogin = !!userInfo;

  const linkClassName = "hover:bg-slate px-4 py-2";

  async function handleUserLogout() {
    await axios.post("/logout");
    // remove userInfo state
    setUserInfo(null);
  }

  return (
    <div
      className={`my-auto flex h-12 gap-1 whitespace-nowrap rounded-full text-black ${className}`}
    >
      <Link to={"/account/listings"}>
        <button className="hidden h-full rounded-full px-4 hover:bg-slate lg:block">
          List your home
        </button>
      </Link>
      <Link to={"account/bookings"}>
        <button className="hidden h-full rounded-full px-4 hover:bg-slate lg:block">
          <FontAwesomeIcon className="m-auto" icon={faEarthAmericas} />
        </button>
      </Link>
      <button
        className={`shadow-slate-300 outline-slate-300 relative flex  h-full rounded-full p-2 outline outline-1  ${
          showMenu ? "bg-white shadow-md" : "hover:shadow-md"
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon className="my-auto ml-2 mr-4" icon={faBars} />
        <FontAwesomeIcon
          className={`m-auto h-8 w-8 ${
            isUserLogin ? "text-primary" : "text-grey"
          }`}
          icon={faCircleUser}
        />
        <span className="my-auto px-2">
          {isUserLogin ? userInfo.name : "Guest"}
        </span>
        {/* Pop up Menu */}
        {showMenu &&
          (isUserLogin ? (
            <div className="absolute right-0 top-full z-10 mt-2 flex w-60 flex-col rounded-lg bg-white py-2 text-left shadow-around">
              <Link className={linkClassName} to={"/account"}>
                Account
              </Link>
              <Link
                className={linkClassName}
                onClick={handleUserLogout}
                to={"/"}
              >
                Log out
              </Link>
            </div>
          ) : (
            <div className="absolute right-0 top-full z-10 mt-2 flex w-60 flex-col rounded-lg bg-white py-2 text-left shadow-around">
              <Link className={linkClassName} to={"/register"}>
                Sign up
              </Link>
              <Link className={linkClassName} to={"/login"}>
                Log in
              </Link>
            </div>
          ))}
      </button>
    </div>
  );
};

const NavBar = () => {
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  return (
    <div>
      <header className="grid h-20 grid-flow-col justify-items-stretch">
        <Logo className="justify-self-start" />
        {isIndexPage && <SearchBar className="mx-auto justify-self-stretch" />}
        <ProfileBar className="justify-self-end" />
      </header>
      <div className="absolute left-0 h-[1px] w-screen bg-[#ebebeb]"></div>
    </div>
  );
};

export default NavBar;
