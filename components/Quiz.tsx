"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StatCard from "./StatCard";
import Link from "next/link";
import { Check, X } from "lucide-react";

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  const { question, answers, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(25);
  };

  const handleTimeUp = () => {
    stopTimer();
    resetTimer();
    nextQuestion();
  };

  useEffect(() => {
    startTimer();

    return () => {
      stopTimer();
    };
  }, []);

  const onAnswerSelected = (answer: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResults((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
      fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not working fam");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Quiz results saved successfully:", data);
        })
        .catch((error) => {
          console.error("Error saving quiz results:", error);
        });
    }
    setChecked(false);
    resetTimer();
    startTimer();
  };

  return (
    <div className="min-h-[100dvh] bg-opacity-75 bg-gradient-to-b from-[#1a043a] to-[#151278] px-44 py-8 desktop:px-24 mobile:px-10">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#2463FF] px-8 py-4 rounded-[2rem] text-[2.4rem]"
              >
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#2463FF] px-8 py-4 rounded-[2rem] text-[2.4rem]"
              >
                {timeRemaining} seconds to answer
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="mb-10 text-[3.2rem] font-bold text-white">
                {question}
              </h3>
              <ul className="space-y-5">
  {answers.map((answer: string, idx: number) => {
    // Determine the styles and icons based on the selected answer and correctness
    const isSelected = selectedAnswerIndex === idx;
    const isCorrect = checked && answer === correctAnswer;
    const isIncorrect = checked && isSelected && answer !== correctAnswer;

    return (
      <motion.button
        key={idx}
        initial={{ y: 0 }}
        whileHover={{ y: -10 }}
        whileTap={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
        onClick={() => onAnswerSelected(answer, idx)}
        disabled={checked} // Disable buttons after an answer is selected
        className={`w-full mobile:px-8 rounded-[4rem] px-[6.4rem] py-[1.2rem] text-[3.2rem] uppercase leading-[120%] tracking-[0.16rem] text-white shadow-purple-sh 
          ${
            isCorrect
              ? "bg-green-500" 
              : isIncorrect
              ? "bg-red-500" 
              : selectedAnswerIndex === idx
              ? "bg-[#0f1f47]" 
              : "bg-[#2463FF]" 
          }`}
      >
        <span className="flex items-center justify-between">
          {answer}
          {isCorrect && <Check className="ml-4" />}
          {isIncorrect && <X className="ml-4" />}
        </span>
      </motion.button>
    );
  })}
</ul>

              <motion.button
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
                onClick={nextQuestion}
                disabled={!checked}
                className="mobile:px-8 rounded-[4rem] mt-8 bg-[#2463FF] from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.25)] px-[6.4rem] py-[1.2rem] text-[3.2rem] uppercase leading-[120%] tracking-[0.16rem] text-white shadow-purple-sh hover:bg-gradient-to-r"
              >
                {activeQuestion === questions.length - 1
                  ? "Finish 🎉"
                  : "Next Question →"}
              </motion.button>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-[4.8rem] uppercase mb-10 font-bold text-white leading-[120%] tracking-[0.24rem] mobile:tracking-[0.12rem]">
              🎂 Results 🎉
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
              />
              <StatCard title="Total Score" value={results.score} />

              <StatCard
                title="Score"
                value={`${(
                  (results.correctAnswers / questions.length) *
                  100
                ).toFixed(2)}%`}
              />{" "}
            </div>
            <Link href="/leaderboards">
              <motion.button
                initial={{ y: 0 }}
                whileHover={{ y: -10 }}
                whileTap={{ y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="mt-10 mobile:text-[2.4rem] mobile:tracking-[0.12rem] mobile:py-8 w-full rounded-[4rem] bg-[#2463FF] from-[rgba(255,255,255,0.25)] to-[rgba(255,255,255,0.25)] px-8 py-[5rem] text-[4.8rem] uppercase leading-[120%] tracking-[0.24rem] text-white shadow-purple-sh hover:bg-gradient-to-t"
              >
                Check Leaderboard
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
