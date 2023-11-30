import React, { useState } from "react";

function CreateHouse() {
    const [houseData, setHouseData] = useState({
        title: "",
        size: 0,
        price: 0,
        description: "",
        city: "",
        county: "",
        bedrooms: 0, 
        bathrooms: 0,
        image_paths: "",
        agent_id: 0
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setHouseData({ ...houseData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error("Token not found in local storage");
            return;
        }

        fetch("https://housing-db-85734cb1418b.herokuapp.com/houses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(houseData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("House added successfully:", data);
                alert("House added to database");
            })
            .catch((error) => {
                console.error("Error adding house:", error);
            });
    };

    return (
<div className="create-house bg-blue-500 min-h-screen flex items-center justify-center">
  <div className="bg-white p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-500">Create a New House Listing</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600">Title:</label>
        <input
          type="text"
          name="title"
          value={houseData.title}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Bathrooms:</label>
        <input
          type="number"
          name="bathrooms"
          value={houseData.bathrooms}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Bedrooms:</label>
        <input
          type="number"
          name="bedrooms"
          value={houseData.bedrooms}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Area:</label>
        <input
          type="text"
          name="city"
          value={houseData.city}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">County:</label>
        <input
          type="text"
          name="county"
          value={houseData.county}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Price:</label>
        <input
          type="number"
          name="price"
          value={houseData.price}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Size(sqfeet):</label>
        <input
          type="number"
          name="size"
          value={houseData.size}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Description:</label>
        <input
          type="text"
          name="description"
          value={houseData.description}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Images:</label>
        <input
          type="text"
          name="image_paths"
          value={houseData.image_paths}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Agent ID:</label>
        <input
          type="number"
          name="agent_id"
          value={houseData.agent_id}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Submit
      </button>
    </form>
  </div>
</div>
    );
}

export default CreateHouse;