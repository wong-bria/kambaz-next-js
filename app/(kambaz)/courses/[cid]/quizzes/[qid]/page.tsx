"use client";

// import * as client from "../client";
// import { setAssignments, addAssignment, updateAssignment, editAssignment } from "../reducer";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../store"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
// import { Form, FormGroup, Button } from "react-bootstrap";
// import InputGroup from 'react-bootstrap/InputGroup';
// import InputGroupText from 'react-bootstrap/InputGroupText';
import { useParams } from "next/navigation";
// import * as db from "../../../../database";
import { PiPencilLight } from "react-icons/pi";


type Quiz = {
  _id: string,
  title: string,
  course: string,
  available: string,
  due: string,
  points: number,
  shuffle: string,
  assignmentGroup: string,
  timeLimit: string,
  multipleAttempts: string,
  howManyAttempts: string,
  showCorrectAnswers: string,
  until: string,
  accessCode: string,
  oneQuestionPerTime: string,
  webcam: string,
  lock: string,
  published: boolean,
  questions: number,
  type: string
};

export default function QuizDetail() { 
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);
  const router = useRouter();
  
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT";

  const [quizState, setQuizState] = useState({
    _id: qid,
    title: quiz?.title || "",
    course: cid,
    available: quiz?.available || "",
    due: quiz?.due || "",
    points: quiz?.points || 0,
    shuffle: quiz?.shuffle || "Yes",
    assignmentGroup: quiz?.assignmentGroup || "Quizzes",
    timeLimit: quiz?.timeLimit || "20 minutes",
    multipleAttempts: quiz?.multipleAttempts || "No",
    howManyAttempts: quiz?.howManyAttempts || "1",
    showCorrectAnswers: quiz?.showCorrectAnswers || "Immediately",
    until: quiz?.until || "",
    accessCode: quiz?.accessCode || "",
    oneQuestionPerTime: quiz?.oneQuestionPerTime || "Yes",
    webcam: quiz?.webcam || "No",
    lock: quiz?.lock || "No",
    published: quiz?.published || false,
    questions: quiz?.questions || 0,
    type: quiz?.type || "Graded Quiz"

  });

  if (isStudent) {
    return (
      <div>
        <h2>{quizState.title}</h2>
        <button className="btn btn-primary">Start Quiz</button>
      </div>
    );
  }
  
  return ( 
    <>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <button className="btn btn-secondary mb-3 me-2"
                  onClick={() => {
                    router.push(`/courses/${cid}/quizzes/${qid}/preview`);
                  }}>
            Preview</button>
          <button className="btn btn-secondary mb-3"
                  onClick={() => {
                    router.push(`/courses/${cid}/quizzes/${qid}/edit`);
                  }}>
            <PiPencilLight /> Edit</button>
        </div>

        <div className="mt-3 p-3"
             style={{ borderStyle: "dashed", borderColor: "gray", borderWidth: "2px" }}>
          <h3>{quizState.title}</h3>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Quiz Type</Col> 
            <Col sm={8}>{quizState.type}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Points</Col> 
            <Col sm={8}>{quizState.points}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Assignment Group</Col> 
            <Col sm={8}>{quizState.assignmentGroup}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Shuffle Answers</Col> 
            <Col sm={8}>{quizState.shuffle}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Time Limit</Col> 
            <Col sm={8}>{quizState.timeLimit}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Multiple Attempts</Col> 
            <Col sm={8}>{quizState.multipleAttempts}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">How Many Attempts</Col> 
            <Col sm={8}>{quizState.howManyAttempts}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">View Responses</Col> 
            <Col sm={8}>{quizState.type}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Show Correct Answers</Col> 
            <Col sm={8}>{quizState.showCorrectAnswers}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Access Code</Col> 
            <Col sm={8}>{quizState.accessCode}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">One Question at a Time</Col> 
            <Col sm={8}>{quizState.oneQuestionPerTime}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 2, offset: 1}} className="text-end mb-4 fw-bold">Webcam Required</Col> 
            <Col sm={8}>{quizState.webcam}</Col> 
          </Row>

          <Row>
            <Col sm={{span: 3, offset: 0}} className="text-end mb-4 fw-bold">Lock Questions After Answering</Col> 
            <Col sm={8}>{quizState.lock}</Col> 
          </Row>

          <br/>

          <Row>
            <Col sm={{span: 2, offset: 0}} className="text-end mb-4 fw-bold">Due {quizState.due}</Col> 
            <Col sm={{span: 3, offset: 2}} className="text-end mb-4 fw-bold">Available from {quizState.available}</Col> 
            <Col sm={{span: 3, offset: 0}} className="text-end mb-4 fw-bold">Until {quizState.until}</Col> 
          </Row>
        </div>

    </>
);} 