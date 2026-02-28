import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ConfirmationVote from "../modal/ConfirmationVote";
import BasicInformation from "../modal/BasicInformation";
import LoginComponent from "../modal/LogIn";
import Registration from "../modal/Registration";
import BasicInfoSubmit from "../modal/BasicInfoSubmit";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {api} from "../../../utils/helper"
function Singlesurvey() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionId, setSelectedOptionId] = useState(null); // For answer ID
  const [isVoted, setIsVoted] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBasicInfoModalOpen, setBasicInfoModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isBasicInfoSubmitOpen, setBasicInfoSubmitOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [pollId, setPollId] = useState(null); 
  const [answers, setAnswers] = useState([]);
  const [questionId, setQuestionId] = useState(null);
  const [votes, setVotes] = useState({
    হ্যাঁ: 0,
    না: 0,
    "মন্তব্য নেই": 0,
  });
  useEffect(() => {
    const storedPollId = localStorage.getItem("pollId");
    setPollId(storedPollId);
    if (storedPollId) {
      fetchSinglePoll(storedPollId);
    }
  }, []);
  const totalVotes = votes["হ্যাঁ"] + votes["না"] + votes["মন্তব্য নেই"];
  const calculatePercentage = (count) => {
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
  };

  const data = {
    labels: ["হ্যাঁ", "না", "মন্তব্য নেই"],
    datasets: [
      {
        label: "ভোটের সংখ্যা",
        data: [votes["হ্যাঁ"], votes["না"], votes["মন্তব্য নেই"]],
        backgroundColor: ["#34D399", "#EF4444", "#FBBF24"],
        hoverOffset: 4,
      },
    ],
  };

  const fetchSinglePoll = async (pollId) => {
    try {
      const response = await fetch(
        `${api}/polls/${pollId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Set the question text
      setQuestion(data.title);
      setQuestionId(data.questions[0]?.id);
      // Translate answers and map them to IDs
      const translatedAnswers = data.questions[0]?.answers.map((answer) => {
        let translatedText = answer.answer;

        // Translate the answers to Bengali
        if (answer.answer === "Yes") translatedText = "হ্যাঁ";
        else if (answer.answer === "No") translatedText = "না";
        else if (answer.answer === "No Comment") translatedText = "মন্তব্য নেই";

        return {
          id: answer.id,
          text: translatedText,
        };
      });
      setAnswers(translatedAnswers); // Set the translated answers
    } catch (error) {
      console.error("Failed to fetch poll:", error);
    }
  };

  const fetchAnalytics = async (pollId) => {
    try {
      const response = await fetch(
        `${api}/polls/${pollId}/analytics`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Extract the first question's answers
      if (data.analytics.questions.length > 0) {
        const firstQuestion = data.analytics.questions[0];
        const newVotes = {
          হ্যাঁ: 0,
          না: 0,
          "মন্তব্য নেই": 0,
        };

        firstQuestion.answers.forEach((answer) => {
          if (answer.answer === "Yes") {
            newVotes["হ্যাঁ"] = answer.votes;
          } else if (answer.answer === "No") {
            newVotes["না"] = answer.votes;
          } else {
            newVotes["মন্তব্য নেই"] = answer.votes;
          }
        });

        setVotes(newVotes);
      }
    } catch (error) {
      console.error("Failed to fetch poll analytics:", error);
    }
  };

  useEffect(() => {
    fetchSinglePoll(pollId);
    fetchAnalytics(pollId);
  }, [pollId]);

  const handleOptionChange = (e) => {
    const optionText = e.target.value;
    setSelectedOption(optionText);

    // Find the corresponding answer ID
    const option = answers.find((answer) => answer.text === optionText);
    setSelectedOptionId(option?.id || null); // Set the selected answer ID
  };

  const handleVote = async () => {
    if (!selectedOption || !selectedOptionId) return;
    const voteData = {
      question_id: questionId, 
      answer_id: selectedOptionId, 
      anonymous: true, 
    };
  
    try {
      const response = await axios.post(
        `${api}/polls/${pollId}/vote`,
        voteData
      );
      console.log("Vote submitted successfully:", response.data);
  
      setVotes((prevVotes) => ({
        ...prevVotes,
        [selectedOption]: prevVotes[selectedOption] + 1,
      }));
      toast.success("Vote submitted successfully!");
  
      setIsVoted(true);
      setModalOpen(true); 
    } catch (error) {
      console.error("Error submitting vote:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while submitting your vote.");
      }
    }
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

  const handleCloseIconConfirmation = () => {
    setModalOpen(false);
  };

  const handleCloseBasicInfoModal = () => {
    setBasicInfoModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleOpenRegistrationModal = () => {
    setLoginModalOpen(false); 
    setRegistrationModalOpen(true); 
  };

  const handleCloseRegistrationModal = () => {
    setRegistrationModalOpen(false);
  };

  const handleBasicInfoSubmit = () => {
    setBasicInfoModalOpen(false); 
    setBasicInfoSubmitOpen(true); 
  };

  const handleCloseBasicInfoSubmit = () => {
    setBasicInfoSubmitOpen(false); 
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="text-black shadow-md rounded-lg p-6 w-full max-w-5xl bg-[#f3f5ff]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {" "}
          জরিপ {pollId} : {question}
        </h2>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Form section */}
          <div className="w-full lg:w-1/2">
            <form>
              <div className="space-y-4">
              {answers.map((answer) => (
                <div className="flex items-center space-x-3" key={answer.id}>
                  <label
                    className={`flex-1 relative p-3 rounded-lg border cursor-pointer ${
                      selectedOption === answer.text
                        ? (answer.text === "হ্যাঁ" ? "border-green-500" : answer.text === "না" ? "border-red-500" : "border-yellow-500")
                        : "border border-gray-300"
                    } ${isVoted && "cursor-not-allowed"}`}
                  >
                    <input
                      type="radio"
                      value={answer.text}
                      checked={selectedOption === answer.text}
                      onChange={handleOptionChange}
                      disabled={isVoted}
                      className="form-radio cursor-pointer h-5 w-5 appearance-none rounded-full border border-gray-400 checked:border-transparent"
                      style={{
                        backgroundColor: selectedOption === answer.text
                          ? (answer.text === "হ্যাঁ" ? "#34D399" : answer.text === "না" ? "#EF4444" : "#FBBF24")
                          : "transparent",
                      }}
                    />
                    <span className="ml-3 text-lg font-semibold">{answer.text}</span>
                  </label>
                </div>
              ))}
              </div>
            </form>
          </div>

          {/* Result section */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:flex-row justify-between lg:space-x-6 pl-4">
            <div className="w-full lg:w-1/2">
              <div className="mt-6 lg:mt-0">
                <ul className="space-y-2 text-[12px] font-bold">
                  <li className="flex items-center ">
                    <span className="h-4 w-4 bg-green-500 rounded-full mr-2"></span>
                    হ্যাঁ - {votes["হ্যাঁ"]} ভোট (
                    {calculatePercentage(votes["হ্যাঁ"])}%)
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-red-500 rounded-full mr-2"></span>
                    না - {votes["না"]} ভোট ({calculatePercentage(votes["না"])}%)
                  </li>
                  <li className="flex items-center">
                    <span className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></span>
                    মন্তব্য নেই - {votes["মন্তব্য নেই"]} ভোট (
                    {calculatePercentage(votes["মন্তব্য নেই"])}%)
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[50%] lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div style={{ width: "200px", height: "200px" }}>
                <Pie data={data} options={options} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleVote}
            disabled={isVoted}
            className={`mt-6  px-6 py-2 bg-mainButtonColor text-buttontext text-lg font-semibold rounded-lg shadow-md ${
              isVoted && "cursor-not-allowed"
            }`}
          >
            মতামত দিন
          </button>
        </div>
      </div>

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
        />
      )}

      {/* Login Modal */}
      {isLoginModalOpen && (
        <LoginComponent
          closeLoginModal={handleCloseLoginModal}
          onRegisterClick={handleOpenRegistrationModal}
        />
      )}

      {isRegistrationModalOpen && (
        <Registration
          closeRegistrationModal={handleCloseRegistrationModal}
          onLoginClick={handleOpenLoginModal}
        />
      )}

      {isBasicInfoSubmitOpen && (
        <BasicInfoSubmit onClose={handleCloseBasicInfoSubmit} />
      )}
    </div>
  );
}

export default Singlesurvey;
