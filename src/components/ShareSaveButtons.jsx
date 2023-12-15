import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

const ShareSaveButtons = () => {
  return (
    <div className="flex gap-4 font-semibold text-black underline">
      <button className="rounded-xl p-2 hover:bg-slate">
        <FontAwesomeIcon className="m-auto mr-2" icon={faArrowUpFromBracket} />
        Share
      </button>
      <button className="rounded-xl p-2 hover:bg-slate">
        <FontAwesomeIcon className="m-auto mr-2" icon={faHeart} />
        Save
      </button>
    </div>
  );
};

export default ShareSaveButtons;
