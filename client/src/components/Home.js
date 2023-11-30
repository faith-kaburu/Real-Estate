import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    // Fetch houses data from API endpoint
    fetch("https://housing-db-85734cb1418b.herokuapp.com/houses") 
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setHouses(data);
        } else {
          throw new Error("Invalid data format");
        } 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div
      className="home p-4 bg-blue-500 text-white flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.9, 
        minHeight: "100vh", 
      }}
    >
      <h1 className="text-3xl font-semibold mb-8 text-center">House Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {houses.map((house) => (
          <Link
            key={house.id}
            to={`/house/${house.id}`}
            className="house-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={house.image_paths}
                alt={house.title}
                className="w-full h-36 object-cover rounded-t-xl"
              />
              <div className="absolute bottom-0 left-0 bg-blue-500 text-white p-2 rounded-tr-xl">
                <span className="font-semibold">Ksh {house.price}</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-600 mb-2">{house.title}</h2>
              <p className="text-gray-600 mb-2">Size: {house.size} sqft</p>
              <p className="text-gray-600 mb-2">County: {house.county}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;