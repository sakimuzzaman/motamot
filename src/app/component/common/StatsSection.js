import React from "react";

const StatsSection = () => {
  return (
    <section className="bg-[#23CD77] text-buttontext py-8">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-black">
          আমরা ১৫,০০,০০০+ ব্যবহারকারীর আস্থা অর্জন করতে পেরেছি।
        </h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 font-bold">
        <div className="text-center text-black">
          <h2 className="text-4xl text-buttontext">১৫ লক্ষ+</h2>
          <p className="mt-2 text-lg">ব্যবহারকারী</p>
        </div>
        <div className="text-center text-black md:border-l md:pl-12 border-black">
          <h2 className="text-4xl text-buttontext">১১ লক্ষ+</h2>
          <p className="mt-2 text-lg">মতামত-জরিপ</p>
        </div>
        <div className="text-center text-black md:border-l md:pl-12 border-black">
          <h2 className="text-4xl text-buttontext">৭০ লক্ষ+</h2>
          <p className="mt-2 text-lg ">ভোট গ্রহণ</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
