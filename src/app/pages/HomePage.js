import React, { useEffect, useState } from 'react';
import Link from 'next/link'; // Import Link
import HomeComponent from "../component/common/HomeSectionOne";
import PollComponent from "../component/common/PollComponent";
import StatsSection from "../component/common/StatsSection";
import ArticleCard from "../component/common/ArticleCard";
import FeaturesSection from "../component/common/FeatureSection";
import {api} from "../../utils/helper"
const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${api}/polls`);
        const data = await response.json();
        setArticles(data); 
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className='container m-auto'>
      
      <HomeComponent />
      <div className="">
        <h1 className="lg:text-4xl text-xl font-semibold text-center p-[2rem] text-[#021B0E] leading-snug">
          মতামত মঞ্চ অনলাইন জরিপ
        </h1>
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
        <div className="my-8 text-center">
          <Link href="/poll"> {/* Wrap the button in Link */}
            <button className="bg-[#2746F1] text-buttontext px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold">
              আরও দেখুন
            </button>
          </Link>
        </div>
      </div>
      <PollComponent />
      <StatsSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
