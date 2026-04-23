"use client";

import * as client from "../../client";
import { useSelector } from "react-redux"; 
import { RootState } from "../../../../../store"; 
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";


type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  title: string;
  points: number;
  question: string;
  type: "MULTIPLE CHOICE" | "TRUE FALSE" | "FILL IN THE BLANK";
  choices?: Choice[];
  correctAnswer?: boolean;
  possibleAnswers?: string[];
};

type Quiz = {
  _id: string,
  title: string,
  course: string,
  available: string,
  due: string,
  points: number,
  shuffle: boolean,
  assignmentGroup: string,
  timeLimit: string,
  multipleAttempts: boolean,
  howManyAttempts: string,
  showCorrectAnswers: string,
  until: string,
  accessCode: string,
  oneQuestionPerTime: boolean,
  webcam: boolean,
  lock: boolean,
  published: boolean,
  questions: Question[],
  type: string,
  description: string
};

export default function LastAttempt() { 
  const params = useParams();
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [attempt, setAttempt] = useState<any>(null);

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const [questions, setQuestions] = useState<Question[]>([]);

  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);

  const responses = attempt?.responses || {};

  // Helper function to check if answer is correct
  const isCorrect = (question: Question, answer: string | boolean) => {
    switch (question.type) {
      case "MULTIPLE CHOICE":
        return question.choices?.some(c => c._id === answer && c.isCorrect);
      case "TRUE FALSE":
        return question.correctAnswer === answer;
      case "FILL IN THE BLANK":
        return question.possibleAnswers?.some(a => a.toLowerCase() === String(answer).toLowerCase());
      default:
        return false;
    }
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array]; // copy to avoid mutating original
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // fetches questions
  const fetchQuestions = async () => {
    if (!qid) return;
    let questions = await client.findQuestionsForQuiz(qid as string);

    // Shuffle if quiz.shuffle is true
    if (quiz?.shuffle) {
      questions = shuffleArray(questions);
    }

    setQuestions(questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);


  useEffect(() => {
    const fetchAttempt = async () => {
      if (!qid || !currentUser?._id) return;

      const latest = await client.findLatestAttempt(
        qid,
        currentUser._id
      );

      setAttempt(latest);
    };

    fetchAttempt();
  }, [qid, currentUser]);

  return ( 
    <div>
      <h1>{quiz?.title}</h1>
      <div className="mt-3">
          <hr/>
          <div className="mb-3">
            Score: {attempt ? `${attempt.score} / ${attempt.totalPoints}` : "No attempt yet"}
          </div>
          <div>
            These were your responses:
            <ul>
              {questions.map((q) => (
                <li key={q._id}>
                  <div dangerouslySetInnerHTML={{ __html: q.question }} />

                  <div>
                    Your answer:{" "}
                    {q.type === "MULTIPLE CHOICE" &&
                      q.choices?.find(c => c._id === responses[q._id])?.text}

                    {q.type === "TRUE FALSE" &&
                      String(responses[q._id])}

                    {q.type === "FILL IN THE BLANK" &&
                      String(responses[q._id])}
                  </div>

                  <div>
                    {isCorrect(q, responses[q._id]) ? (
                      <span className="text-success">Correct</span>
                    ) : (
                      <span className="text-danger">Incorrect</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

      
    </div>
);} 