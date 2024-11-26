import React, { useState } from 'react';
import quizData from "../assets/json/quiz.json";

interface Question {
    q: string;
    a: string[];
    c: string;
    resources?: string[]; // Optional resources for re-learning
}

const Quiz: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [warning, setWarning] = useState('');
    const [showNext, setShowNext] = useState(false);
    const [resources, setResources] = useState<string[]>([]); // State to hold resources
    const questions: Question[] = quizData.data;

    const handleOptionChange = (index: number) => {
        setSelectedOption(index);
        setWarning('');
        setShowNext(false);
        setResources([]); // Clear resources when changing answer
    };

    const handleSubmit = () => {
        if (selectedOption === null) {
            setWarning('Please select an answer!');
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];

        if (currentQuestion.a[selectedOption] === currentQuestion.c) {
            alert("Great job! Let's move on to the next topic.");
            setShowNext(true);
            setResources([]); // Clear resources on correct answer
        } else {
            setWarning('Incorrect answer, please try again!');
            setResources(currentQuestion.resources || []); // Set resources if answer is incorrect
            setShowNext(false);
        }
    };

    const handleNext = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowNext(false);
        setResources([]); // Clear resources for the next question
    };

    return (
        <div>
            <h2>Quiz</h2>
            {currentQuestionIndex < questions.length ? (
                <div>
                    <p>{questions[currentQuestionIndex].q}</p>
                    {questions[currentQuestionIndex].a.map((option, index) => (
                        <div key={index}>
                            <label>
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
                    {!showNext && <button onClick={handleSubmit}>Submit</button>}
                    {showNext && <button onClick={handleNext}>Next</button>}
                    {warning && <p style={{ color: 'red' }}>{warning}</p>}
                    {resources.length > 0 && (
                        <div>
                            <h3>Supplemental Resources:</h3>
                            <ul>
                                {resources.map((resource, index) => (
                                    <li key={index}>
                                        <a href={resource} target="_blank" rel="noopener noreferrer">{resource}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <h3>You've completed the quiz!</h3>
            )}
        </div>
    );
};

export default Quiz;
