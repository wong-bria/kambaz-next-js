"use client";

import * as client from "../../client";
import { useSelector } from "react-redux"; 
import { RootState } from "../../../../../store"; 
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai";


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

export default function TakingQuiz() { 
  const params = useParams();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Add local state to store responses
  const [responses, setResponses] = useState<{ [questionId: string]: string | boolean }>({});

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

  const submitQuiz = async () => {
  if (!quiz || !startTime) return;

  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
  const earnedPoints = questions.reduce(
    (acc, q) => acc + (isCorrect(q, responses[q._id]) ? q.points : 0),
    0
  );

  const attempt = {
    userId: currentUser?._id,
    quizId: quiz._id,
    responses,
    score: earnedPoints,
    totalPoints,
    startedAt: startTime,
    submittedAt: new Date(),
  };

  await client.createQuizAttempt(attempt);
  setFinished(true);
};

  useEffect(() => {
    setStartTime(new Date());
  }, []);

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

  const currentQuestion = questions[currentIndex];

  return ( 
    <div>
      <h1>{quiz?.title}</h1>
      <div>
        Started:{" "}
        {startTime &&
          startTime
            .toLocaleString("en-US", {
              month: "short", day: "numeric",
              hour: "numeric", minute: "2-digit", hour12: true,
            })
            .replace(",", " at")
        }
      </div>

      {/* If finished, show this instead */}
      {finished ? (
        <div className="mt-3">
          <hr/>

            {/* Calculate total points */}
            {(() => {
              const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);
              const earnedPoints = questions.reduce(
                (acc, q) => acc + (isCorrect(q, responses[q._id]) ? q.points : 0),
                0
              );
              return (
                <div className="mb-3">
                  <strong>Score:</strong> {earnedPoints} / {totalPoints} points
                </div>
              );
            })()}
          <div>
            These were your responses:
            <ul>
              {questions.map((q) => (
                <li key={q._id}>
                  <div dangerouslySetInnerHTML={{ __html: q.question }} />
                  <div>
                    Your answer:{" "}
                    {q.type === "MULTIPLE CHOICE" && q.choices?.find(c => c._id === responses[q._id])?.text}
                    {q.type === "TRUE FALSE" && String(responses[q._id])}
                    {q.type === "FILL IN THE BLANK" && String(responses[q._id])}
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
      ) : questions.length > 0 && currentQuestion ? (
        <>
          <div className="d-flex align-items-start justify-content-between mt-3 mb-2">
            {/* Quiz Instructions */}
            <div className="fw-bold fs-2">
              Quiz Instructions
            </div>

            {/* Vertical Jump Links on the Right */}
            <div  className="d-flex flex-column gap-2"
                  style={{
                    maxHeight: "110px",
                    overflowY: "auto",
                  }}>
              {questions.map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={index === currentIndex ? "danger" : "outline-danger"}
                  onClick={() => setCurrentIndex(index)}
                >
                  Question {index + 1}
                </Button>
              ))}
            </div>
          </div>
          <hr/>

          {/* Question */}
          <div className="border border-dark p-3 mx-5">
            <div className="border-bottom border-dark align-items-center d-flex justify-content-between mb-3">
              <div className="fw-bold fs-4">
                Question {currentIndex + 1} 
              </div>
              <div className="fw-bold fs-4">
                {currentQuestion.points} points
              </div>
            </div>

            <div className="p-3"dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />


            {/* ANSWER AREA */}
            <div className="p-3">
              {currentQuestion.type === "MULTIPLE CHOICE" && (
                <div className="d-flex flex-column gap-2">
                  {currentQuestion.choices?.map((choice) => (
                    <label key={choice._id} className="border p-2 rounded d-flex align-items-center gap-2">
                      <input type="radio" name={currentQuestion._id}
                             checked={responses[currentQuestion._id] === choice._id}
                             onChange={() =>
                              setResponses((prev) => ({
                                ...prev,
                                [currentQuestion._id]: choice._id,
                              }))
                            } />
                      {choice.text}
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "TRUE FALSE" && (
                <div className="d-flex flex-column gap-2">
                  <label className="border p-2 rounded d-flex align-items-center gap-2">
                    <input type="radio" name={currentQuestion._id} checked={responses[currentQuestion._id] === true}
                            onChange={() =>
                              setResponses((prev) => ({
                                ...prev,
                                [currentQuestion._id]: true,
                              }))
                            } />
                    True
                  </label>
                  <label className="border p-2 rounded d-flex align-items-center gap-2">
                    <input type="radio" name={currentQuestion._id} checked={responses[currentQuestion._id] === false}
                            onChange={() =>
                              setResponses((prev) => ({
                                ...prev,
                                [currentQuestion._id]: false,
                              }))
                            } />
                    False
                  </label>
                </div>
              )}

              {currentQuestion.type === "FILL IN THE BLANK" && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your answer..."
                  value={String(responses[currentQuestion._id] || "")}
                  onChange={(e) =>
                    setResponses((prev) => ({
                      ...prev,
                      [currentQuestion._id]: e.target.value,
                    }))
                  }
                />
              )}
            </div>


          </div>

          <div className="d-flex justify-content-end mt-3 gap-3 align-items-center mx-5">
            <Button
              onClick={() => {
                          setCurrentIndex((i) => i - 1);
                          setLastSaved(new Date());
                      }}
              disabled={currentIndex === 0 || quiz?.lock}
              size="lg"
              variant="secondary"
            >
              Prev
            </Button>

            <Button
              onClick={() => {
                setCurrentIndex((i) => i + 1);
                setLastSaved(new Date());
              }}
              disabled={currentIndex === questions.length - 1}
              size="lg"
              variant="secondary"
            >
              Next
            </Button>
          </div>

          <div className="border p-2 border-dark d-flex justify-content-end mt-3 gap-3 align-items-center">
            <div>
              Last Saved:{" "}
              {lastSaved &&
                lastSaved
                  .toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", " at")}
            </div>
            <Button
              className="d-flex align-items-center gap-1"
              onClick={submitQuiz}
              size="lg"
              variant="secondary"
            >
              Submit Quiz
            </Button>
          </div>
        </>
      ) : (
        <p>No questions available for this quiz.</p>
      )}
    </div>
);} 