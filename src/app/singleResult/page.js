"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "../component/common/ArticleCard";
import StatisticsGraphCard from "../component/common/StatisticsGraphCard";
import SingleResultSurvey from "../component/common/SingleResultSurvey";
import AgeGraphComponent from "../component/common/AgeGraphComponent";
import { api } from "../../utils/helper";

const PollPage = () => {
  const [articles, setArticles] = useState([]); 
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [pollId, setPollId] = useState(null);

  useEffect(() => {
    const storedPollId = localStorage.getItem("pollId");
    setPollId(storedPollId);
    if (storedPollId) {
      fetchSinglePoll(storedPollId);
    }
  }, []);

  const fetchSinglePoll = async (pollId) => {
    try {
      const response = await fetch(`${api}/polls/${pollId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setQuestion(data.title);
      setDescription(data.description);
      console.log("data:", data.title);
    } catch (error) {
      console.error("Failed to fetch poll:", error);
    }
  };

  useEffect(() => {
    if (pollId) {
      fetchSinglePoll(pollId);
    }
  }, [pollId]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${api}/polls`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        setArticles(data);
        console.log(data.title);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <SingleResultSurvey />
      <div className="text-[#ff3d00] text-lg font-bold mb-4">রাজনীতি</div>

      {/* Title */}
      <h1 className="text-lg md:text-xl font-bold mb-6 leading-tight text-black">
        {question}
      </h1>

      {/* Article content */}
      <p className="text-sm md:text-base mb-2 leading-relaxed text-[#282829CC]">
        {description}
      </p>
      <h1 className="text-2xl font-bold text-gray-800 my-8 text-center">
        ফলাফল বিশ্লেষণ
      </h1>
      <div className="my-8">
        <StatisticsGraphCard />
      </div>
      <div className="my-10">
        <p className="text-sm md:text-base mb-6 leading-relaxed text-[#282829CC]">
          ‘সংঘর্ষ’ এড়াতে বিভিন্ন দেশের ক্রিকেট বোর্ড ও ফ্র্যাঞ্চাইজিভিত্তিক
          লিগগুলোকে একসঙ্গে কাজ করতে হবে বলে মনে করেন নিউজিল্যান্ডের টেস্ট
          অধিনায়ক টিম সাউদি। সাম্প্রতিক সময়ে লিগগুলোর দুয়ার খোলা রাখতে কেইন
          উইলিয়ামসনসহ নিউজিল্যান্ডের বেশ কয়েকজন শীর্ষ সারির ক্রিকেটার বোর্ডের
          সঙ্গে কেন্দ্রীয় চুক্তিতে যাননি। বিশ্বের ফ্র্যাঞ্চাইজিভিত্তিক
          টি-টোয়েন্টি লিগের সংখ্যা দিন দিন বেড়েই চলেছে। ফলে খেলোয়াড়দের চাহিদাও
          বাড়ছে। সঙ্গে আন্তর্জাতিক ক্রিকেটের ঠাসা সূচিও আছে। বিভিন্ন প্রান্তে
          ফ্র্যাঞ্চাইজি লিগগুলোর ভিন্ন ভিন্ন সময়ের কারণে আন্তর্জাতিক ক্রিকেটের
          ওপরে লিগগুলোকে প্রাধান্য দিচ্ছেন অনেকেই।
        </p>
      </div>
      <div className="my-8">
        <AgeGraphComponent />
      </div>
      <div className="">
        <h1 className="text-2xl font-bold text-left p-[2rem] text-gray-800 leading-snug">
          সাদৃশ্যপূর্ণ পোলগুলো
        </h1>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[38px]">
          {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              image_path={article.image_path}
              description={article.description}
              pollId={article.id}
            />
          ))}
        </div>
        <div className="my-8 text-center">
          <button className="bg-mainButtonColor border-mainButtonColor border-2 text-buttontext py-2 px-4 rounded-md text-lg font-semibold">
            আরও দেখুন
          </button>
        </div>
      </div>
    </main>
  );
};

export default PollPage;
