"use client";
import ArticleCard from "../component/common/ArticleCard";
import SurveySingle from "../component/common/SurveySingle";
import SingleSurveyDescription from "../component/common/SingleSurveyDescription";


const SingleSurveyPage = () => {
  return (
    <main>
    <SurveySingle/>
    <SingleSurveyDescription/>
    <ArticleCard limit={4} />
      
    </main>
  );
};

export default SingleSurveyPage;
