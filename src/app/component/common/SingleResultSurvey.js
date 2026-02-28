import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import {api} from "../../../utils/helper"
function SurveyResults() {
  const [question, setQuestion] = useState("");
  const [votes, setVotes] = useState({
    হ্যাঁ: 0,
    না: 0,
    "মন্তব্য নেই": 0,
  });
  const [pollId, setPollId] = useState(null);

  useEffect(() => {
    const storedPollId = localStorage.getItem("pollId");
    setPollId(storedPollId);
  }, []);

  const fetchSinglePoll = async (pollId) => {
    try {
      const response = await fetch(
        `${api}/polls/${pollId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestion(data.title);
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
    const fetchPollAnalytics = async (pollId) => {
      try {
        const response = await fetch(
          `${api}/polls/${pollId}/analytics`
        );
        console.log("response",response)
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Update question title
        setQuestion(data.analytics.questions[0].title);

        // Map API votes to local state
        const answers = data.analytics.questions[0].answers;
        setVotes({
          হ্যাঁ: answers.find(answer => answer.answer === "Yes")?.votes || 0,
          না: answers.find(answer => answer.answer === "No")?.votes || 0,
          "মন্তব্য নেই": answers.find(answer => answer.answer === "No Comment")?.votes || 0,
        });
      } catch (error) {
        console.error("Failed to fetch poll analytics:", error);
      }
    };

    if (pollId) {
      fetchPollAnalytics(pollId);
    }
  }, [pollId]);

  const totalVotes = votes["হ্যাঁ"] + votes["না"] + votes["মন্তব্য নেই"];

  const calculatePercentage = (count) => {
    return totalVotes === 0 ? 0 : Math.round((count / totalVotes) * 100);
  };

  const data = {
    labels: ["হ্যাঁ", "না", "মন্তব্য নেই"],
    datasets: [
      {
        data: [votes["হ্যাঁ"], votes["না"], votes["মন্তব্য নেই"]],
        backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4 text-black">
      <div className="bg-[#f3f5ff] rounded-lg shadow-lg p-6 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-6 text-center">
          জরিপ {pollId} : {question}
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="w-full md:w-1/2">
            <ul className="space-y-4">
              <li className="flex items-center space-x-4 relative">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-10 mt-1">
                    <div
                      className="bg-[#DCE3FF;] h-10 rounded-full"
                      style={{
                        width: `${calculatePercentage(votes["হ্যাঁ"])}%`,
                      }}
                    ></div>
                    <div className="absolute flex gap-2 items-center top-[13px] left-5">
                      <input type="radio" disabled />
                      <p>হ্যাঁ</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-4 relative">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-10 mt-1">
                    <div
                      className="bg-[#DCE3FF;] h-10 rounded-full"
                      style={{ width: `${calculatePercentage(votes["না"])}%` }}
                    ></div>
                    <div className="absolute flex gap-2 items-center top-[13px] left-5">
                      <input type="radio" disabled />
                      <p>না</p>
                    </div>
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-4 relative">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-10 mt-1">
                    <div
                      className="bg-[#DCE3FF;] h-10 rounded-full"
                      style={{
                        width: `${calculatePercentage(votes["মন্তব্য নেই"])}%`,
                      }}
                    ></div>
                    <div className="absolute flex gap-2 items-center top-[13px] left-5">
                      <input type="radio" disabled />
                      <p>মন্তব্য নেই</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:flex-row justify-between lg:space-x-6">
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
        <div className="flex justify-center mt-6">
          <button className="bg-blue-500 text-buttontext font-semibold px-6 py-2 rounded-md hover:bg-blue-600">
            ফলাফল শেয়ার করুন
          </button>
        </div>
      </div>
    </div>
  );
}

export default SurveyResults;
