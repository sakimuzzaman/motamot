"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "../component/common/ArticleCard";
import ArticleCardComplete from "../component/common/ArticleCardComplete";
import { FaChevronDown } from "react-icons/fa";
import { api } from "../../utils/helper";

const PollPage = () => {
  const [articles, setArticles] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("সর্বশেষ");
  const [selectedSurvey, setSelectedSurvey] = useState("live");
  const [selectedSort, setSelectedSort] = useState("asc");

  const completePollFilter = () => {
    // Get the current date and time
    const currentDate = new Date();

    // Filter and format
    const filteredData = responseData.filter(item => {
      const endDate = new Date(item.end_at);
      return endDate < currentDate;
    }).map(item => ({
      ...item,
      end_at: item.end_at // Retains the original format
    }));

    // console.log(filteredData, 'fdfdfdssssss');
    setArticles(filteredData);

  }  

  const ascDescFilter = (type) => {
    setSelectedSort(type)
    const sortedArticles = [...articles].sort((a, b) => {
      if (type === "asc") {
        return a.id - b.id; // Ascending order
      } else if (type === "desc") {
        return b.id - a.id; // Descending order
      }
      return 0; // No sorting if type is neither 'asc' nor 'desc'
    });

    setArticles(sortedArticles);
  }


  const livePollFilter = () => {
    // Get the current date and time
    const currentDate = new Date();    

    // Filter and format
    const filteredData = responseData?.filter(item => {
      const endDate = new Date(item.end_at);
      return endDate > currentDate;
    }).map(item => ({
      ...item,
      end_at: item.end_at // Retains the original format
    }));    

    setArticles(filteredData);

  }


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${api}/polls`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResponseData(data)
   
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    livePollFilter()
  }, [responseData, livePollFilter])

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const handleSurveyToggle = (type) => {
    setSelectedSurvey(type);
    if (type == 'live') {      
      livePollFilter()
    } else {
      completePollFilter()
    }
  };


  return (
    <main className="container mx-auto md:px-16 px-4">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">সকল অনলাইন জরিপ</h1>
        <div className="flex overflow-x-auto gap-2 justify-between mb-6">
          {/* Filter buttons */}
          {["সর্বশেষ", "রাজনীতি", "বিনোদন", "নীতিমালা", "বিশ্ব", "বাণিজ্য", "খেলা", "বাংলাদেশ", "অপরাধ", "চাকরি"].map(
            (filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 rounded w-[114px] h-[42px] ${selectedFilter === filter
                    ? "border border-[#EF4444] text-[#EF4444]"
                    : "border border-black text-black"
                  }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex rounded-lg overflow-hidden mb-6 w-60">
            <button
              onClick={() => handleSurveyToggle("live")}
              className={`px-4 py-2 w-1/2 ${selectedSurvey === "live"
                  ? "text-black bg-[#FFDFDF] border-b-2 border-red-500"
                  : "text-[#7C7E7D] bg-[#EDEDED]"
                }`}
            >
              চলমান পোল
            </button>
            <button
              onClick={() => handleSurveyToggle("completed")}
              className={`px-4 py-2 w-1/2 ${selectedSurvey === "completed"
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
              onChange={(e) => ascDescFilter(e.target.value)}
              className="block w-full cursor-pointer text-gray-800 bg-buttontext border border-black rounded px-4 py-2 appearance-none pr-8"
            >
              <option value="asc">নতুন থেকে পুরাতন</option>
              <option value="desc">পুরাতন থেকে নতুন</option>
            </select>
            <div className="absolute inset-y-0 right-2 bottom-6 flex items-center px-2 pointer-events-none">
              <FaChevronDown className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="border border-[#DDDDDD] mb-10"></div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[38px]">
          {articles.length > 0 ? (
            articles?.map((article, index) => (
              selectedSurvey === "live" ?
              <ArticleCard
                key={index}
                title={article.title}
                image_path={article.image_path}
                description={article.description}
                pollId={article.id}
                />
                :
                <ArticleCardComplete
                  key={index}
                  title={article.title}
                  image_path={article.image_path}
                  description={article.description}
                  pollId={article.id}
                />
            ))
          ) : (
            <p className="text-gray-600 text-center">
              {selectedSurvey === "live" ? "No Live Polls Available" : "No Completed Polls Available"}
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default PollPage;
