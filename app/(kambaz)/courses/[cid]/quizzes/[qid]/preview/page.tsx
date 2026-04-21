"use client";

import * as client from "../../client";
import { setQuestions, addQuestion, updateQuestion, deleteQuestion, } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../../store"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
// import InputGroup from 'react-bootstrap/InputGroup';
// import InputGroupText from 'react-bootstrap/InputGroupText';
// import { FaRegCalendarAlt } from "react-icons/fa";
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

export default function QuizPreview() { 
  const params = useParams();
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  const dispatch = useDispatch();
  const router = useRouter();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    setStartTime(new Date());
  }, []);

  // fetches questions
  const fetchQuestions = async () => {
    if (!qid) return;
    const questions = await client.findQuestionsForQuiz(qid as string);
    setQuestions(questions);
  };

  useEffect(() => {
    fetchQuestions();
  }, [qid]);

  const currentQuestion = questions[currentIndex];

  return ( 
    <div>
      <h1>{quiz?.title}</h1>
      <div className="text-danger bg-danger-subtle rounded p-2 mt-3 mb-3 d-flex align-items-center gap-2">
        <AiOutlineExclamationCircle /> This is a preview of the published version of the quiz.
      </div>
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
          <h1>You finished</h1>
        </div>
      ) : questions.length > 0 && currentQuestion ? (
        <>
          <div className="fw-bold mt-3 fs-2">
            Quiz Instructions
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
                      <input type="radio" name={currentQuestion._id} />
                      {choice.text}
                    </label>
                  ))}
                </div>
              )}

              {currentQuestion.type === "TRUE FALSE" && (
                <div className="d-flex flex-column gap-2">
                  <label className="border p-2 rounded d-flex align-items-center gap-2">
                    <input type="radio" name={currentQuestion._id} />
                    True
                  </label>
                  <label className="border p-2 rounded d-flex align-items-center gap-2">
                    <input type="radio" name={currentQuestion._id} />
                    False
                  </label>
                </div>
              )}

              {currentQuestion.type === "FILL IN THE BLANK" && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your answer..."
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
              disabled={currentIndex === 0}
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
              onClick={() => setFinished(true)}
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