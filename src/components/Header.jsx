import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenicate } = useAuth(); // Get authentication state
  const navigate = useNavigate();

  const handleProtectedRoute = (e) => {
    if (isAuthenicate) {
      e.preventDefault(); // Prevent navigation
      navigate("/login"); // Redirect to login
    }
  };
  const handleActive = (isActive) => {
    return isActive ? "underline font-extrabold" : " ";
  };

  return (
    <div>
      <div className="flex justify-between mt-5 font-semibold  rounded-lg ml-2 mr-2">
        <h1 className=" hover:font-bold hover:bg-zinc-200 hover:rounded-md hover:p-1">
          Logo
        </h1>

        <div className="flex w-[200px] justify-between">
          <NavLink className={({ isActive }) => handleActive(isActive)} to="/">
            <h1 className=" hover:font-bold hover:bg-zinc-200 hover:rounded-md hover:p-1">
              Home
            </h1>
          </NavLink>
          <NavLink
            className={({ isActive }) => handleActive(isActive)}
            to="/about"
            onClick={handleProtectedRoute}
          >
            <h1 className=" hover:font-bold hover:bg-zinc-200 hover:rounded-md hover:p-1">
              About Us
            </h1>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
