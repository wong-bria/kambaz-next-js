"use client";

import { useState, useEffect } from "react";
import * as client from "../../client";
import { setQuestions, addQuestion, updateQuestion, deleteQuestion, } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../../store"; 
import { useRouter } from "next/navigation";
// import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
// import InputGroup from 'react-bootstrap/InputGroup';
// import InputGroupText from 'react-bootstrap/InputGroupText';
// import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
// import * as db from "../../../../database";
import { FaPlus } from "react-icons/fa6"; 
import Link from "next/link";
import "../index.css";

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
  type: string
};

export default function QuizQuestions() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);
  const questions = quiz?.questions || [];

  const dispatch = useDispatch();
  const router = useRouter();
  
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT"; 

  const [questionTitle, setQuestionTitle] = useState(""); 
  const [questionPoints, setQuestionPoints] = useState(0); 
  const [questionText, setQuestionText] = useState(""); 
  const [questionType, setQuestionType] = useState("MULTIPLE CHOICE"); 
  const [questionChoices, setQuestionChoices] = useState<string[]>([]); 

  const fetchQuestions = async () => {
    if (!qid) return;
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
  };

  const onCreateQuestionForQuiz = async () => { 
    if (!qid) return; 
    const newQuestion = { title: questionTitle, points: questionPoints, question: questionText, type: questionType, possibleAnswers: questionChoices }; 
    const question = await client.createQuestionForQuiz(qid, newQuestion); 
    dispatch(setQuestions([...questions, question])); 
  }; 

  const onRemoveModule = async (questionId: string) => {
    if (!qid) return;

    await client.deleteQuestion(qid, questionId); 
    dispatch(setQuestions(questions.filter((q: any) => q._id !== questionId))); 
  }; 

  const onUpdateQuestion = async (question: any) => { 
    if (!qid) return;
    
    await client.updateQuestion(qid, question); 
    const newQuestions = questions.map((q: any) => q._id === question._id ? question : q ); 
    dispatch(setQuestions(newQuestions)); 
  }; 

  useEffect(() => {
    fetchQuestions();
  }, []);

  return ( 
    <>
      <div className="d-flex align-items-center justify-content-end mt-3 mb-3">
        <div className="me-2 fs-5">Points</div>
        <div className="me-5 fs-5">{quiz?.points}</div>
      </div>

      <div className="tabs border-bottom d-flex mb-3">
        <Link href={`/courses/${cid}/quizzes/${qid}/edit`}
              className="wd-assignment-link mb-0 text-decoration-none text-black" > 
            <div className="tab px-3 py-2">Details</div>
        </Link>        
        <Link href={`/courses/${cid}/quizzes/${qid}/questions`}
              className="wd-assignment-link mb-0 text-decoration-none text-black" > 
            <div className="tab active px-3 py-2">Questions</div>
        </Link>
      </div>

      <div>
        {questions?.length === 0 && (
        <div className="text-muted mb-3">No questions yet.</div>
      )}

      {questions?.map((q: any) => (
        <div key={q._id}>title: {q.title} testestset</div>
      ))}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <Button variant="secondary" size="lg"
                onClick={async () => {
                  console.log("HELLO I AM HERE")
                  await onCreateQuestionForQuiz();
                  await fetchQuestions();
                  setQuestionTitle("");
                  setQuestionText("");
                  setQuestionPoints(0);
                }}>
          <FaPlus className="me-2" /> New Question
        </Button>
      </div>

      
    </>
);} 