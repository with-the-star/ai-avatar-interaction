import React, { useEffect, useState } from "react";
import logo from "../assets/images/rabbit.jpg";
import { Link } from "react-router-dom";

const data = require("../assets/json/qa.json");

interface QA {
  q: string;
  a: string;
}

const Avatar: React.FC = () => {
  const title = "Winter Scene with Anthropomorphic Rabbit";
  const description =
    "The image depicts an anthropomorphic rabbit character dressed in a stylish blue coat, scarf, and sneakers, sitting on a snowy log in a winter landscape. In the background, there is a cozy-looking cabin with lights shining through the windows, and a barbecue grill can be seen. The setting evokes a sense of warmth and comfort despite the snowy surroundings, with the rabbit character appearing to be enjoying a relaxing moment outdoors.";

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
      <h2>AI Avatar Interaction</h2>
      <img src={logo} style={{ width: "300px" }} alt="logo" />
      <p>{title}</p>
      <p>{description}</p>
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
      <Link to="/quiz">
        <button>Quiz</button>
      </Link>
    </div>
  );
};

export default Avatar;
