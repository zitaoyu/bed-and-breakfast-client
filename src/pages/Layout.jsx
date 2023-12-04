import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Layout = () => {
  return (
    <div className="flex min-h-screen min-w-full flex-col px-10">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Layout;
