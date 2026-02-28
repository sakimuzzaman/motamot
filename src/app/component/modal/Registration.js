import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { api } from "../../../utils/helper";
import { toast } from "react-toastify";

const Registration = ({ closeRegistrationModal, onLoginClick }) => {
  // State to track form inputs
  const [name, setName] = useState(""); // Added name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("সবগুলো ফিল্ড পূরণ করুন।");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("পাসওয়ার্ড মেলেনি।");
      return;
    }

    // API call to register
    try {
      const response = await fetch(`${api}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Include name
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        toast.success("সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে!");

        closeRegistrationModal()
      } else {
        setErrorMessage(data.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে।");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("সার্ভার ত্রুটি। দয়া করে পরে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

      <div className="bg-buttontext rounded-lg shadow-lg w-11/12 md:w-[690px] lg:w-[690px] relative">
        <button
          onClick={closeRegistrationModal}
          className="absolute top-4 right-4 text-[#170F49] text-2xl"
        >
          <FaTimes />
        </button>

        <div className="pb-[55px] px-[75px]">
          <h2 className="text-3xl text-[#282829] font-semibold mt-12 mb-4 text-center">
            অ্যাকাউন্ট খুলুন
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                নাম
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                ই-মেইল
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="ই-মেইল লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="পাসওয়ার্ড লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                কনফার্ম পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="পাসওয়ার্ড আবার লিখুন"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="text-green-500 text-sm mb-4">{successMessage}</p>
            )}
            <button
              type="submit"
              className="w-full bg-mainButtonColor text-buttontext py-2 rounded-lg"
            >
              প্রোফাইল তৈরি করুন
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              প্রোফাইল তৈরি করা থাকলে -{" "}
              <span
                onClick={onLoginClick}
                className="text-mainButtonColor cursor-pointer"
              >
                লগিন করুন
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
