import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugHot,
  faMagnifyingGlass,
  faEarthAmericas,
  faBars,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

const Logo = ({ className }) => {
  return (
    <div className={`my-auto flex gap-2 text-airbnbRed ${className}`}>
      <FontAwesomeIcon className="my-auto text-4xl" icon={faMugHot} />
      <h1 className="my-auto text-2xl font-bold">bednbreakfast</h1>
    </div>
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
        <div className="text-grey my-auto">Add guests</div>
      </button>
      <button className="my-auto mr-2 h-8 w-8 rounded-full bg-airbnbRed">
        <FontAwesomeIcon
          className="m-auto text-white"
          icon={faMagnifyingGlass}
        />
      </button>
    </div>
  );
};

const ProfileBar = ({ className }) => {
  return (
    <div
      className={`my-auto flex h-12 gap-1 whitespace-nowrap rounded-full text-black ${className}`}
    >
      <button className="h-full rounded-full px-4 hover:bg-slate-100">
        Rent your home
      </button>
      <button className="h-full rounded-full px-4 hover:bg-slate-100">
        <FontAwesomeIcon className="m-auto" icon={faEarthAmericas} />
      </button>
      <button className="flex h-full rounded-full p-2 outline outline-1 outline-slate-300 hover:shadow-md hover:shadow-slate-300">
        <FontAwesomeIcon className="my-auto ml-2 mr-4" icon={faBars} />
        <FontAwesomeIcon
          className="text-grey m-auto h-8 w-8"
          icon={faCircleUser}
        />
      </button>
    </div>
  );
};

const NavBar = () => {
  return (
    <header className="grid h-20 grid-flow-col justify-items-stretch px-10">
      <Logo className="self-center justify-self-start" />
      <SearchBar className="mx-auto justify-self-stretch" />
      <ProfileBar className="self-end justify-self-end" />
    </header>
  );
};

export default NavBar;
