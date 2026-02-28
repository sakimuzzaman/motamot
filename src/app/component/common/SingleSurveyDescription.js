import Image from "next/image";
import Link from "next/link";
import { AiOutlineFacebook, AiOutlineWhatsApp, AiOutlineComment, AiOutlineTwitter, AiOutlineLinkedin, AiOutlineShareAlt } from "react-icons/ai"; // Import Ant Design icons
import SocialIcon from "./SocialIcon";

function SingleSurveyDescription() {
  const postUrl = encodeURIComponent("https://yourwebsite.com/post"); // The URL of the post to share
  const postTitle = encodeURIComponent("যেকোনো পরিস্থিতিতে দেশে ইন্টারনেট সংযোগ বন্ধ রাখা সমর্থন করেন কি?");

  return (
    <div className="text-black px-4 py-10 w-full lg:w-[50%] mt-[2rem] lg:mt-[5rem] mb-[3rem] lg:mb-[5rem] lg:pl-10"> {/* Added lg:pl-10 for left padding on large screens */}
      {/* Category */}
      <div className="text-[#ff3d00] text-lg font-bold mb-4">রাজনীতি</div>

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold mb-6 leading-tight">
        যেকোনো পরিস্থিতিতে দেশে ইন্টারনেট সংযোগ বন্ধ রাখা সমর্থন করেন কি?
      </h1>

      {/* Article content */}
      <p className="text-sm md:text-base mb-2 leading-relaxed text-[#282829CC]">
        ‘সংঘর্ষ’ এড়াতে বিভিন্ন দেশের ক্রিকেট বোর্ড ও ফ্র্যাঞ্চাইজিভিত্তিক
        লিগগুলোকে একসঙ্গে কাজ করতে হবে বলে মনে করেন নিউজিল্যান্ডের টেস্ট অধিনায়ক
        টিম সাউদি।
      </p>
      <p className="text-sm md:text-base mb-6 leading-relaxed text-[#282829CC]">
        বিশ্বের ফ্র্যাঞ্চাইজিভিত্তিক টি-টোয়েন্টি লিগের সংখ্যা দিন দিন বেড়েই
        চলেছে। ফলে খেলোয়াড়দের চাহিদাও বাড়ছে।
      </p>

      {/* Author Section */}
      <div className="flex  items-center mt-8">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <Image
            src="/images/author.png" // Replace with your author's image path
            alt="Author Image"
            width={48}
            height={48}
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="text-lg font-bold">শফিকুল ইসলাম</p>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-gray-400 text-sm">প্রকাশ: ০১ জুলাই ২০২৪, ১১:২২</p>
      </div>

      {/* Social Media Icons Section */}
      <div className="flex flex-wrap space-x-4 pt-4">
        <SocialIcon />
      </div>
    </div>
  );
}

export default SingleSurveyDescription;




{/* <Link href="#" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-600 bg-transparent">
          <AiOutlineShareAlt className="text-gray-600" size={20} />
        </Link>
        <Link
          href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`}
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-600 bg-transparent"
        >
          <AiOutlineFacebook className="text-blue-600" size={20} />
        </Link>
        <Link
          href={`https://wa.me/?text=${postTitle}%20${postUrl}`}
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-green-600 bg-transparent"
        >
          <AiOutlineWhatsApp className="text-green-600" size={20} />
        </Link>
        <Link
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500 bg-transparent"
        >
          <AiOutlineLinkedin className="text-blue-500" size={20} />
        </Link>
        <Link
          href={`https://twitter.com/share?url=${postUrl}&text=${postTitle}`}
          target="_blank"
          className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-400 bg-transparent"
        >
          <AiOutlineTwitter className="text-blue-400" size={20} />
        </Link>
        <Link href="#" target="_blank" className="flex items-center justify-center w-10 h-10 rounded-full border border-indigo-600 bg-transparent">
          <AiOutlineComment className="text-indigo-600" size={20} />
        </Link> */}