import React from "react";
import { useNavigate } from "react-router-dom";

function EstateClientComponent() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    // Navigate to the signin page
    navigate("/signin");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(https://eycrk5cno2n.exactdn.com/wp-content/uploads/2022/02/The-Importance-of-High-Quality-Real-Estate-Photos-v3.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-white text-6xl font-bold mb-6">WELCOME</h1>
      <button
        className="py-2 px-4 bg-gray-600 text-black-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white"
        onClick={handleButtonClick}
      >
        CLICK HERE TO CONTINUE
      </button>
    </div>
  );
}

export default EstateClientComponent;