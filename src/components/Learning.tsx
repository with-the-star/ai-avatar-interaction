import React, { useEffect, useState } from "react";

const data = require("../assets/json/qa.json");

interface QA {
  q: string;
  a: string;
}

const Learning: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [history, setHistory] = useState<
    { question: string; answer: string }[]
  >([]);

  const findData = (query: string): QA | undefined => {
    return data.data.find((item: QA) =>
      item.q.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleUserInput = async (input: string) => {
    setUserInput(input);
    if (input.trim()) {
      const matchedData = findData(input);
      if (matchedData) {
        setResponse(matchedData.a);

        setHistory((prevHistory) => [
          ...prevHistory,
          { question: input, answer: matchedData.a },
        ]);

        setUserInput("");
      } else {
        alert("Can not find answer.");
        setUserInput("");
      }
    }
  };
  return (
    <div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={() => handleUserInput(userInput)}>Submit</button>

      <h3>History</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>
            <strong>Q :</strong> {item.question} <br />
            <strong>A :</strong> {item.answer}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Learning;
