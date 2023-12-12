import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import ProfilePageContainer from "../components/ProfilePageContainer";

const ListingPage = () => {
  return (
    <ProfilePageContainer>
      <Link
        to={"/account/listings/new"}
        className="inline-block w-full rounded-xl bg-slate px-6 py-2 text-center text-black hover:bg-slate-dark"
      >
        <FontAwesomeIcon className="mr-2 text-xl" icon={faPlus} />
        Add New Accommodation
      </Link>
    </ProfilePageContainer>
  );
};

export default ListingPage;
