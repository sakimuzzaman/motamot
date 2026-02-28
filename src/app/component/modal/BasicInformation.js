import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { api } from "../../../utils/helper";

const BasicInformation = ({ onCloseIconBasicInfo, onSubmit, vote }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [voteId, setVoteId] = useState(null);

  console.log(voteId, "fdfdfd vvv");

  useEffect(() => {    
    setVoteId(vote?.id)
  }, [vote])

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const response = await fetch(`${api}/submit-form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          age,
          gender,
          profession,
          address,
          voteId
        }),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");

        onSubmit(); // Call the submit handler passed from the parent, if needed
      } else {
        console.error("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-50 overflow-auto justify-center bg-black bg-opacity-50">
      <div className="bg-buttontext rounded-lg shadow-lg p-6 w-[690px] relative top-32 ">
        <button
          onClick={onCloseIconBasicInfo}
          className="absolute top-4 right-4 text-[#170F49] text-2xl"
        >
          <FaTimes />
        </button>

        <div className="pb-[55px] px-[15px]">
          <h2 className="text-3xl text-[#282829] font-semibold m-4 text-center">
            সাধারণ তথ্য ফর্ম
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                নাম <span className="font-bold text-red-700">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="আপনার নাম লিখুন"
                required
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
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px] focus:outline-none focus:ring-2 focus:ring-mainButtonColor"
                placeholder="ই-মেইল লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                বয়স <span className="font-bold text-red-700">*</span>
              </label>
              <input
                type="number"
                required
                value={age}
                onChange={(e) => {
                  const inputAge = parseInt(e.target.value, 10);
                  if (inputAge <= 120) {
                    setAge(inputAge); // Update state only if input is valid
                  } else if (e.target.value === "") {
                    setAge(""); // Allow clearing the input
                  }
                }}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="আপনার বয়স লিখুন"

              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                লিঙ্গ
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px] bg-white"
              >
                <option value="" disabled>
                  আপনার লিঙ্গ নির্বাচন করুন
                </option>
                <option value="male">পুরুষ</option>
                <option value="female">নারী</option>
                <option value="other">অন্যান্য</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                পেশা
              </label>
              <input
                type="text"
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[55px]"
                placeholder="আপনার পেশা লিখুন"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-3 text-[#363636]">
                ঠিকানা
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded-lg p-4 text-[#363636] h-[82px]"
                placeholder="আপনার ঠিকানা লিখুন"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-mainButtonColor text-buttontext py-2 rounded-lg"
            >
              সাবমিট করুন
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BasicInformation;
