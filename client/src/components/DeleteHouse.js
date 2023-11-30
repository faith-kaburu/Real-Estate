import React, { useState } from "react";

function DeleteHouse() {
  const [houseId, setHouseId] = useState("");

  const handleDelete = (e) => {
    e.preventDefault();
 
    // Get token from local storage
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("Token not found in local storage");
      alert("Authentication token not found");
      return;
    }

    fetch(`https://housing-db-85734cb1418b.herokuapp.com/houses/${houseId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then((response) => {
        if (response.ok) {
          console.log("House deleted successfully");
          alert("House deleted from the database");
        } else {
          console.error("Error deleting house");
          alert("Error deleting the house");
        }
      })
      .catch((error) => {
        console.error("Error deleting house:", error);
        alert("Error deleting the house");
      });
  };

  return (
    <div className="delete-house bg-blue-500 min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">Delete House</h2>
      <form onSubmit={handleDelete} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">House ID:</label>
          <input
            type="number"
            value={houseId}
            onChange={(e) => setHouseId(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200"
        >
          Delete
        </button>
      </form>
    </div>
  </div> 
  );
}

export default DeleteHouse;