import React from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa"; // Import the FaTimes icon

const BasicInfoSubmit = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center z-50 justify-center bg-black bg-opacity-70 ">
      <div className="bg-buttontext rounded-lg shadow-lg p-6 w-[462px] text-center relative ">
        {" "}
        {/* Set relative here */}
        <button
          onClick={onClose}
          className="absolute top-5 right-4 text-[#170F49] "
        >
          <FaTimes className="h-4 w-4" /> {/* Use FaTimes icon */}
        </button>
        <div className="flex justify-center text-center  mb-4 mt-4 ">
          <div className="bg-green-50 rounded-3xl p-6 inline-flex items-center justify-center">
            <FaCheckCircle className="text-[#0D8A49] h-10 w-10" />
          </div>
          </div>
        <h2 className="text-xl font-semibold text-[#021B0E] mt-8 mb-8">
        তথ্য দিয়ে সহায়তা করার জন্য ধন্যবাদ
        </h2>
        
       
      </div>
    </div>
  );
};

export default BasicInfoSubmit;
