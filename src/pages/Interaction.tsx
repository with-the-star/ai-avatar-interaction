import React, { useEffect, useState } from "react";

import Avatar from "../components/Avatar";
import Learning from "../components/Learning";
import Quiz from "../components/Quiz";

const Interaction: React.FC = () => {
  const [step, setStep] = useState(0);

  const navigate = (direction: "quiz" | "learning") => {
    if (direction === "quiz") {
      setStep(1);
    } else {
      setStep(0);
    }
  };

  return (
    <div className="p-4">
      <h2 className="font-bold text-4xl ml-3 mb-5">AI Avatar Interaction</h2>
      <Avatar onNavigate={navigate} />
      {step === 0 ? <Learning /> : <Quiz />}
    </div>
  );
};

export default Interaction;
