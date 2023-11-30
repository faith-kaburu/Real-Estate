import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ({ setAuthenticated }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://housing-db-85734cb1418b.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful signup
        console.log("SignUp Successful");
        // Redirect to login page
        navigate("/signin");
        setAuthenticated(true);
      } else {
        console.error("SignUp failed");
      }
    } catch (error) {
      console.error("Error occurred during sign up", error);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gray-100" style={{backgroundImage: `url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
  <div className="bg-white bg-opacity-80 p-8 rounded shadow-md w-96">
    <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">Sign Up</h2>
    <form onSubmit={handleSignUp} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-blue-800">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-blue-800">Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange} 
          className="mt-1 p-2 w-full border rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
      >
        Sign Up
      </button>
    </form>
  </div>
</div>
  );
};

export default SignUp;