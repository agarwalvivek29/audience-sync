import React, { useState } from "react";
import Navbar from "../components/Navbar";

function BusinessDetails() {
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Details Processed Successfully!");
    console.log({ businessName, category, industry, location });
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src="https://i.pinimg.com/736x/c3/c5/ee/c3c5ee4342f01b3cb4956e04e1274501.jpg" // Replace with your image URL
          alt="Business Illustration"
          className="h-1/4 w-auto object-cover"
        />
      </div>

      {/* Right Section: Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-900 text-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-4">Business Details</h1>

          {/* Business Name */}
          <div className="mb-4">
            <label
              htmlFor="businessName"
              className="block text-sm font-medium mb-1"
            >
              Business Name
            </label>
            <input
              type="text"
              id="businessName"
              placeholder="Enter business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Food">Food</option>
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          {/* Industry Dropdown */}
          <div className="mb-4">
            <label htmlFor="industry" className="block text-sm font-medium mb-1">
              Industry
            </label>
            <select
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            >
              <option value="" disabled>
                Select an industry
              </option>
              <option value="Hospitality">Hospitality</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education Services">Education Services</option>
              <option value="Software Development">Software Development</option>
              <option value="Media and Entertainment">
                Media and Entertainment
              </option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              required
            />
          </div>

          {/* Process Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium p-2 rounded-md"
          >
            Process
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default BusinessDetails;
