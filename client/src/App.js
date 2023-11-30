import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import HouseDetails from "./components/HouseDetails";
import CreateHouse from "./components/CreateHouse";
import UpdateHouse from "./components/UpdateHouse";
import DeleteHouse from "./components/DeleteHouse";
import UserDashboard from "./components/UserDashboard";
import AgentDashboard from "./components/AgentDashboard";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import EstateClientComponent from "./components/EstateClientComponent"; // Import the EstateClientComponent

function App() {
  return (
    <Routes>
      <Route path="/estate-client" element={<EstateClientComponent />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/createhouse" element={<CreateHouse />} />
      <Route path="/updatehouse" element={<UpdateHouse />} />
      <Route path="/deletehouse" element={<DeleteHouse />} />
      <Route path="/home" element={<Home />} />
      <Route path="/house/:id" element={<HouseDetails />} />
      <Route path="/users/:id" element={<UserDashboard />} />
      <Route path="/agents/:id" element={<AgentDashboard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;