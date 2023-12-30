import { Link } from "react-router-dom";
import SectionDivider from "./SectionDivider";
import { Icon } from "./Icon";
import { ICONS } from "../util/icons";

const Footer = () => {
  const tables = [
    {
      title: "Support",
      items: [
        "Help Center",
        "Cancellation options",
        "Get help with a safety issue",
      ],
    },
    {
      title: "Hosting",
      items: ["Hosts Helper Center", "List your home", "Hosting responsibly"],
    },
    {
      title: "Learn more",
      items: ["New features", "Careers", "More Info"],
    },
  ];

  return (
    <div className="border-t border-slate-dark bg-slate px-10 py-3 text-black">
      <div className="my-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {tables.map((table) => (
          <div key={table.title} className="grid grid-cols-1 gap-2">
            <div className="font-semibold">{table.title}</div>
            {table.items.map((item) => (
              <div key={item} className="hover:underline">
                {item}
              </div>
            ))}
            <SectionDivider className={"md:hidden"} />
          </div>
        ))}
      </div>
      <SectionDivider className={"hidden md:block"} />
      <div className="mt-6 grid w-full grid-cols-1 gap-2 font-medium md:justify-items-center">
        <div className="flex gap-6">
          <button className="hover:underline">
            <Icon className="mr-1" icon={ICONS.EARTH} />
            English (US)
          </button>
          <button className="hover:underline">
            <Icon className="mr-1" icon={ICONS.DOLLAR} />
            USD
          </button>
        </div>

        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div>© 2023 bednbreakfast</div>
          <div className="my-auto hidden h-[2px] w-[2px] bg-grey md:block" />
          <Link to={"/about"} className="hover:underline">
            About this site
          </Link>
          <div className="my-auto hidden h-[2px] w-[2px] bg-grey md:block" />
          <a
            className="hover:underline"
            href="https://www.tommy-yu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Author
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
