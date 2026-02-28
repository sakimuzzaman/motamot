"use client";
import React, { useEffect, useState } from "react";
import ArticleCard from "../component/common/ArticleCard";
import SingleSurveyDescription from "../component/common/SingleSurveyDescription";
import SurveySingle from "../component/common/SurveySingle";
import { api } from "../../utils/helper";

const PollPage = () => {
  const [articles, setArticles] = useState([]); // State to hold articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${api}/polls`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setArticles(data); 
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []); 
  return (
    <main className="container mx-auto p-4 md:p-8">
      <SurveySingle />
      <SingleSurveyDescription />
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        সাদৃশ্যপূর্ণ পোলগুলো
      </h1>
      <div className="flex flex-col gap-8">
      {/* {articles.map((article, index) => (
            <ArticleCard
              key={index}
              title={article.title}
              image_path={article.image_path}
              description={article.description}
              pollId={article.id} // Pass the poll ID here
            />
          ))} */}
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[38px] md:px-16 px-4">
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
        </div>
    </main>
  );
};

export default PollPage;
