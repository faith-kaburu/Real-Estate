import React, { useState } from "react";
import { useParams } from "react-router-dom";

function UpdateHouse() {
  const { id } = useParams();
  const [houseId, setHouseId] = useState(id);
  const [fieldToUpdate, setFieldToUpdate] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleUpdateField = (e) => {
    e.preventDefault();

    const updatedField = {
      [fieldToUpdate]: newValue,
    };

    // Get the token from localStorage
    const token = localStorage.getItem("access_token");

    fetch(`https://housing-db-85734cb1418b.herokuapp.com/houses/${houseId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedField),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Field updated successfully:", data);
        alert("Field updated in the database");
      })
      .catch((error) => {
        console.log(updatedField);
        console.error("Error updating field:", error);
      });
  };

  return (
    <div className="update-house bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Update House Details</h2>
        <form onSubmit={handleUpdateField} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">House ID:</label>
            <input
              type="number"
              name="houseId"
              value={houseId}
              onChange={(e) => setHouseId(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Field to Update:</label>
            <input
              type="text"
              name="fieldToUpdate"
              value={fieldToUpdate}
              onChange={(e) => setFieldToUpdate(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">New Value:</label>
            <input
              type="text"
              name="newValue"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Update Field
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateHouse;