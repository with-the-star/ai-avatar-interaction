import React, { useEffect, useState } from "react";

import Avatar from "../components/Avatar";
import Learning from "../components/Learning";
import Quiz from "../components/Quiz";

const Interaction: React.FC = () => {
  const [step, setStep] = useState(0);

  return (
    <div>
      <h2>AI Avatar Interaction</h2>
      <button onClick={() => setStep(0)}>Learning</button>
      <button onClick={() => setStep(1)}>Quiz</button>
      <Avatar />
      {step === 0 ? <Learning /> : <Quiz />}
    </div>
  );
};

export default Interaction;
