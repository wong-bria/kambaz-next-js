"use client";

// For WYSIWYG editor
import dynamic from "next/dynamic";
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then(mod => mod.CKEditor),
  { ssr: false }
);
const ClassicEditor = require("@ckeditor/ckeditor5-build-classic");


import * as client from "../../client";
import { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } from "../../reducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../../store";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/InputGroupText";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
// import * as db from "../../../../database";
import { CiNoWaitingSign } from "react-icons/ci";
import GreenCheckmark from "../../../modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import "../index.css";
import Link from "next/link";

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
  _id: string;
  title: string;
  course: string;
  available: string;
  due: string;
  points: number;
  shuffle: boolean;
  assignmentGroup: string;
  timeLimit: string;
  multipleAttempts: boolean;
  howManyAttempts: string;
  showCorrectAnswers: string;
  until: string;
  accessCode: string;
  oneQuestionPerTime: boolean;
  webcam: boolean;
  lock: boolean;
  published: boolean;
  questions: Question[];
  type: string;
  description: string;
};

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const { quizzes } = useSelector(
    (state: RootState) => state.quizzesReducer,
  ) as { quizzes: Quiz[] };
  const quiz = quizzes.find((quiz: Quiz) => quiz._id === qid);

  const dispatch = useDispatch();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isStudent = (currentUser as any)?.role === "STUDENT";

  const [quizState, setQuizState] = useState({
    _id: qid,
    title: quiz?.title || "",
    course: cid,
    available: quiz?.available || "",
    due: quiz?.due || "",
    points: quiz?.points || 0,
    shuffle: quiz?.shuffle || true,
    assignmentGroup: quiz?.assignmentGroup || "Quizzes",
    timeLimit: quiz?.timeLimit || "20 minutes",
    multipleAttempts: quiz?.multipleAttempts || false,
    howManyAttempts: quiz?.howManyAttempts || "1",
    showCorrectAnswers: quiz?.showCorrectAnswers || "Immediately",
    until: quiz?.until || "",
    accessCode: quiz?.accessCode || "",
    oneQuestionPerTime: quiz?.oneQuestionPerTime || true,
    webcam: quiz?.webcam || false,
    lock: quiz?.lock || false,
    published: quiz?.published || false,
    questions: quiz?.questions || [],
    type: quiz?.type || "Graded Quiz",
    description: quiz?.description || "",
  });

  const onCreateQuizForCourse = async (quizToCreate: any) => {
    if (!cid) return;
    const quiz = await client.createQuizForCourse(cid as string, quizToCreate);
    dispatch(setQuizzes([...quizzes, quiz]));

    return quiz;
  };

  const onUpdateQuiz = async (quiz: any) => {
    await client.updateQuiz(quiz);
    const newQuizzes = quizzes.map((q: any) => (q._id === quiz._id ? quiz : q));
    dispatch(setQuizzes(newQuizzes));
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-end mt-3 mb-3">
        <div className="me-2 fs-5">Points</div>
        <div className="me-5 fs-5">{quizState.points}</div>
        <div className="me-1 align-items-center d-flex">
          {quizState.published ? (
            <GreenCheckmark />
          ) : (
            <CiNoWaitingSign className="text-danger" />
          )}
        </div>
        <div className="fw-bold me-5 text-secondary">
          {quizState.published ? "Published" : "Unpublished"}
        </div>

        <Button variant="secondary" size="lg" className="me-3">
          <IoEllipsisVertical />
        </Button>
      </div>
      <hr />
      <div className="tabs border-bottom d-flex mb-3">
        <Link
          href={`/courses/${cid}/quizzes/${qid}/edit`}
          className="wd-assignment-link mb-0 text-decoration-none text-black"
        >
          <div className="tab active px-3 py-2">Details</div>
        </Link>

        <Link
          href={`/courses/${cid}/quizzes/${qid}/questions`}
          className="wd-assignment-link mb-0 text-decoration-none text-black"
        >
          <div className="tab px-3 py-2">Questions</div>
        </Link>
      </div>
      <Form>
        <FormGroup controlId="wd-quiz-name">
          <FormLabel className="fw-bold">Quiz Name</FormLabel>
          <FormControl disabled={isStudent} className="mb-4" value={quizState.title}
            onChange={(e) =>
              setQuizState({ ...quizState, title: e.target.value })
            }
          />
        </FormGroup>
        {/* todo: need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG*/}
        <FormGroup controlId="quiz-description">
          <FormLabel className="fw-bold">Quiz Instructions:</FormLabel>


          {/* <FormControl  disabled={isStudent} as="textarea" 
                        className="mb-4" rows={15} value={"description"}/> */}
          
          <CKEditor
            editor={ClassicEditor}
            data={quizState.description}
            disabled={isStudent}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setQuizState({
                ...quizState,
                description: data,
              });
            }}
          />



        </FormGroup>
        <FormGroup controlId="quiz-type">
          <Row className="mt-5">
            <FormLabel column sm={{ span: 1, offset: 3 }} className="text-end mb-4">
              Quiz Type
            </FormLabel>
            <Col sm={8}>
              <FormSelect disabled={isStudent} defaultValue={quiz?.type}
                onChange={(e) => {
                  setQuizState({ ...quizState, type: e.target.value });
                }}
              >
                <option value="Graded Quiz">Graded Quiz</option>
                <option value="Practice Quiz">Practice Quiz</option>
                <option value="Graded Survey">Graded Survey</option>
                <option value="Ungraded Survey">Ungraded Survey</option>
              </FormSelect>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="quiz-group">
          <Row>
            <FormLabel column sm={{ span: 2, offset: 2 }} className="text-end mb-4">
              Assignment Group
            </FormLabel>
            <Col sm={8}>
              <FormSelect disabled={isStudent} defaultValue={quiz?.assignmentGroup}
                onChange={(e) => {
                  setQuizState({ ...quizState, assignmentGroup: e.target.value });
                }}
              >
                <option value="Quizzes">Quizzes</option>
                <option value="Exams">Exams</option>
                <option value="Assignments">Assignments</option>
                <option value="Project">Project</option>
              </FormSelect>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Row>
            <FormLabel column sm={{ span: 2, offset: 2 }} className="text-end mb-4" ></FormLabel>
            <Col sm={8}>
              
              <FormLabel className="fw-bold">Options</FormLabel>
              <FormCheck
                disabled={isStudent} defaultChecked={quizState.shuffle === true} type="checkbox"
                label="Shuffle Answers" className="mb-4"
              />
              <FormCheck
                disabled={isStudent} defaultChecked={quizState.oneQuestionPerTime === true}
                type="checkbox" label="One Question at a Time" className="mb-4"
              />
              <FormCheck
                disabled={isStudent} defaultChecked={quizState.webcam === true}
                type="checkbox" label="Webcam Required" className="mb-4"
              />
              <FormCheck
                disabled={isStudent} defaultChecked={quizState.lock === true}
                type="checkbox" label="Lock Question After Answering" className="mb-4"
              />
              <div className="d-flex align-items-center mb-4">
                
                <FormCheck disabled={isStudent} type="checkbox" label="Time Limit" className="me-3" />
                <FormControl disabled={isStudent} className="me-2 ms-5"
                  style={{ width: "110px" }} value={quizState.timeLimit}
                  onChange={(e) =>
                    setQuizState({ ...quizState, timeLimit: e.target.value })
                  }
                />
                <FormLabel className="mb-0">Minutes</FormLabel>
              </div>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="mb-4">
          
          <Row>
            <Col sm={{ span: 2, offset: 2 }} className="text-end">
              <FormLabel className="text-end mb-4"></FormLabel>
            </Col>
            <Col sm={8} className="border rounded p-3">
              <FormCheck disabled={isStudent}
                defaultChecked={quizState.multipleAttempts === true}
                type="checkbox" label="Allow Multiple Attempts" className="me-3"
              />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup className="mb-4">
          <Row>   
            <FormLabel column sm={{ span: 2, offset: 2 }} className="text-end mb-4" >  
              Assign
            </FormLabel>
            <Col sm={8} className="border p-3">
              <Row>
                <Col>
                  <FormLabel htmlFor="quiz-assign-to" column className="mb-1 fw-bold" >
                    Assign To
                  </FormLabel>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormSelect disabled={isStudent} id="quiz-assign-to">
                    <option value="Everyone">Everyone</option>
                    <option value="Students">Students</option>
                    <option value="TAsTeachers">TAs/Teacher</option>
                    <option value="None">None</option>
                  </FormSelect>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormLabel htmlFor="wd-due-date" column className="mb-1 fw-bold" >
                    Due
                  </FormLabel>
                </Col>
                <InputGroup className="mb-3">
                  <FormControl disabled={isStudent} id="wd-due-date" value={quizState.due}
                    onChange={(e) =>
                      setQuizState({ ...quizState, due: e.target.value })
                    }
                  />
                  <InputGroupText>
                    <FaRegCalendarAlt />
                  </InputGroupText>
                </InputGroup>
              </Row>
              <Row>
                <Col>
                  <FormLabel htmlFor="wd-available-from" column className="mb-1 fw-bold" >
                    Available From
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <FormControl disabled={isStudent} id="wd-available-from"
                      value={quizState.available}
                      onChange={(e) =>
                        setQuizState({
                          ...quizState,
                          available: e.target.value,
                        })
                      }
                    />
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText>
                  </InputGroup>
                </Col>
                <Col>
                  <FormLabel htmlFor="wd-available-until" column className="mb-1 fw-bold" >
                    Until
                  </FormLabel>
                  <InputGroup className="mb-3">
                    <FormControl disabled={isStudent} id="wd-available-until"
                      value={quizState.until}
                      onChange={(e) =>
                        setQuizState({ ...quizState, until: e.target.value })
                      }
                    />
                    <InputGroupText>
                      
                      <FaRegCalendarAlt />
                    </InputGroupText>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        </FormGroup>
        
        <FormGroup controlId="show-correct-answers">
          <Row>
            <FormLabel column sm={{ span: 2, offset: 2 }} className="text-end mb-4" >
              Show Correct Answers
            </FormLabel>
            <Col sm={8}>
              <FormSelect disabled={isStudent} defaultValue={quiz?.showCorrectAnswers}
                onChange={(e) => {
                  setQuizState({
                    ...quizState,
                    showCorrectAnswers: e.target.value,
                  });
                }}
              >
                <option value="Immediately">Immediately</option>
                <option value="Never">Never</option>
              </FormSelect>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup controlId="access-code">
          <FormLabel className="fw-bold">Access Code</FormLabel>
          <FormControl disabled={isStudent} className="mb-4" value={quizState.accessCode}
            onChange={(e) =>
              setQuizState({ ...quizState, accessCode: e.target.value })
            }
          />
        </FormGroup>
        <Row>
          <Col>
            <hr></hr>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="danger" size="lg" className="me-1 float-end"
              onClick={async () => {
                const updatedQuiz = { ...quizState, published: true };
                // setQuizState(updatedQuiz);
                if (qid === "new") {
                  await onCreateQuizForCourse(updatedQuiz);
                  dispatch(setQuizzes([...quizzes, updatedQuiz]));
                } else {
                  await onUpdateQuiz(updatedQuiz);
                }
                router.push(`/courses/${cid}/quizzes`);
              }}
            >
              
              Save and Publish
            </Button>
            <Button variant="danger" size="lg" className="me-1 float-end"
              onClick={async () => {
                if (qid === "new") {
                  await onCreateQuizForCourse(quizState);
                } else {
                  await onUpdateQuiz(quizState);
                }
                router.push(`/courses/${cid}/quizzes/${qid}`);
              }}
            >
              
              Save
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end"
              onClick={() => {
                router.push(`/courses/${cid}/quizzes`);
              }}
            >
              
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
