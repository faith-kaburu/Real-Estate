import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function AgentDashboard() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    fetch(`https://housing-db-85734cb1418b.herokuapp.com/agents/${id}`) 
      .then((response) => response.json())
      .then((data) => {
        setAgent(data);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
      });
  }, [id]);

  const handleLogout = () => {
    // clears storgae 
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/signin"); 
  };


  if (!agent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="agent-dashboard bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: 'url("https://www.landlordvision.co.uk/blog/wp-content/uploads/2020/10/87916602_s.jpg")', backgroundSize: "cover", backgroundPosition: "center" }}>
     <div className="dashboard-links mb-6">
  <Link to="/home" className="text-black text-lg bg-white hover:bg-blue-500 hover:underline px-4 py-2 rounded-lg mr-4">Home</Link>
  <Link to="/createhouse" className="text-black text-lg bg-white hover:bg-blue-500 hover:underline px-4 py-2 rounded-lg mr-4">Create House</Link>
  <Link to="/updatehouse" className="text-black text-lg bg-white hover:bg-blue-500 hover:underline px-4 py-2 rounded-lg mr-4">Update House</Link>
  <Link to="/deletehouse" className="text-black text-lg bg-white hover:bg-blue-500 hover:underline px-4 py-2 rounded-lg mr-4">Delete House</Link>
  <Link to={`/agents/${id}`} className="text-black text-lg bg-white hover:bg-blue-500 hover:underline px-4 py-2 rounded-lg mr-4">Agent Dashboard</Link>
  <button onClick={handleLogout} className="text-black text-lg bg-red-400 hover:bg-red-600 hover:underline px-4 py-2 rounded-lg">Logout</button>
</div>
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl text-blue-500 font-semibold mb-4">Agent Details</h2>
        <p className="text-blue-600  mb-2">Name: {agent.name}</p>
        <p className="text-blue-600 mb-2">Email: {agent.email}</p>
        <p className="text-blue-600 mb-4">Phone Number: {agent.phonebook}</p>
      </div>
    </div>
  );
}

export default AgentDashboard;