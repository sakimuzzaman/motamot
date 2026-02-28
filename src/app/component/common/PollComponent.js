

import Image from "next/image";
import { useState, useEffect } from "react";
import LoginComponent from "../modal/LogIn";
import Registration from "../modal/Registration";
import { api } from "../../../utils/helper";

const PollComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {
    let userInfo = localStorage.getItem("user");
    setUser(JSON.parse(userInfo))
  }, [])

  // Simulate checking login status from local storage or authentication logic
  // useEffect(() => {
  //   const storedLoginStatus = localStorage.getItem(isLoggedIn) === true;
  //   setIsLoggedIn(storedLoginStatus);
  // }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     window.location.replace("https://admin.motamot.io/");
  //   }
  // }, [isLoggedIn]);

  const handleClick = () => {
    if (user) {
      // window.location.href = "https://admin.motamot.io/"; 
      window.location.replace('https://admin.motamot.io/');
      window.location.href = `${api.replace('/api', '')}}`;

    } else {
      setLoginModalOpen(true); 
    }
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false); 
  };

  const handleOpenRegistrationModal = () => {
    setRegistrationModalOpen(true); 
    setLoginModalOpen(false); 
  };

  const handleCloseRegistrationModal = () => {
    setRegistrationModalOpen(false); 
  };

  return (
    <div className="flex justify-center items-center p-[1rem] mb-8">
      <div className="bg-[#f3f5ff] p-8 rounded-lg flex flex-col-reverse lg:flex-row justify-between items-stretch max-w-4xl w-full">
        <div className="max-w-md flex-1 flex flex-col justify-center p-[1.5rem]">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            মাত্র ৩টি ধাপ অনুসরণ করে সংগ্রহ করুন জনমত জরিপের ফলাফল বিশ্লেষণ
          </h2>
          <ul className="text-gray-700 space-y-4 mb-6 mt-4">
            <li className="flex items-center gap-x-3">
              <span className="text-buttontext rounded-full p-1 flex justify-center items-center">
                <Image
                  src="/images/ForwardButton.png"
                  alt="Right_Forward"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </span>
              মতামত-জরিপের ফর্ম পূরণ
            </li>
            <li className="flex items-center gap-x-3">
              <span className="text-buttontext rounded-full p-1 flex justify-center items-center">
                <Image
                  src="/images/ForwardButton.png"
                  alt="Right_Forward"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </span>
              জরিপটি অনলাইনে শেয়ার করা
            </li>
            <li className="flex items-center gap-x-3">
              <span className="text-buttontext rounded-full p-1 flex justify-center items-center">
                <Image
                  src="/images/ForwardButton.png"
                  alt="Right_Forward"
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
              </span>
              ইউজার ড্যাশবোর্ডে লাইভ ফলাফল দেখা
            </li>
          </ul>
          <div>
            <button
              onClick={handleClick }
              className="bg-[#2746F1] text-buttontext px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold"
            >
              শুরু করুন আপনার প্রথম অনলাইন জরিপ
            </button>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto max-h-[500px]">
          <Image
            src="/images/mobilescreen.png"
            alt="Poll Analysis"
            layout="responsive"
            width={1800}
            height={1000}
            className="rounded-md object-contain h-auto max-h-[500px]"
          />
        </div>
      </div>

      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-buttontext rounded-xl w-11/12 md:w-[690px]">
            <LoginComponent
              closeLoginModal={handleCloseLoginModal}
              onRegisterClick={handleOpenRegistrationModal}
            />
          </div>
        </div>
      )}

      {isRegistrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-buttontext rounded-xl w-11/12 md:w-[690px]">
            <Registration
              closeRegistrationModal={handleCloseRegistrationModal}
              onLoginClick={handleClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PollComponent;




