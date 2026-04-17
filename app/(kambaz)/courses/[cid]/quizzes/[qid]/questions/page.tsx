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
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;
  const qid = Array.isArray(params.qid) ? params.qid[0] : params.qid;

  const dispatch = useDispatch();
  const router = useRouter();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: Quiz[] };
  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);

  const { questions } = useSelector((state: RootState) => state.questionsReducer) as { questions: Question[] };

  const [draftQuestions, setDraftQuestions] = useState<Question[]>([]);
  
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT"; 

  const [questionTitle, setQuestionTitle] = useState(""); 
  const [questionPoints, setQuestionPoints] = useState(0); 
  const [questionText, setQuestionText] = useState(""); 
  const [questionType, setQuestionType] = useState("MULTIPLE CHOICE"); 
  const [questionChoices, setQuestionChoices] = useState<string[]>([]); 

  // fetches questions and initalizes draft questions
  const fetchQuestions = async () => {
    if (!qid) return;
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
    setDraftQuestions(questions);
  };

  // const onCreateQuestionForQuiz = async () => { 
  //   if (!qid) return; 
  //   const newQuestion = { title: questionTitle, points: questionPoints, question: questionText, type: questionType, possibleAnswers: questionChoices, quiz: qid }; 
  //   const question = await client.createQuestionForQuiz(qid, newQuestion); 
  //   dispatch(setQuestions([...questions, question])); 
  // }; 

  // const onRemoveModule = async (questionId: string) => {
  //   if (!qid) return;

  //   await client.deleteQuestion(qid, questionId); 
  //   dispatch(setQuestions(questions.filter((q: any) => q._id !== questionId))); 
  // }; 

  // const onUpdateQuestion = async (question: any) => { 
  //   if (!qid) return;
    
  //   await client.updateQuestion(qid, question); 
  //   const newQuestions = questions.map((q: any) => q._id === question._id ? question : q ); 
  //   dispatch(setQuestions(newQuestions)); 
  // }; 

  // CREATE (draft only)
  const onCreateQuestionForQuiz = () => {
    const newQuestion: Question = {
      _id: "temp-" + Date.now(),
      title: "New Question",
      points: 0,
      question: "",
      type: "MULTIPLE CHOICE",
    };

    setDraftQuestions([...draftQuestions, newQuestion]);
  };

  // DELETE (draft only)
  const onDeleteQuestion = (id: string) => {
    setDraftQuestions(draftQuestions.filter(q => q._id !== id));
  };

  // UPDATE (draft only)
  const onUpdateQuestion = (updated: Question) => {
    setDraftQuestions(
      draftQuestions.map(q => q._id === updated._id ? updated : q)
    );
  };

  // QUIZ SAVE (commit to server)
  const handleSaveQuiz = async () => {
    if (!qid) return;

    // create or update
    for (const q of draftQuestions) {
      const exists = questions.find(orig => orig._id === q._id);

      if (!exists) {
        await client.createQuestionForQuiz(qid, q);
      } else {
        await client.updateQuestion(qid, q);
      }
    }

    // deletions
    for (const orig of questions) {
      if (!draftQuestions.find(q => q._id === orig._id)) {
        await client.deleteQuestion(qid, orig._id);
      }
    }

    await fetchQuestions();
  };

  // QUIZ CANCEL (discard draft)
  const handleCancelQuiz = () => {
    setDraftQuestions(questions);
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
        {draftQuestions?.length === 0 && (
          <div className="text-muted mb-3">No questions yet.</div>
       )}

        {draftQuestions?.map((q: any) => (
          <div key={q._id}>

            {q.type === "MULTIPLE CHOICE" && 
              <div>
                MULTIPLE CHOICE
              </div>  
            }

            {q.type === "TRUE FALSE" && 
              <div>
                TRUE FALSE
              </div>
            }

            {q.type === "FILL IN THE BLANK" && 
              <div>
                FILL IN THE BLANK
              </div>
            }

          </div>
        ))}
      </div>



      <div className="d-flex justify-content-center mt-5">
        <Button variant="secondary" size="lg"
                onClick={onCreateQuestionForQuiz}>
          <FaPlus className="me-2" /> New Question
        </Button>
      </div>


      <hr/>

      <div className="d-flex justify-content-end mt-5">
        <Button variant="secondary" className="me-2" onClick={handleCancelQuiz} >
          Cancel
        </Button>

        <Button variant="danger" onClick={handleSaveQuiz} >
          Save
        </Button>
      </div>

      
    </>
);} 