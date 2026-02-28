import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { api } from "../../../utils/helper";

const LoginComponent = ({ closeLoginModal, onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Function to handle login
  const handleLogin = async (event) => {
    event.preventDefault();
    setError(null); // Clear any previous errors

    try {
      const response = await fetch(`${api}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json();

      // Save the JWT token (if applicable)
      localStorage.setItem("token", data.token); // Adjust this if using a different storage
      localStorage.setItem("user", JSON.stringify(data.user)); // Adjust this if using a different storage

      // console.log(data?.user);
      

      window.location.href = `${api.replace('/api', '')}/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

      // Close the modal or redirect user
      closeLoginModal();
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-buttontext rounded-lg shadow-lg w-11/12 md:w-[690px] lg:w-[690px] relative">
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-[#170F49] text-2xl"
        >
          <FaTimes />
        </button>

        <div className="pb-[55px] px-4 md:px-8 lg:px-12">
          <h2 className="text-2xl md:text-3xl text-[#282829] font-semibold mt-12 mb-4 text-center">
            লগিন করুন
          </h2>
          <form onSubmit={handleLogin}>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                ই-মেইল 
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px] focus:outline-none focus:ring-2 focus:ring-mainButtonColor"
                placeholder="ই-মেইল লিখুন"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium mb-3 text-[#363636]">
                  পাসওয়ার্ড
                </label>
                {/* <p
                  className="text-sm text-mainButtonColor cursor-pointer mb-3"
                  onClick={closeLoginModal}
                >
                  Forgot ?
                </p> */}
              </div>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px] focus:outline-none focus:ring-2 focus:ring-mainButtonColor"
                placeholder="পাসওয়ার্ড লিখুন"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-mainButtonColor text-buttontext py-2 rounded-lg"
            >
              প্রবেশ করুন
            </button>
          </form>

          {/* Divider with "Or" */}
          <div className="flex items-center justify-center my-6">
            <span className="mx-4 text-gray-500">Or</span>
          </div>

          {/* Google and Facebook Buttons */}
          {/* <div className="flex justify-center gap-4">
            <button className="flex items-center bg-[#D1E9FF] border border-[#D1E9FF] py-2 px-4 rounded-lg h-14">
              <Image
                src="/images/icon/googleicon.png" // Use the correct path to your image
                alt="Google Icon"
                width={20} // Set width
                height={20} // Set height
                className="mr-2"
              />
              <span className="text-[#1570EF] text-xs">
                Gmail দিয়ে প্রবেশ করুন
              </span>
            </button>
            <button className="flex items-center bg-[#D1E9FF] border border-[#D1E9FF] py-2 px-4 rounded-lg h-14">
              <FaFacebook className="text-[#1570EF] mr-2 w-5 h-5" />
              <span className="text-[#1570EF] text-xs">
                Facebook দিয়ে প্রবেশ করুন
              </span>
            </button>
          </div> */}

          {/* Registration Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              প্রোফাইল তৈরি করা না থাকলে -{" "}
              <span
                onClick={onRegisterClick}
                className="text-mainButtonColor cursor-pointer"
              >
                অ্যাকাউন্ট খুলুন
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
