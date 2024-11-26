import React, { useEffect, useState } from "react";

const data = require("../assets/json/qa.json");

interface QA {
  question: string;
  answer: string;
}

const Learning: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);

  const findData = (query: string): QA | undefined => {
    return data.data.find((item: QA) =>
      item.question.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleUserInput = async (input: string) => {
    setUserInput(input);
    if (input.trim()) {
      const matchedData = findData(input);
      if (matchedData) {
        setResponse(matchedData.answer);

        setHistory((prevHistory) => [
          ...prevHistory,
          { question: input, answer: matchedData.answer },
        ]);

        setUserInput("");
      } else {
        alert("Can not find answer.");
        setUserInput("");
      }
    }
  };
  return (
    <div className="flex flex-col mt-6 gap-4">
      <div className="flex items-center">
        <input
          className="border border-gray-300 text-gray-700 text-sm w-96 p-2.5 bg-inherit placeholder-gray-600 text-gray-600 outline-0 focus:border-gray-400"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask a question..."
        />
        <button className="px-5 py-2 bg-white hover:bg-gray-100 border-t border-r border-b border-gray-300 text-gray-700 font-semibold" onClick={() => handleUserInput(userInput)}>Submit</button>
      </div>
      <h3 className="font-semibold text-2xl">History</h3>
      <ul className="px-3 text-lg">
        {history.map((item, index) => (
          <li key={index} className="mb-3">
            <strong>Question :</strong> {item.question} <br />
            <strong>Answer :</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Learning;
