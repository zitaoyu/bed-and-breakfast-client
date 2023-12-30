import { Icon } from "../components/Icon";
import { ICONS } from "../util/icons.js";

const ShareSaveButtons = () => {
  return (
    <div className="flex gap-4 font-semibold text-black underline">
      <button className="rounded-xl p-2 hover:bg-slate">
        <Icon className="m-auto mr-2" icon={ICONS.SHARE} />
        Share
      </button>
      <button className="rounded-xl p-2 hover:bg-slate">
        <Icon className="m-auto mr-2" icon={ICONS.LIKE} />
        Save
      </button>
    </div>
  );
};

export default ShareSaveButtons;
