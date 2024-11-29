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
    <div className='relative flex h-[calc(100vh-theme(spacing.16))] items-center justify-center overflow-hidden px-10 py-32'>
      <div className='rounded-2xl bg-black/50 p-10'>
      {currentQuestionIndex < quizData.length ? (
        <div className="px-3">
          <p className="mb-3 text-2xl font-semibold">
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
                className="rounded-xl border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
            {showNext && (
              <button
                className="rounded-xl border border-gray-300 bg-white px-5 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
          {success && (
            <p className="mt-4 text-lg font-semibold text-green-500">
              {success}
            </p>
          )}
          {warning && (
            <p className="mt-4 text-lg font-semibold text-red-500">{warning}</p>
          )}
          {resources.length > 0 && (
            <div className="mt-2">
              <h3 className="text-xl font-semibold">Supplemental Resources:</h3>
              <ul className="mt-2 flex flex-col gap-3">
                {resources.map((resource, index) => (
                  <li key={index} className="overflow-hidden">
                    <a
                      className="break-words text-blue-400 underline underline-offset-1"
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
        <h3 className="text-2xl font-semibold text-blue-500">You&apos;ve completed the quiz!</h3>
      )}
      </div>
    </div>
  );
}
