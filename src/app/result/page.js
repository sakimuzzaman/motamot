"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "../component/common/ArticleCard";
import { FaChevronDown } from "react-icons/fa";
import { api } from "../../utils/helper";

const PollPage = () => {
  const [articles, setArticles] = useState([]); // State to hold articles
  const [selectedFilter, setSelectedFilter] = useState("সর্বশেষ");
  const [selectedSurvey, setSelectedSurvey] = useState("live");
  const [selectedSort, setSelectedSort] = useState("নতুন থেকে পুরাতন");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${api}/polls`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data); // Update with fetched data
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []); // Run only once on mount

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSurveyToggle = (type) => {
    setSelectedSurvey(type);
  };

  // Filtered articles based on selectedSurvey
  const filteredArticles = articles.filter(
    (article) =>
      (selectedSurvey === "live" && article.status === "Live") ||
      (selectedSurvey === "completed" && article.status === "Complete")
  );

  // Sort articles based on selectedSort
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (selectedSort === "নতুন থেকে পুরাতন") {
      return b.id - a.id; // Sort descending by id
    } else {
      return a.id - b.id; // Sort ascending by id
    }
  });

  return (
    <main className="container mx-auto md:px-16 px-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          সকল অনলাইন জরিপ
        </h1>
        <div className="flex overflow-x-auto gap-2 justify-between mb-6">
          <button
            onClick={() => handleFilterClick("সর্বশেষ")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "সর্বশেষ"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            সর্বশেষ
          </button>
          <button
            onClick={() => handleFilterClick("রাজনীতি")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "রাজনীতি"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            রাজনীতি
          </button>
          <button
            onClick={() => handleFilterClick("বিনোদন")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "বিনোদন"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            বিনোদন
          </button>
          <button
            onClick={() => handleFilterClick("নীতিমালা")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "নীতিমালা"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            বিশ্ব
          </button>
          <button
            onClick={() => handleFilterClick("বিশ্ব")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "বিশ্ব"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            বাণিজ্য
          </button>
          <button
            onClick={() => handleFilterClick("খেলা")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "খেলা"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            খেলা
          </button>
          <button
            onClick={() => handleFilterClick("বাংলাদেশ")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "বাংলাদেশ"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            বাংলাদেশ
          </button>
          <button
            onClick={() => handleFilterClick("অপরাধ")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "অপরাধ"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            অপরাধ
          </button>
          <button
            onClick={() => handleFilterClick("চাকরি")}
            className={`px-4 py-2 rounded w-[114px] h-[42px] ${
              selectedFilter === "চাকরি"
                ? "border border-[#EF4444] text-[#EF4444]"
                : "border border-black text-black"
            }`}
          >
            চাকরি
          </button>
        </div>
        <div className="flex justify-between">
          <div className="flex rounded-lg overflow-hidden mb-6 w-60">
            <button
              onClick={() => handleSurveyToggle("live")}
              className={`px-4 py-2 w-1/2 ${
                selectedSurvey === "live"
                  ? "text-black bg-[#FFDFDF] border-b-2 border-red-500"
                  : "text-[#7C7E7D] bg-[#EDEDED]"
              }`}
            >
               চলমান পোল
            </button>
            <button
              onClick={() => handleSurveyToggle("completed")}
              className={`px-4 py-2 w-1/2 ${
                selectedSurvey === "completed"
                  ? "text-black bg-[#FFDFDF] border-b-2 border-red-500"
                  : "text-[#7C7E7D] bg-[#EDEDED]"
              }`}
            >
              সম্পূর্ণ পোল
            </button>
          </div>
          <div className="relative inline-block w-[200px]">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="block w-full cursor-pointer text-gray-800 bg-buttontext border border-black rounded px-4 py-2 appearance-none pr-8"
            >
              <option value="নতুন থেকে পুরাতন">নতুন থেকে পুরাতন</option>
              <option value="পুরাতন থেকে নতুন">পুরাতন থেকে নতুন</option>
            </select>

            {/* Custom Down Arrow */}
            <div className="absolute inset-y-0 right-2 bottom-6 flex items-center px-2 pointer-events-none">
              <FaChevronDown className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="border border-[#DDDDDD] mb-10"></div>

        {/* Check if sortedArticles is empty and show message */}
        {sortedArticles.length === 0 ? (
          <div className="text-center text-gray-500">
            {selectedSurvey === "live"
              ? "No Live Result Details Available"
              : "No Completed Result Details Available"}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {sortedArticles.map((article, index) => (
              <ArticleCard
                key={index}
                title={article.title}
                image_path={article.image_path}
                description={article.description}
                pollId={article.id} // Pass the poll ID here
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default PollPage;
