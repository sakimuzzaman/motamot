/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import { api, dateConvertBd } from "../../../utils/helper"
import SocialIcon from "./SocialIcon";
import PollAgeBarChart from "../common/PollAgeBarChart"
import DefaultProfile from "../common/DefaultProfile"




ChartJS.register(ArcElement, Tooltip, Legend);

const CompletePollResult = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  // const [votes, setVotes] = useState([]);
  const [poll, setPoll] = useState(null);
  const [result, setResult] = useState(null); // For results API
  const [currentIndex, setCurrentIndex] = useState(0);
  const [chartResult, setChartResult] = useState(null);
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        let completePollId = localStorage.getItem('completepollId')
        const response = await axios.get(`${api}/polls/${completePollId}`);

        setPoll(response?.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    const fetchResults = async () => {
      try {
        let completePollId = localStorage.getItem('completepollId')

        const response = await axios.get(
          `${api}/polls/${completePollId}/results`
        );

        let result = response?.data?.results[0];
        
        let finalResult = {
          total: 0,
          yes: { vote: 0, percentage: 0 },
          no: { vote: 0, percentage: 0 },
          no_comment: { vote: 0, percentage: 0 }
        };

        if (result) {

          finalResult.total = result?.total_votes
          result?.answers?.map((ans) => {
            if (ans?.answer?.toLowerCase() == 'yes') {
              finalResult.yes.vote = ans?.votes;
              finalResult.yes.percentage = Math.round((ans?.votes / result?.total_votes) * 100);
            }

            if (ans?.answer?.toLowerCase() == 'no') {
              finalResult.no.vote = ans?.votes;
              finalResult.no.percentage = Math.round((ans?.votes / result?.total_votes) * 100);
            }

            if (ans?.answer?.toLowerCase() == 'no comment') {
              finalResult.no_comment.vote = ans?.votes;
              finalResult.no_comment.percentage = Math.round((ans?.votes / result?.total_votes) * 100);
            }
          })
        }

        setResult(finalResult);
      } catch (error) {
        console.error("Error fetching poll results:", error);
      }
    };

    const maleFemaleVoteCountAgeVote = async () => {
      try {
        let completePollId = localStorage.getItem('completepollId')

        const response = await axios.get(
          `${api}/polls/${completePollId}/maleFemaleVoteCountAgeVote`
        );

        let result = response?.data;

        console.log(result, 'fgdfdfdfd');
        

        setChartResult(result);
      } catch (error) {
        console.error("Error fetching poll results:", error);
      }
    }

    maleFemaleVoteCountAgeVote();
    fetchPoll();
    fetchResults();
  }, [isVoteSubmitted]);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  useEffect(() => {
    let userInfo = localStorage.getItem("user");
    setUser(JSON.parse(userInfo))
  }, [])


  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="flex flex-col items-center justify-center w-full lg:w-[900px]">

          <div className="bg-[#F3F5FF] rounded-lg shadow-lg p-12">
            <h3 className="lg:text-lg text-sm text-center font-bold mb-6 text-gray-900">
              <span>জরিপ- : {poll?.title}</span>
            </h3>
            <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
              {/* Left side for voting */}
              <div className="w-96 flex flex-col space-y-4 justify-center">

                <div className="w-full bg-[#E9EEFF] flex justify-between items-center rounded-full dark:bg-gray-700">
                  <div className="bg-[#22C55E] text-md flex justify-between font-medium text-[#fff] text-center py-2 leading-none rounded-full" style={{ width: result?.yes?.percentage + '%' }}>
                    <span className="px-2">
                      হ্যাঁ
                    </span>
                    <span>
                      {result?.yes?.percentage}%
                    </span>
                  </div>
                </div>

                <div className="w-full bg-[#E9EEFF] rounded-full dark:bg-gray-700">
                  <div className="bg-[#EF4444] text-md flex justify-between font-medium text-[#fff] text-center py-2 leading-none rounded-full" style={{ width: result?.no?.percentage + '%' }}>
                    <span className="px-2">
                      না
                    </span>
                    <span>
                      {result?.no?.percentage}%
                    </span>
                  </div>
                </div>

                <div className=" bg-[#E9EEFF] flex justify-between  rounded-full dark:bg-gray-700">

                  <div className="bg-[#f3c423] text-md flex justify-between font-medium text-[#fff] text-center py-2 leading-none rounded-full" style={{ width: result?.no?.percentage + '%' }}>
                    <span className="px-2">
                      মন্তব্য নেই
                    </span>
                    <span>
                      {result?.no_comment?.percentage}%
                    </span>
                  </div>

                </div>


                {/* <div className="bg-[#FFEB3B] text-md flex justify-between font-medium text-[#000] text-center py-2 leading-none rounded-full" style={{ width: result?.no?.percentage + '%' }}>
                    <span >
                      মন্তব্য নেই
                    </span>
                    <span>
                      {result?.no_comment?.percentage}%
                    </span>
                  </div>

                </div> */}

              </div>

              {/* Right side for results */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between">
                <div className="flex-grow">
                  <div className="flex justify-between items-center w-full">
                    <div className="space-y-2 lg:text-lg text-sm text-gray-900">

                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 bg-green-600 inline-block rounded-full mr-2`}></span>
                        <span className="ml-3 text-sm">হ্যাঁ </span>  <span className="ml-8 text-sm">{result?.yes?.vote} ভোট</span> <span className="text-xs">({result?.yes?.percentage}%)</span>
                      </div>

                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 bg-red-500 inline-block rounded-full mr-2`}></span>
                        <span className="ml-3 text-sm">না </span>  <span className="ml-8 text-sm">{result?.no?.vote} ভোট</span> <span className="text-xs">({result?.no?.percentage}%)</span>
                      </div>

                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 bg-yellow-500 inline-block rounded-full mr-2`}></span>
                        <span className="ml-3 text-sm">মন্তব্য নেই </span>  <span className="ml-2 text-sm">{result?.no_comment?.vote} ভোট</span> <span className="text-xs">({result?.no_comment?.percentage}%)</span>
                      </div>

                    </div>

                    <div className="w-48 h-48 my-6 lg:my-1 flex justify-center flex-col items-center">
                      <Pie
                        data={{
                          labels: ["Yes", "No", "No Comment"],
                          datasets: [
                            {
                              label: "# of Votes",
                              data: [result?.yes?.vote, result?.no?.vote, result?.no_comment?.vote],
                              backgroundColor: [
                                "#22c55e", //green
                                "#ef4444", //red
                                "#fbbf24", //yellow
                              ],
                              borderColor: ["#22c55e", "#ef4444", "#fbbf24"],
                              borderWidth: 1,
                            },
                          ],
                        }}
                        options={options}
                      />
                      <span className="text-center mt-1 font-bold">সর্বমোট ভোট {result?.total}টি</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="flex justify-center mt-6">
              <SocialIcon />
            </div> */}
          </div>

        </div>
      </div>
      <div className=" md:px-16 px-4">
        <h4 className="text-[#EF4444] font-semibold">রাজনীতি</h4>
        <h4 className="text-[#021B0E] text-xl my-4 font-bold">{poll?.title}</h4>
        <p>{poll?.description}</p>


        <div className="w-full flex justify-center items-center">
          <span className="text-center ml-2 font-bold">সর্বমোট ভোট {chartResult?.totalGenderCount}টি</span>

          <div className="flex flex-col justify-center items-center">
            <div className="h-48 w-48 mt-12 mb-2 ">
              <Pie
                data={{
                  labels: ["পুরুষ", "মহিলা"],
                  datasets: [
                    {
                      label: "# of Votes",
                      data: [parseInt(chartResult?.male_vote), parseInt(chartResult?.female_vote)],
                      backgroundColor: [
                        "#22c55e",
                        "#ef4444",
                      ],
                      borderColor: ["#22c55e", "#ef4444"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={options}
              />

            </div>
            <span className="text-center mt-1 font-bold">পুরুষ ও মহিলা ভোটের পর্যবেক্ষণ</span>
          </div>
          <div className="mr-2">
            <div className="flex items-center mb-2">
              <span className={`w-4 h-4 bg-green-600 inline-block rounded-full mr-2`}></span>
              <span className="ml-3 text-sm">পুরুষ </span>  <span className="ml-8 text-sm">{parseInt(chartResult?.male_vote)} ভোট</span> <span className="text-xs">({parseInt((chartResult?.male_vote / chartResult?.totalGenderCount) * 100)}%)</span>
            </div>

            <div className="flex items-center mb-2">
              <span className={`w-4 h-4 bg-red-500 inline-block rounded-full mr-2`}></span>
              <span className="ml-3 text-sm">মহিলা </span>  <span className="ml-8 text-sm">{parseInt(chartResult?.female_vote)} ভোট</span> <span className="text-xs">({parseInt((chartResult?.female_vote / chartResult?.totalGenderCount) * 100)}%)</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-center my-12">
          <PollAgeBarChart votes={chartResult?.votes} />

          <span className="text-center mt-1 font-bold">বয়স অনুযায়ী ভোট পর্যবেক্ষণ</span>
          <p className="text-sm text-[#ecc939] font-bold">রেজিস্টার বিহীন {chartResult?.aninumsUsers} ভোট </p>

        </div>
      </div>



      <div className="md:px-16 px-4 mt-4">
        <div className="flex justify-start items-center">
          <DefaultProfile name={user?.name} />
          <span className="ml-1 font-semibold">{user?.name}</span>
        </div>
        <p className="font-semibold mt-1">প্রকাশ: {dateConvertBd(poll?.created_at)}</p>
      </div>

      <div className=" md:px-16 px-4 mt-4">
    
      <SocialIcon/>
      </div>
    </div>
  );
};

export default CompletePollResult;
