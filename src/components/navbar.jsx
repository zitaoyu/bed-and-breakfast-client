import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import { Icon } from "./Icon";
import { ICONS } from "../util/icons";

const Logo = ({ className }) => {
  return (
    <Link to={"/"} className={`my-auto flex gap-2 text-primary ${className}`}>
      <Icon className="text-4xl" icon={ICONS.LOGO} />
      <h1 className="translate-y-2 text-xl font-bold">bednbreakfast</h1>
    </Link>
  );
};

const SearchBar = ({ className }) => {
  return (
    <div
      className={`outline-slate-300 hover:shadow-slate-300 mx-6 my-auto flex h-12 justify-between whitespace-nowrap rounded-full text-black shadow-lg outline outline-1 ${className}`}
    >
      <button className="px-10 sm:px-4">
        <div className="my-auto">Anywhere</div>
      </button>
      <div className="my-2 hidden w-[1px] bg-grey sm:block"></div>
      <button className="hidden px-4 sm:block">
        <div className="my-auto">Any week</div>
      </button>
      <div className="my-2 hidden w-[1px] bg-grey sm:block"></div>
      <button className="hidden px-4 sm:block">
        <div className="my-auto text-grey">Add guests</div>
      </button>
      <button className="my-auto mr-2 h-8 w-8 rounded-full bg-primary">
        <Icon className="m-auto text-white" icon={ICONS.EARTH} />
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
          <Icon className="m-auto" icon={ICONS.EARTH} />
        </button>
      </Link>
      <button
        className={`shadow-slate-300 outline-slate-300 relative flex  h-full rounded-full p-2 outline outline-1  ${
          showMenu ? "bg-white shadow-md" : "hover:shadow-md"
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <Icon className="my-auto ml-2 mr-4" icon={ICONS.BARS} />
        <Icon
          className={`m-auto h-8 w-8 ${
            isUserLogin ? "text-primary" : "text-grey"
          }`}
          icon={ICONS.USER}
        />
        <span className="my-auto hidden px-2 md:block">
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
  const pages = ["/login", "/register", "/about"];
  const isLoginRegisterPage = pages.includes(location.pathname);
  return (
    <div>
      <header className="borderb grid h-20 grid-flow-col justify-items-stretch border-[#ebebeb]">
        <Logo className="justify-self-start" />
        {/* {isIndexPage && <SearchBar className="mx-auto justify-self-stretch" />} */}
        <ProfileBar className="justify-self-end" />
      </header>
      {!isLoginRegisterPage && (
        <div className="absolute left-0 h-[1px] w-screen bg-[#ebebeb]" />
      )}
    </div>
  );
};

export default NavBar;
