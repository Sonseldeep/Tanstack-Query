import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNavbar from "./SideNavbar";

const Layout = () => {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  );
};

export default Layout;
