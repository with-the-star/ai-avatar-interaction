import React, { useState } from "react";
import quizData from "../assets/json/quiz.json";

interface Question {
  question: string;
  options: string[];
  answer: string;
  resources?: string[];
}

const Quiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [resources, setResources] = useState<string[]>([]);
  const questions: Question[] = quizData.data;

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
    setSuccess("");
    setWarning("");
    setShowNext(false);
    setResources([]);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      setWarning("Please select an answer!");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.options[selectedOption] === currentQuestion.answer) {
      setSuccess("Great job! Let's move on to the next topic.");
      setShowNext(true);
      setResources([]);
    } else {
      setWarning("Incorrect answer, please try again!");
      setResources(currentQuestion.resources || []);
      setShowNext(false);
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
    setShowNext(false);
    setResources([]);
    setSuccess("");
  };

  return (
    <div className="flex flex-col mt-6 gap-4">
      <h3 className="font-semibold text-2xl">Quiz</h3>
      {currentQuestionIndex < questions.length ? (
        <div className="px-3">
          <p className="font-semibold mb-3">
            {questions[currentQuestionIndex].question}
          </p>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="mb-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => handleOptionChange(index)}
                />
                {option}
              </label>
            </div>
          ))}
          <div className="mt-5">
            {!showNext && (
              <button
                className="px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {showNext && (
              <button
                className="px-5 py-2.5 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
          {success && (
            <p className="text-green-500 mt-4 text-lg font-semibold">
              {success}
            </p>
          )}
          {warning && (
            <p className="text-red-500 mt-4 text-lg font-semibold">{warning}</p>
          )}
          {resources.length > 0 && (
            <div className="mt-2">
              <h3 className="text-xl font-semibold">Supplemental Resources:</h3>
              <ul className="flex flex-col gap-3 mt-2">
                {resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      className="underline underline-offset-1 text-blue-400"
                      href={resource}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <h3 className="text-blue-500 text-lg">You've completed the quiz!</h3>
      )}
    </div>
  );
};

export default Quiz;
