import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Sparkles } from "lucide-react";

const Header = () => {
  const { isAuthenicate } = useAuth();
  const navigate = useNavigate();

  const handleProtectedRoute = (e) => {
    if (isAuthenicate) {
      e.preventDefault();
      navigate("/login");
    }
  };

  const handleActive = (isActive) =>
    isActive ? "text-blue-600 font-bold" : "text-gray-600";

  return (
    <header className="bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-500" size={24} />
            <h1 className="text-xl font-extrabold text-gray-800 tracking-tight hover:text-blue-500 transition duration-300">
              Shop<span className="text-blue-600">X</span>
            </h1>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${handleActive(
                isActive
              )} hover:text-blue-500 transition duration-300`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={handleProtectedRoute}
            className={({ isActive }) =>
              `${handleActive(
                isActive
              )} hover:text-blue-500 transition duration-300`
            }
          >
            About Us
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
