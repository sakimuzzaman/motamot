import React from "react";
import Image from "next/image"; // Import Next.js Image component

const features = [
  {
    id: 1,
    imgSrc: "/images/features/image1.png",
    title: "সহজ ব্যাবহার উপযোগী ",
    description: "একটি সহজবোধ্য ডিজাইন যা ব্যবহারকারীদের জন্য জরিপ তৈরি, কাস্টমাইজ এবং শেয়ার করা সহজ করে তোলে।",
  },
  {
    id: 2,
    imgSrc: "/images/features/image2.png",
    title: "পোল ও জরিপ তৈরি",
    description:
      "নিজস্ব জরিপ এবং একাধিক প্রশ্ন থাকলে  একই প্লাটফর্ম ব্যাবহার করে বিভিন্ন প্রশ্নের মাধ্যমে সার্ভে তৈরি করা যায়",
  },
  {
    id: 3,
    imgSrc: "/images/features/image3.png",
    title: "সোশাল মিডিয়া অন্তর্ভুক্তি",
    description: "খুব সহজে সোশ্যাল মিডিয়া প্ল্যাটফর্মে পোল শেয়ার কিংবা ওয়েবসাইটে এম্বেড করার অপশন রয়েছে। ",
  },
  {
    id: 4,
    imgSrc: "/images/features/image4.png",
    title: "দ্রুত লাইভ ফলাফল",
    description: "পোলের প্রতিক্রিয়া তাত্ক্ষণিকভাবে জানা যায়  আপডেট ভিজ্যুয়াল চার্ট বা গ্রাফের মাধ্যমে।",
  },
  {
    id: 5,
    imgSrc: "/images/features/image5.png",
    title: "তথ্য সংগ্রহ",
    description: "বিশ্লেষণের জন্য বিভিন্ন ফরম্যাটে (CSV, Excel, PDF) পোল ডেটা ডাউনলোড  করার অপশন রয়েছে। ।",
  },
  {
    id: 6,
    imgSrc: "/images/features/image6.png",
    title: "পরিচয়হীন ভোট ",
    description: "ভোটারদের পরিচয় প্রকাশ না করে গোপনীয়তা অবলম্বন করে জরিপে অংশগ্রহণ করার সুযোগ রয়েছে",
  },
  {
    id: 7,
    imgSrc: "/images/features/image7.png",
    title: "মোবাইল অ্যাপ ভার্সন ",
    description: "মোবাইল ব্যাবহার করে সহজে পোল তৈরি, এবং ভোট দেওয়ার জন্য সাইটের একটি মোবাইল অ্যাপ ভার্সন রয়েছে। ",
  },
  {
    id: 8,
    imgSrc: "/images/features/image8.png",
    title: "নোটিফিকেশন সিস্টেম",
    description: "নতুন প্রতিক্রিয়া ভোট বা কার্যকলাপ সম্পর্কে তাৎক্ষনিক নোটিফিকেশন পাওয়া যায়। ",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-[100px]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold text-black mb-4">
          মতামত মঞ্চ- জনমত জানার একটি সহজ প্লাটফর্ম 
        </h2>
        <p className="text-black mb-10 max-w-2xl mx-auto text-center text-[10px] lg:text-[13px]">
          মতামতমঞ্চ সম্পূর্ণ সফটওয়্যার সমাধান প্রদান করে যাতে আপনি ফ্রি অনলাইন
          পোল তৈরি করতে পারেন, সহজেই বিতরণ করতে পারেন এবং বাস্তব সময়ে
          নির্ভরযোগ্য তথ্য সংগ্রহ করতে পারেন. একাডেমীক গবেষণা, মার্কেট রিসার্চ,
          অডিএন্স এনগেজমেন্ট পলিটিকাল গবেষণা সহ আরও বিষয়ে জনমত জানতে মতামত মঞ্চ
          হতে পারে একটি বিশ্বস্ত প্লাটফর্ম।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 lg-gap-y-2">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              imgSrc={feature.imgSrc}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        <div className="mt-12">
          <button className="bg-[#2746F1] text-buttontext px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold">
            অনলাইনে জরিপ তৈরি করুন প্রায়শই
          </button>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ imgSrc, title, description }) => {
  return (
    <div className="bg-[#f3f5ff]  rounded-md flex items-center text-left w-full h-[139px] sm:h-[auto] sm:max-w-[449px] p-[25px]  sm:p-[25px_10px]">
      <div className="text-blue-600  rounded-full text-4xl mr-4 flex-shrink-0">
        <Image
          src={imgSrc}
          alt={title}
          width={65}
          height={65}
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg text-black font-semibold mb-2 text-[10px] lg:text-[13px]">{title}</h3>
        <p className="text-black text-[10px] lg:text-[13px]">{description}</p>
      </div>
    </div>
  );
};

export default FeaturesSection;
