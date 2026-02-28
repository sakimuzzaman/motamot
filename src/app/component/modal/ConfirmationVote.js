import React from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

const ConfirmationVote = ({ onLoginClick, onDataClick, onCloseIcon }) => {
  return (
    <div>
      {/* Confirmation Vote Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
        <div className="bg-buttontext rounded-lg shadow-lg p-6 w-[462px] text-center relative">
          <button
            onClick={onCloseIcon}
            className="absolute top-5 right-4 text-[#170F49]"
          >
            <FaTimes className="h-4 w-4" />
          </button>
          <div className="flex justify-center mb-4 mt-4">
            <div className="bg-green-50 rounded-3xl p-6 inline-flex items-center justify-center">
              <FaCheckCircle className="text-[#0D8A49] h-10 w-10" />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2 text-[#021B0E] mt-8">
            আপনার মতামতটি গ্রহণ করা হয়েছে
          </h2>
          <p className="text-[#021B0E] mb-6 mt-14">
            নিজের পোল তৈরি করতে এবং আপনার অংশগ্রহণ করা পোলের ট্র্যাক রাখতে
          </p>
          <div className="space-y-2">
            <button
              className="m-2 px-4 py-2 bg-mainButtonColor text-buttontext rounded "
              onClick={onLoginClick} // This will open the login modal
            >
              লগিন করুন
            </button>
            <p className="text-[#021B0E]">
              পোলের ডাটাকে আরও সমৃদ্ধ করতে আপনার তথ্য দিয়ে সহায়তা করুন
            </p>
            <button
              className="bg-buttontext text-mainButtonColor border border-mainButtonColor px-4 py-2 rounded-lg w-[142px] h-[51px] mt-[19px] mb-4"
              onClick={onDataClick}
            >
              আরও ডাটা দিন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationVote;
