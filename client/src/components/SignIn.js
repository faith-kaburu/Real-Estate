import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = ({ setAuthenticated, setUserRole }) => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://housing-db-85734cb1418b.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("id", data.id);

                    document.cookie = `access_token=${data.access_token}; path=/`;
                    console.log("Received token:", data.access_token);
                    console.log("Cookies:", document.cookie);

                    // setUserRole(data.role);
                    // setAuthenticated(true);

                    if (data.role === 'user') {
                        navigate(`/users/${data.id}`);
                    } else if (data.role === 'agent') {
                        navigate(`/agents/${data.id}`);
                    } else {
                        console.error("Invalid role");
                    }
                } else {
                    console.error("Invalid credentials");
                }
            } else {
                console.error("Authentication failed");
            }
        } catch (error) {
            console.error("Error occurred during sign in", error);
        }
    };

    return (
<div>

  <div className="flex items-center justify-center h-screen bg-cover bg-no-repeat bg-center" style={{backgroundImage: `url('https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?cs=srgb&dl=pexels-binyamin-mellish-106399.jpg&fm=jpg')`}}>
    <div className="flex flex-col items-center justify-center text-white text-center px-8">

      <h1 className="text-6xl font-bold mb-4 text-blue-600">Discover Your Dream Home</h1>
      <p className="text-lg text-gray-700">With our House Listing website, unparalleled real estate opportunities await you. Whether you're searching for a cozy family home, a chic urban apartment, or a luxurious countryside estate, our platform offers an extensive range of meticulously curated properties to suit every lifestyle and budget. With user-friendly search tools and detailed property listings, finding the perfect house has never been easier. Explore diverse neighborhoods, visualize properties through immersive images, and connect with trusted real estate agents. Your new home is just a click away – start your journey towards homeownership today.</p>

      <div className="flex items-center justify-center py-8">
        <div className="flex flex-col items-center justify-center space-y-8 bg-white bg-opacity-80 p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-blue-800">REAL ESTATE KE</h1>
          <img src="https://i.ytimg.com/vi/AzOFMIh0WK4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLClfS8fWpRhBvnaqfGcBFkR52j0qQ" alt="profile background" className="w-48 h-48 rounded-full" />
          <h2 className="text-2xl text-blue-800 font-bold mb-4">Sign In</h2>
          <form onSubmit={handleSignIn} className="max-w-xs">
            <label className="text-blue-800 block mb-4">
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-800 focus:border-blue-800" />
            </label>
            <label className="text-blue-800 block mb-4">
              Password:
              <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-blue-800 focus:border-blue-800" />
            </label>
            <button type="submit" className="bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900">Sign In</button>
          </form>
          <p className="text-gray-500 mt-4">Don't have an account? <Link to="/signup" className="text-blue-800">Sign Up</Link></p>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default SignIn;