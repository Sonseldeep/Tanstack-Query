import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsAuthenicate } = useAuth();
  const handleClick = () => {
    setIsAuthenicate(true);

    navigate("/about");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold mt-5 text-blue-500 "> Welcome !!</h1>
      <button
        onClick={() => handleClick()}
        className="bg-green-400 rounded-lg p-2 mt-2 hover:scale-95 hover:text-white hover:font-semibold hover:bg-blue-400 transition "
      >
        Login
      </button>
    </div>
  );
};

export default Login;
