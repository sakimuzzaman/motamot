import { IoShareSocialSharp } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialIcon = () => {
    return <>
        <div className="flex justify-start items-center space-x-2">
            <button className="border border-[#a2b3f1] bg-[#E5EAFC] hover:bg-[#fff] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <IoShareSocialSharp />
            </button>
            <button className="border border-[#1877F2] hover:bg-[#fff]  text-[#1877F2]  flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaFacebookF />
            </button>


            <button className="border border-[#00E510] hover:bg-[#fff]  text-[#00E510] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaWhatsapp />
            </button>
            <button className="border border-[#c45292] hover:bg-[#fff]  text-[#c45292] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaFacebookMessenger />
            </button>
            <button className="border border-[#383D38] hover:bg-[#fff]  text-[#383D38] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaXTwitter />
            </button>
            <button className="border border-[#007EBB] hover:bg-[#fff]  text-[#007EBB] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaLinkedinIn />
            </button>

            <button className="border border-[#0021F5] hover:bg-[#fff]  text-[#0021F5] flex justify-center items-center rounded-full text-2xl w-10 h-10">
                <FaRegCopy />
            </button>
        </div>
    </>
    
}

export default SocialIcon;