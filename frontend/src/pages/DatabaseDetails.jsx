import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function DatabaseDetails() {
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dbName, setDbName] = useState("");
  const navigate = useNavigate();
  const handleTestConnection = (e) => {
    e.preventDefault();
    alert("Connection Tested Successfully!");
    console.log({ host, port, username, password, dbName });
    navigate("/onboarding/ChannelIntegration");
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src="https://i.pinimg.com/736x/10/12/9b/10129bf53067b2b307aa3ff6cf540774.jpg" // Replace with your image URL
          alt="Database Illustration"
          className="h-1/4 w-auto object-cover"
        />
      </div>

      {/* Right Section: Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleTestConnection}
          className="w-full max-w-md bg-gray-900 text-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-4">
            Database Connection Details
          </h1>

          {/* Host */}
          <div className="mb-4">
            <label htmlFor="host" className="block text-sm font-medium mb-1">
              Host
            </label>
            <input
              type="text"
              id="host"
              placeholder="Enter host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Port */}
          <div className="mb-4">
            <label htmlFor="port" className="block text-sm font-medium mb-1">
              Port
            </label>
            <input
              type="text"
              id="port"
              placeholder="Enter port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Database Name */}
          <div className="mb-4">
            <label htmlFor="dbName" className="block text-sm font-medium mb-1">
              Database Name
            </label>
            <input
              type="text"
              id="dbName"
              placeholder="Enter database name"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Test Connection Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium p-2 rounded-md"
          >
            Test Connection
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default DatabaseDetails;
