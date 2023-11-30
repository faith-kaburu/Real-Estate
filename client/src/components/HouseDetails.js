import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function HouseDetails() {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    // Fetch house details based on ID from the API endpoint
    fetch(`https://housing-db-85734cb1418b.herokuapp.com/houses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setHouse(data);
        // Fetch agent details based on agent_id from the house data
        fetch(`https://housing-db-85734cb1418b.herokuapp.com/agents/${data.agent_id}`)
          .then((response) => response.json())
          .then((agentData) => {
            setAgent(agentData);
          })
          .catch((error) => {
            console.error("Error fetching agent details:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching house details:", error);
      });
  }, [id]); 

  if (!house || !agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="house-details-container bg-gray-100 p-8 flex flex-col md:flex-row items-center justify-center">
      <div className="house-details-text mr-0 md:mr-12 mb-8 md:mb-0 text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-4">{house.title}</h2>
        <p className="text-lg mb-2">Description: {house.description}</p>
        <p className="text-lg mb-2">Price: Ksh {house.price}</p>
        <p className="text-lg mb-2">Size: {house.size}</p>
        <p className="text-lg mb-2">Area: {house.city}</p>
        <p className="text-lg mb-2">County: {house.county}</p>
        <p className="text-lg mb-2">Bedrooms: {house.bedrooms}</p>
        <p className="text-lg mb-2">Bathrooms: {house.bathrooms}</p>
        <p className="text-lg mb-2">Agent ID: {house.agent_id}</p>

        
        <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-2">Agent Details</h2>
        <p className="text-lg mb-2">Name: {agent.name}</p>
        <p className="text-lg mb-2">Email: {agent.email}</p>
      </div>
      <div className="house-details-image">
        <img src={house.image_paths} alt={house.title} className="w-96 h-96 object-cover rounded-md" />
      </div>
    </div>
  );
}

export default HouseDetails;