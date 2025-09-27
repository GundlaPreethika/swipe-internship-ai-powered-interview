import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import InterviewTimer from "./InterviewTimer";

export default function ChatInterview() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [interviewDone, setInterviewDone] = useState(false);

  // ✅ Timer settings per difficulty
  const difficultyMap = [
    { level: "Easy", time: 20 },
    { level: "Easy", time: 20 },
    { level: "Medium", time: 60 },
    { level: "Medium", time: 60 },
    { level: "Hard", time: 120 },
    { level: "Hard", time: 120 },
  ];

  // ✅ 6 React.js questions
  const questions = [
    "What is JSX in React, and why is it used?",
    "What is the difference between a functional component and a class component in React?",
    "How does the Virtual DOM work in React, and why is it faster than directly manipulating the real DOM?",
    "What are React hooks, and can you explain the difference between useState and useEffect with examples?",
    "How does React’s reconciliation algorithm (diffing algorithm) work when updating the UI?",
    "Can you explain React’s Context API and compare it with Redux in terms of state management trade-offs?",
  ];

  const handleSubmit = (auto = false) => {
    const userAnswer = auto ? "No answer (timed out)" : answer;

    const record = {
      question: questions[step],
      answer: userAnswer,
      difficulty: difficultyMap[step].level,
    };

    setHistory([...history, record]);
    setAnswer("");

    if (step === 5) {
      setInterviewDone(true);
    } else {
      setStep(step + 1);
    }
  };

  if (interviewDone) {
    return (
      <Card style={{ marginTop: 20 }}>
        <h3>Interview Complete 🎉</h3>
        <p>Thanks for completing the 6 React.js questions.</p>
        <pre>{JSON.stringify(history, null, 2)}</pre>
      </Card>
    );
  }

  return (
    <Card style={{ marginTop: 20 }}>
      <h3>
        Question {step + 1} ({difficultyMap[step].level})
      </h3>
      <p>{questions[step]}</p>

      <InterviewTimer
        duration={difficultyMap[step].time}
        onComplete={() => handleSubmit(true)}
      />

      <Input.TextArea
        rows={3}
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
      />
      <Button
        type="primary"
        style={{ marginTop: 10 }}
        onClick={() => handleSubmit()}
      >
        Submit Answer
      </Button>
    </Card>
  );
}
