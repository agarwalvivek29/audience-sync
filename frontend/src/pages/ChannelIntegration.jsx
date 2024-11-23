import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
function ChannelIntegration() {
  const [selectedOption, setSelectedOption] = useState("aws"); // Default option is AWS SES
  const [accessKey, setAccessKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [region, setRegion] = useState("");
  const [email, setEmail] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [authKey, setAuthKey] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    console.log({ accessKey, secretKey, region, email, webhookUrl, authKey });
    navigate("/onboarding/UserEventIntegration");
  };

  return (
    <>
    <Navbar />
    <div className="flex min-h-screen bg-white">
      {/* Left Section: Image */}
      <div className="w-1/2 flex items-center justify-center bg-gray-200">
        <img
          src="https://i.pinimg.com/736x/c3/c5/ee/c3c5ee4342f01b3cb4956e04e1274501.jpg" // Replace this with your image URL
          alt="Integration Illustration"
          className="h-1/2 w-auto object-cover"
        />
      </div>

      {/* Right Section: Forms */}
      <div className="w-1/2 p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Channel Integration</h1>

        <div className="flex justify-center gap-4 mb-6">
          {/* Options to choose between AWS SES and Push Notification */}
          <div
            className={`w-1/2 p-4 text-center cursor-pointer rounded-lg border ${
              selectedOption === "aws" ? "bg-cyan-100 border-cyan-500" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("aws")}
          >
            <h2 className="text-xl font-semibold">AWS SES</h2>
          </div>
          <div
            className={`w-1/2 p-4 text-center cursor-pointer rounded-lg border ${
              selectedOption === "push" ? "bg-cyan-100 border-cyan-500" : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("push")}
          >
            <h2 className="text-xl font-semibold">Push Notification</h2>
          </div>
        </div>

        {/* Form for AWS SES or Push Notification */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 text-white p-6 rounded-lg shadow-lg"
        >
          {selectedOption === "aws" ? (
            <>
              {/* AWS SES Inputs */}
              <div className="mb-4">
                <label htmlFor="accessKey" className="block text-sm font-medium mb-1">
                  Access Key
                </label>
                <input
                  type="text"
                  id="accessKey"
                  placeholder="Enter AWS Access Key"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="secretKey" className="block text-sm font-medium mb-1">
                  Secret Access Key
                </label>
                <input
                  type="text"
                  id="secretKey"
                  placeholder="Enter AWS Secret Access Key"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="region" className="block text-sm font-medium mb-1">
                  Region
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                >
                  <option value="">Select AWS Region</option>
                  <option value="us-east-1">US East (N. Virginia)</option>
                  <option value="us-west-1">US West (N. California)</option>
                  <option value="eu-west-1">EU (Ireland)</option>
                  <option value="ap-south-1">Asia Pacific (Mumbai)</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Push Notification Inputs */}
              <div className="mb-4">
                <label htmlFor="webhookUrl" className="block text-sm font-medium mb-1">
                  Webhook URL
                </label>
                <input
                  type="url"
                  id="webhookUrl"
                  placeholder="Enter Webhook URL"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="authKey" className="block text-sm font-medium mb-1">
                  Authorization Key
                </label>
                <input
                  type="text"
                  id="authKey"
                  placeholder="Enter Authorization Key"
                  value={authKey}
                  onChange={(e) => setAuthKey(e.target.value)}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                  required
                />
              </div>
            </>
          )}

          {/* Test Button */}
          <button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-medium p-2 rounded-md"
          >
            Test Integration
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ChannelIntegration;
