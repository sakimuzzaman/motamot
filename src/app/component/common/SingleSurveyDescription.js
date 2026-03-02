import Image from "next/image";
import SocialIcon from "./SocialIcon";

function SingleSurveyDescription() {
  

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
            src="/images/author.png" 
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




