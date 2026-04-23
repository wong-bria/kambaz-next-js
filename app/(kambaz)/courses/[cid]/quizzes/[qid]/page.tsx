"use client";

import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../store"; 
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Row, Col } from "react-bootstrap";
import { useParams } from "next/navigation";
import { PiPencilLight } from "react-icons/pi";
import * as client from "../client";

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

export default function QuizDetail() { 
  const params = useParams();
  const { cid } = params
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);
  const router = useRouter();
  
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT";

  const yesNo = (value: boolean | undefined) => (value ? "Yes" : "No");

  const [attempt, setAttempt] = useState<any>(null);

  const maxAttempts = parseInt(quiz?.howManyAttempts || "0");
  const currentAttemptNumber = attempt?.attemptNumber || 0;

  const hasRemainingAttempts = currentAttemptNumber < maxAttempts;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

    useEffect(() => {
    const fetchAttempt = async () => {
      if (!qid || !currentUser?._id) return;

      const latest = await client.findLatestAttempt(qid, currentUser._id);
      setAttempt(latest);
    };

    if (isStudent) {
      fetchAttempt();
    }
  }, [qid, currentUser]);

  const hasTakenQuiz = !!attempt;
  
  return ( 
    <>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <button className="btn btn-secondary mb-3 me-2"
                  disabled={isStudent}
                  onClick={() => {
                    router.push(`/courses/${cid}/quizzes/${qid}/preview`);
                  }}>
            Preview</button>
          <button className="btn btn-secondary mb-3"
                  disabled={isStudent}
                  onClick={() => {
                    router.push(`/courses/${cid}/quizzes/${qid}/edit`);
                  }}>
            <PiPencilLight /> Edit</button>
        </div>

        <div className="mt-3 p-3"
             style={{ borderStyle: "dashed", borderColor: "gray", borderWidth: "2px" }}>
          <h3>{quiz?.title}</h3>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Quiz Type</Col> 
            <Col sm={8}>{quiz?.type}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Points</Col> 
            <Col sm={8}>{quiz?.points}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Assignment Group</Col> 
            <Col sm={8}>{quiz?.assignmentGroup}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Shuffle Answers</Col> 
            <Col sm={8}>{yesNo(quiz?.shuffle)}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Time Limit</Col> 
            <Col sm={8}>{quiz?.timeLimit}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Multiple Attempts</Col> 
            <Col sm={8}>{yesNo(quiz?.multipleAttempts)}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">How Many Attempts</Col> 
            <Col sm={8}>{quiz?.howManyAttempts}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">View Responses</Col> 
            <Col sm={8}>{quiz?.type}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Show Correct Answers</Col> 
            <Col sm={8}>{quiz?.showCorrectAnswers}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Access Code</Col> 
            <Col sm={8}>{quiz?.accessCode}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">One Question at a Time</Col> 
            <Col sm={8}>{yesNo(quiz?.oneQuestionPerTime)}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Webcam Required</Col> 
            <Col sm={8}>{yesNo(quiz?.webcam)}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 3, offset: 0}} className="text-end mb-4 fw-bold">Lock Questions After Answering</Col> 
            <Col sm={8}>{yesNo(quiz?.lock)}</Col> 
          </Row>

          <br/>

          <Row>
            <Col sm={{span: 2, offset: 0}} className="text-end mb-4 fw-bold">Due {quiz?.due && formatDate(new Date(quiz.due))}</Col> 
            <Col sm={{span: 3, offset: 2}} className="text-end mb-4 fw-bold">Available from {quiz?.available && formatDate(new Date(quiz.available))}</Col> 
            <Col sm={{span: 3, offset: 0}} className="text-end mb-4 fw-bold">Until {quiz?.until && formatDate(new Date(quiz.until))}</Col> 
          </Row>

          {/* Students cannot attempt the quiz unless it is published */}
          {isStudent && (
            <div className="d-flex justify-content-around mt-4">
              <button disabled={!quiz?.published || !hasRemainingAttempts}
                      className="btn btn-danger mb-3 me-2"
                      onClick={() => {
                        console.log(maxAttempts, currentAttemptNumber, hasRemainingAttempts);
                        if (!quiz?.accessCode) {
                          router.push(`/courses/${cid}/quizzes/${qid}/quiz`);
                          return;
                        } 

                        const entered = prompt("Enter access code:");

                        if (entered === quiz.accessCode) {
                          router.push(`/courses/${cid}/quizzes/${qid}/quiz`);
                        } else {
                          alert("Incorrect access code.");
                        }
                      }}
              >
                Start
              </button>
              <button disabled={!quiz?.published || !hasTakenQuiz} className="btn btn-danger mb-3 me-2"
                      onClick={() => {
                          router.push(`/courses/${cid}/quizzes/${qid}/lastAttempt`);
                        }}
              >
                Last Attempt
              </button>
            </div>
          )}
        </div>

    </>
);} 