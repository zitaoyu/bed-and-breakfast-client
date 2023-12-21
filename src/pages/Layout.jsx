import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <div>
      <div className="flex min-h-screen min-w-full flex-col px-2 sm:px-10 lg:px-20">
        <NavBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
