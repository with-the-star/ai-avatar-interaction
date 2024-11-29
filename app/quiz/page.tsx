"use client";
import React, { useState, useEffect } from 'react';

interface Quiz {
  question: string;
  options: string[];
  correctAnswer: string;
}

export default function QuizPage() {
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [success, setSuccess] = useState("");
  const [warning, setWarning] = useState("");
  const [showNext, setShowNext] = useState(false);
  const [resources, setResources] = useState<string[]>([]);

  useEffect(() => {
    setCurrentQuestionIndex(0)
    const storedQuizData = localStorage.getItem('quizData');
    if (storedQuizData) {
      try {
        const parsedData = JSON.parse(storedQuizData);
        setQuizData(parsedData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
  }, []);

  const handleOptionChange = (index: number) => {
    setSelectedOption(index);
    setShowNext(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      setWarning("Please select an answer!");
      return;
    }

    const currentQuestion = quizData[currentQuestionIndex];

    if (currentQuestion.options[selectedOption] === currentQuestion.correctAnswer) {
      setWarning("");
      setSuccess("Great job! Let's move on to the next topic.");
      setShowNext(true);
      setResources([]);
    } else {
      setSuccess("");
      setWarning("Incorrect answer, please try again!");
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
    <div className='relative flex h-[calc(100vh-theme(spacing.16))] overflow-hidden items-center justify-center px-10 py-30'>
      <div className='bg-black bg-opacity-50 p-10 rounded-2xl'>
      {currentQuestionIndex < quizData.length ? (
        <div className="px-3">
          <p className="font-semibold mb-3 text-2xl">
            {quizData[currentQuestionIndex].question}
          </p>
          {quizData[currentQuestionIndex].options.map((option, index) => (
            <div key={index} className="mb-1 text-lg">
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
                className="px-5 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {showNext && (
              <button
                className="px-5 py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 rounded-xl font-semibold"
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
                  <li key={index} className="overflow-hidden">
                    <a
                      className="underline underline-offset-1 text-blue-400 break-words"
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
        <h3 className="text-blue-500 text-2xl font-semibold">You've completed the quiz!</h3>
      )}
      </div>
    </div>
  );
}
