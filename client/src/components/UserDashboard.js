import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


function UserDashboard() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch(`https://housing-db-85734cb1418b.herokuapp.com/users/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    } 
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/signin"); // Redirect to the sign-in page after logout
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
<div className="user-dashboard bg-gray-100 min-h-screen flex flex-col">
  <div className="bg-blue-500 text-white py-2 text-center">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/home" className="hover:underline">Home</Link>
      <Link to={`/users/${id}`} className="hover:underline">User Dashboard</Link>
      <button onClick={handleLogout} className="hover:underline">Logout</button>
    </div>
  </div>
  <div className="flex flex-col items-center justify-center flex-1 p-8">
    <div className="bg-white p-8 rounded shadow-md w-96 mb-4">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <p className="text-gray-600 mb-2">ID: {user.id}</p>
      <p className="text-gray-600">Email: {user.email}</p>
    </div>
  </div>
</div>

  );
}

export default UserDashboard;