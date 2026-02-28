/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { IoShareSocialSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../utils/helper"
import LoginComponent from "../modal/LogIn";
import SocialIcon from "../common/SocialIcon"
import ConfirmationVote from "../modal/ConfirmationVote";
import BasicInformation from "../modal/BasicInformation";
import BasicInfoSubmit from "../modal/BasicInfoSubmit";
import Registration from "../modal/Registration";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";



ChartJS.register(ArcElement, Tooltip, Legend);

const HomeComponent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  // const [votes, setVotes] = useState([]);
  const [polls, setPolls] = useState([]);
  const [results, setResults] = useState([]); // For results API
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVoteSubmitted, setIsVoteSubmitted] = useState(false);
  const [voteComplete, setVoteComplete] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setBasicInfoModalOpen] = useState(false);
  const [isBasicInfoSubmitOpen, setBasicInfoSubmitOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);


  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await axios.get(`${api}/polls`);
        const formattedPolls = response.data.map((poll) => {
          const answers = poll.questions[0].answers.map((answer) => ({
            id: answer.id,
            label: answer.answer,
            votes: 0,
          }));

          const noCommentAnswer = poll.questions[0].answers.find(
            (answer) => answer.answer === "No Comment"
          );
          const noCommentAnswerId = noCommentAnswer ? noCommentAnswer.id : null;

          const questions = poll.questions.map((question) => ({
            id: question.id,
            text: question.question,
          }));

          return {
            id: poll.id,
            title: `${poll.title}`,
            answers,
            questions,
            noCommentAnswerId,
          };
        });

        setPolls(formattedPolls);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };

    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `${api}/poll/all-results`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching poll results:", error);
      }
    };

    fetchPolls();
    fetchResults();
  }, [isVoteSubmitted]);

  const handleCloseIconConfirmation = () => {
    setModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };


  const handleOpenLoginModal = () => {
    setModalOpen(false);
    setLoginModalOpen(true);
    setRegistrationModalOpen(false);
  };

  const handleOpenBasicInfoModal = () => {
    setModalOpen(false);
    setBasicInfoModalOpen(true);
  };

  const handleCloseBasicInfoModal = () => {
    setBasicInfoModalOpen(false);
  };

  const handleBasicInfoSubmit = () => {
    setBasicInfoModalOpen(false);
    setBasicInfoSubmitOpen(true);
  };

  const handleCloseBasicInfoSubmit = () => {
    setBasicInfoSubmitOpen(false);
  };

  const handleCloseRegistrationModal = () => {
    setRegistrationModalOpen(false);
  };

  const handleOpenRegistrationModal = () => {
    setRegistrationModalOpen(true);
    setLoginModalOpen(false); // Close login modal when registration is opened
  };

  const handleVote = async (e) => {
    e.preventDefault();

    if (selectedOption) {
      try {
        const currentPoll = polls[currentIndex];
        const answer = currentPoll.answers.find(
          (ans) => ans.label.toLowerCase() === selectedOption.toLowerCase()
        );

        if (!answer || !answer.id) {
          toast.error("Answer not found or answer ID is missing.");
          return;
        }
        const answerId = answer.id;

        const response = await axios.post(
          `${api}/polls/${currentPoll.id}/vote`,
          {
            question_id: currentPoll.questions[0].id,
            answer_id: answerId,
            anonymous: true,
          }
        );


        setIsVoteSubmitted(true);
        setSelectedOption(null);

        toast.success("ভোট সফলভাবে জমা দেওয়া হয়েছে।");
        setModalOpen(true)
        setVoteComplete(response?.data?.vote)

      } catch (error) {
        console.error("Error submitting vote:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {

          toast.error(error.response.data.message);
          setModalOpen(true)
          setVoteComplete(error?.response?.data?.vote)

        } else {
          toast.error("An error occurred while submitting your vote.");
        }
      }
    } else {
      toast.error("Please select an option to vote.");
    }
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

   
  const handleOptionChange = (option, index) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [index]: option,
    }));
  };
  
  

  return (
    <div className="flex justify-center mb-12">
      <div className="flex flex-col items-center justify-center w-full lg:w-[900px]">
        <ToastContainer position="top-center" autoClose={3000} />


        {/* <h1 className="lg:text-4xl text-xl  font-semibold text-center lg:p-[2rem] py-2 px-1 text-[#021B0E] leading-normal">
          প্রতিটি মতামতই মূল্যবান, তাই এখনই আপনার মতামত দিয়ে পরিবর্তনের সূচনা করুন!
        </h1> */}



 
         <div className="m-0">
          <h1 className="lg:text-3xl text-xl font-semibold text-center lg:p-[2rem] py-1 px-1 text-[#021B0E] leading-tight ">
            প্রতিটি মতামতই মূল্যবান, তাই এখনই আপনার
          </h1>
          <h1 className="lg:text-3xl text-xl font-semibold text-center lg:p-[2rem] py-1 px-1 text-[#021B0E] leading-tight -mt-10">
            মতামত দিয়ে পরিবর্তনের সূচনা করুন!
          </h1>
        </div> 

       


        //swiper slide here

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="w-full"
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
        >
          {polls.map((poll, index) => (
            <SwiperSlide key={poll.id}>
              <div className="bg-[#f3f5ff] rounded-lg shadow-lg p-12">
                <h3 className="lg:text-lg text-sm font-bold text-center mb-6 text-gray-900">
                  <span>জরিপ-{poll.id} : </span>
                  <span className="">{poll.title}</span>
                </h3>
                <div className="flex flex-col md:flex-row justify-between items-stretch gap-6">
                  {/* Left side for voting */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <form
                      onSubmit={(e) => handleVote(e, index)}
                      className="space-y-8 flex flex-col"
                    >
                      {["Yes", "No", "No Comment"].map((option) => (
                        <label
                          key={option}
                          className={`flex-1 relative p-3 rounded-lg bg-[#fff] border cursor-pointer text-gray-700 flex items-center ${selectedOptions[index] === option
                              ? option === "Yes"
                                ? "border-green-500"
                                : option === "No"
                                  ? "border-red-500"
                                  : "border-yellow-500"
                              : "border border-gray-300"
                            } ${isVoteSubmitted && "cursor-not-allowed"}`}
                        >
                          <input
                            type="radio"
                            value={option}
                            checked={selectedOptions[index] === option}
                            onChange={() => handleOptionChange(option, index)}
                            disabled={isVoteSubmitted}
                            className="form-radio cursor-pointer h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-transparent"
                            style={{
                              backgroundColor:
                                selectedOptions[index] === option
                                  ? option === "Yes"
                                    ? "#34D399"
                                    : option === "No"
                                      ? "#EF4444"
                                      : "#FBBF24"
                                  : "transparent",
                            }}
                          />
                          <span className="ml-3 lg:text-lg text-sm font-semibold">
                            {option === "Yes"
                              ? "হ্যাঁ"
                              : option === "No"
                                ? "না"
                                : "মন্তব্য নেই"}
                          </span>
                        </label>
                      ))}
                      <div className="text-center">
                        <button
                          type="submit"
                          className="bg-[#2746F1] text-buttontext cursor-pointer px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold"
                          disabled={!selectedOptions[index]}
                        >
                          {isVoteSubmitted ? (
                            <span
                              className="flex items-center justify-center"
                              onClick={handleOpenLoginModal}
                            >
                              <IoShareSocialSharp />
                              পোলটি শেয়ার করুন
                            </span>
                          ) : (
                            "মতামত দিন"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="sm:w-[0.3px] bg-gray-300 w-full lg:border-none border border-[#ccc]"></div>

                  {/* Right side for results */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div className="flex-grow">
                      <h4 className="lg:text-lg text-sm font-bold text-red-500 text-left">
                        জরিপ ফলাফল
                      </h4>
                      <div className="flex justify-between items-center w-full">
                        <div className="space-y-2 lg:text-lg text-sm text-left text-gray-900">
                          {results[index]?.results[0]?.answers.map((answer) => (
                            <div
                              className="flex items-center mb-2"
                              key={answer.answer}
                            >
                              <span
                                className={`w-4 h-4 ${answer.answer.toLowerCase() === "yes"
                                    ? "bg-green-600"
                                    : answer.answer.toLowerCase() === "no"
                                      ? "bg-red-600"
                                      : "bg-yellow-500"
                                  } inline-block rounded-full mr-2`}
                              ></span>
                              <span
                                className={`${answer.answer.toLowerCase() === "yes"
                                    ? "text-green-600"
                                    : answer.answer.toLowerCase() === "no"
                                      ? "text-red-600"
                                      : "text-yellow-500"
                                  } font-semibold`}
                              >
                                {answer.answer.toLowerCase() === "yes"
                                  ? "হ্যাঁ"
                                  : answer.answer.toLowerCase() === "no"
                                    ? "না"
                                    : answer.answer.toLowerCase() === "no comment"
                                      ? "মন্তব্য নেই"
                                      : ""}
                                : {answer.votes} ভোট
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="w-48 h-48">
                          <Pie
                            data={{
                              labels: ["Yes", "No", "No Comment"],
                              datasets: [
                                {
                                  label: "# of Votes",
                                  data: results[index]
                                    ? results[index]?.results[0]?.answers.map(
                                      (ans) => ans.votes
                                    )
                                    : [0, 0, 0],
                                  backgroundColor: [
                                    "#22c55e",
                                    "#ef4444",
                                    "#fbbf24",
                                  ],
                                  borderColor: ["#22c55e", "#ef4444", "#fbbf24"],
                                  borderWidth: 1,
                                },
                              ],
                            }}
                            options={options}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 text-center">
                      <button
                        onClick={handleOpenLoginModal}
                        className="bg-transparent text-[#2746F1] border border-[#2746F1] px-[18px] py-[9px] rounded-[7px] text-xs md:text-sm font-bold"
                      >
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>



        <div className="">

          <button
            className=" p-4 custom-prev absolute left-8 top-3/4 transform -translate-y-1/2 bg-[#8e90a1] text-white rounded-full  z-10"
            aria-label="Previous Slide"
          >
            <FaChevronLeft />

          </button>
          <button
            className="p-4 custom-next absolute right-8 top-3/4 transform -translate-y-1/2 bg-[#8e90a1] text-white rounded-full  z-10"
            aria-label="Next Slide"
          >
            <FaChevronRight />
          </button>

        </div>



        <div className="custom-pagination mt-4 flex justify-center"></div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <ConfirmationVote
            onCloseIcon={handleCloseIconConfirmation}
            onLoginClick={handleOpenLoginModal}
            onDataClick={handleOpenBasicInfoModal}
          />
        )}

        {/* Basic Information Modal */}
        {isBasicInfoModalOpen && (
          <BasicInformation
            onCloseIconBasicInfo={handleCloseBasicInfoModal}
            onSubmit={handleBasicInfoSubmit}
            vote={voteComplete}
          />
        )}

        {isBasicInfoSubmitOpen && (
          <BasicInfoSubmit onClose={handleCloseBasicInfoSubmit} />
        )
        }

        {/* Login Modal */}
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-buttontext rounded-xl w-11/12 md:w-[690px]">
              <LoginComponent
                closeLoginModal={handleCloseLoginModal}
                onRegisterClick={handleOpenRegistrationModal}
              />
            </div>
          </div>
        )}

        {isRegistrationModalOpen && (
          <Registration
            closeRegistrationModal={handleCloseRegistrationModal}
            onLoginClick={handleOpenLoginModal}
          />
        )}

      </div>

    </div>
  );
};

export default HomeComponent;






































