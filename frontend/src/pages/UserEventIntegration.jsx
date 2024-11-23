import React, { useState } from "react";
import Navbar from "../components/Navbar";

function UserEventIntegration() {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Selected User: ${selectedUser || "None"}, Selected Event: ${selectedEvent || "None"}`);
    console.log({ selectedUser, selectedEvent });
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df" // Replace with a suitable image URL
          alt="Users and Events Integration"
          className="h-1/2 w-auto object-cover"
        />
      </div>

      {/* Right Section: Dropdowns */}
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">User and Event Integration</h1>

        {/* Form for Users and Events */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 text-white p-6 rounded-lg shadow-lg space-y-6"
        >
          {/* Users Dropdown */}
          <div>
            <label htmlFor="user" className="block text-sm font-medium mb-2">
              Select User
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            >
              <option value="">-- Choose a User --</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Mike Johnson">Mike Johnson</option>
            </select>
          </div>

          {/* Events Dropdown */}
          <div>
            <label htmlFor="event" className="block text-sm font-medium mb-2">
              Select Event
            </label>
            <select
              id="event"
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            >
              <option value="">-- Choose an Event --</option>
              <option value="Product Launch">Product Launch</option>
              <option value="Quarterly Meeting">Quarterly Meeting</option>
              <option value="Team Outing">Team Outing</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium p-2 rounded-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default UserEventIntegration;
