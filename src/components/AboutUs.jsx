import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <div className="navigation">
        <button
          onClick={() => handleClick()}
          className="bg-blue-400 rounded-lg p-2 ml-10 mt-5 hover:scale-90 hover:font-semibold transition duration-300"
        >
          Home
        </button>
      </div>
      <div className="mt-5 hover:scale-105 transition duration-700 ">
        <h1 className="w-fit bg-amber-300 rounded p-10 ml-10 font-semibold hover:bg-green-300 hover:text-bold">
          This is About us section
        </h1>
      </div>
    </>
  );
};

export default AboutUs;
