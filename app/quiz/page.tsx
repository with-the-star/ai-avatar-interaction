"use client"
import React, { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}


const parseQuizString = (quizStr: string): Question[] => {
    console.log(quizStr)
    const questions: Question[] = [];
    const questionBlocks = quizStr.split(/(?=\*\*Question)/); // Split by the start of each question
  
    questionBlocks.forEach(block => {
      const lines = block.split('\n').map(line => line.trim());
      const questionMatch = lines[0].match(/\*\*Question \d+:\*\* (.+)/);
      
      if (questionMatch) {
        const questionText = questionMatch[1]; // Extract the question text
        const options: string[] = [];
        let correctAnswer: string | null = null;
  
        // Loop through lines to find options and correct answer
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.startsWith('- ')) {
            const option = line.replace(/^-?\s*[A-D]\)\s*/, ''); // Remove option labels
            options.push(option);
          } else if (line.includes('*Correct Answer:')) {
            const correctMatch = line.match(/\*Correct Answer: ([A-D])\*\)/);
            if (correctMatch) {
              correctAnswer = correctMatch[1]; // Capture the correct answer letter
            }
          }
        }
  
        if (correctAnswer) {
          const correctAnswerText = options[correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0)];
          questions.push({
            question: questionText,
            options: options,
            correctAnswer: correctAnswerText,
          });
        }
      }
    });
  
    return questions;
  };

export default function QuizPage() {
    const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<boolean[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [quizData, setQuizData] = useState<Question[]>([]);

useEffect(() => {
    const storedQuizData = localStorage.getItem('quizData');
    if (storedQuizData) {
        const data = parseQuizString(storedQuizData);
        setQuizData(data);
        setAnswers(Array(data.length).fill(''));

    
    }
  }, []);


  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResults = quizData.map((question, index) => question.correctAnswer === answers[index]);
    setResults(newResults);
    setSubmitted(true);
  };

  return (
    <div>
      <h1>AI Applications and Ethics Quiz</h1>
      <form onSubmit={handleSubmit}>
        {quizData.map((question, index) => (
          <div key={index}>
            <h3>{question.question}</h3>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    checked={answers[index] === option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {submitted && (
        <div>
          <h2>Results</h2>
          {results.map((result, index) => (
            <p key={index}>
              Question {index + 1}: {result ? 'Correct' : 'Incorrect'}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
