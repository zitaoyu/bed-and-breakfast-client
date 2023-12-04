import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faMagnifyingGlass,
  faEarthAmericas,
  faBars,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

const Logo = ({ className }) => {
  return (
    <Link to={"/"} className={`text-primary my-auto flex gap-2 ${className}`}>
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
      className={`mx-6 my-auto flex h-12 justify-between whitespace-nowrap rounded-full text-black shadow-lg outline outline-1 outline-slate-300 hover:shadow-slate-300 ${className}`}
    >
      <button className="px-4">
        <div className="my-auto">Anywhere</div>
      </button>
      <div className="my-2 w-[1px] bg-slate-400"></div>
      <button className="px-4">
        <div className="my-auto">Any week</div>
      </button>
      <div className="my-2 w-[1px] bg-slate-400"></div>
      <button className="px-4">
        <div className="my-auto text-grey">Add guests</div>
      </button>
      <button className="bg-primary my-auto mr-2 h-8 w-8 rounded-full">
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

  return (
    <div
      className={`my-auto flex h-12 gap-1 whitespace-nowrap rounded-full text-black ${className}`}
    >
      <button className="hidden h-full rounded-full px-4 hover:bg-slate-100 lg:block">
        List your home
      </button>
      <button className="hidden h-full rounded-full px-4 hover:bg-slate-100 lg:block">
        <FontAwesomeIcon className="m-auto" icon={faEarthAmericas} />
      </button>
      <button
        className={`relative flex h-full rounded-full  p-2 shadow-slate-300 outline outline-1 outline-slate-300  ${
          showMenu ? "bg-white shadow-md" : "hover:shadow-md"
        }`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon className="my-auto ml-2 mr-4" icon={faBars} />
        <FontAwesomeIcon
          className="m-auto h-8 w-8 text-grey"
          icon={faCircleUser}
        />
        {/* Pop up Menu */}
        {showMenu && (
          <div className=" shadow-around absolute right-0 top-full z-10 mt-2 flex w-60 flex-col rounded-lg bg-white py-2 text-left">
            <Link
              className="px-4 py-2 font-semibold hover:bg-slate-100"
              to={"/register"}
            >
              Sign Up
            </Link>
            <Link className="px-4 py-2 hover:bg-slate-100" to={"/login"}>
              Login
            </Link>
          </div>
        )}
      </button>
    </div>
  );
};

const NavBar = () => {
  return (
    <header className="grid h-20 grid-flow-col justify-items-stretch">
      <Logo className="justify-self-start" />
      <SearchBar className="mx-auto justify-self-stretch" />
      <ProfileBar className="justify-self-end" />
    </header>
  );
};

export default NavBar;
