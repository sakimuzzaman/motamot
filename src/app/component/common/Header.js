"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LoginComponent from "../modal/LogIn";
import Registration from "../modal/Registration"; // Import the registration component
import Image from "next/image";
import DefaultProfile from "../common/DefaultProfile"
import { api } from "../../../utils/helper";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false); // State for the registration modal
  const pathname = usePathname();

  const isActive = (path) => pathname === path;
  const [isOpen, setIsOpen] = useState(false);

  const toggleProfileMenu = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = async () => {
    let token = localStorage.getItem("token");
    console.log(token, 'fdfd');

    try {
      const response = await fetch(`${api}/logout`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },

      });

      if (!response.ok) {
        throw new Error("Logout failed. Please check your credentials.");
      }

      const data = await response.json();
      console.log(data, 'FDFD');
      if (data?.status == 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        location.href = "/";
      }

    } catch (error) {
      console.log(error);

    }
  }

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegistrationModalOpen(false); // Close registration modal when login is opened
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleOpenRegistrationModal = () => {
    setIsRegistrationModalOpen(true);
    setIsLoginModalOpen(false); // Close login modal when registration is opened
  };

  const handleCloseRegistrationModal = () => {
    setIsRegistrationModalOpen(false);
  };

  useEffect(() => {
    let userInfo = localStorage.getItem("user");
    setUser(JSON.parse(userInfo))
  }, [])


  return (
    <header className="px-6 py-4 md:px-16 md:py-6 flex justify-between items-center relative">
      <div className="flex items-center">
        <button
          className="md:hidden mr-4 text-black focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
        <div className="text-xl font-bold text-gray-800 hidden md:block">
          <Link href="/">
            {" "}
            {/* Wrap the image in a Link component */}
            <Image
              src="/images/motamot-logo.png" // Path to the image
              alt="/motamot-logo"
              width={150} // Set appropriate width
              height={200} // Set appropriate height
              priority // Optional: prioritize loading if it's important
            />
          </Link>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex gap-6 font-bold">
        <Link
          href="/"
          className={`hover:text-[#2746F1] ${isActive("/") ? "text-[#2746F1]" : "text-gray-700"
            }`}
        >
          হোম পেজ
        </Link>
        <Link
          href="/poll"
          className={`hover:text-[#2746F1] ${isActive("/poll") ? "text-[#2746F1]" : "text-gray-700"
            }`}
        >
          পোল
        </Link>
        {/* <Link
          href="/result"
          className={`hover:text-[#2746F1] ${
            isActive("/result") ? "text-[#2746F1]" : "text-gray-700"
          }`}
        >
          ফলাফল
        </Link> */}
      </nav>

      {/* Right Side: Search and Login Button */}
      <div className="flex items-center gap-4">
        {/* <FiSearch className="w-5 h-5 text-gray-500" /> */}
        {user ? <div className="flex justify-center items-center">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center items-center gap-x-1.5 text-sm font-semibold text-gray-900"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={toggleProfileMenu}
              >
                <DefaultProfile name={user?.name} />
                <span className="ml-1">{user?.name}</span>
                <svg
                  className="-mr-1 size-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
              >

                <div className="py-1" role="none">
                  <div
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                    role="menuitem"
                    id="menu-item-6"
                    onClick={() => {
                      toggleProfileMenu();
                      logoutUser();
                    }}
                  >
                    লগআউট
                  </div>
                  {/* <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="menu-item-6"
                  >
                    পাসওয়ার্ড পরিবর্তন করুন
                  </a> */}
                </div>
              </div>
            )}
          </div>

        </div> :
          <button
            className="bg-[#2746F1] text-buttontext px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold"
            onClick={handleOpenLoginModal} // Open login modal on click
          >
            প্রবেশ করুন
          </button>
        }

      </div>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full z-50 ${isMenuOpen ? "block" : "hidden"
          }`}
      >
        <div
          className={`fixed top-0 left-0 w-[65%] h-full bg-buttontext z-50 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <Link href="/" onClick={toggleMenu}>
              <Image
                src="/images/মতামত-মঞ্চ.png" // Path to the image
                alt="মতামত মঞ্চ"
                width={150} // Set appropriate width
                height={200} // Set appropriate height
                priority // Optional: prioritize loading if it's important
                className="h-4"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-6 mt-8 px-6">
            <Link
              href="/"
              className={`hover:text-[#2746F1] ${isActive("/") ? "text-[#2746F1]" : "text-gray-700"
                }`}
              onClick={toggleMenu}
            >
              প্রধান পাতা
            </Link>
            <Link
              href="/poll"
              className={`hover:text-[#2746F1] ${isActive("/poll") ? "text-[#2746F1]" : "text-gray-700"
                }`}
              onClick={toggleMenu}
            >
              পোল
            </Link>
            <Link
              href="/result"
              className={`hover:text-[#2746F1] ${isActive("/result") ? "text-[#2746F1]" : "text-gray-700"
                }`}
              onClick={toggleMenu}
            >
              ফলাফল
            </Link>
          </nav>
        </div>

        <div
          className={`fixed top-0 left-[65%] w-[35%] h-full bg-black bg-opacity-50 backdrop-blur-md ${isMenuOpen ? "block" : "hidden"
            }`}
          onClick={toggleMenu}
        ></div>
      </div>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-buttontext rounded-xl w-11/12 md:w-[690px]">
            <LoginComponent
              closeLoginModal={handleCloseLoginModal}
              onRegisterClick={handleOpenRegistrationModal} // Open registration from login
            />
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {isRegistrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-buttontext rounded-xl w-11/12 md:w-[690px]">
            <Registration
              closeRegistrationModal={handleCloseRegistrationModal}
              onLoginClick={handleOpenLoginModal} // Open login from registration
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
