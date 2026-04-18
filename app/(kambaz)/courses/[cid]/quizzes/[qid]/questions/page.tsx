"use client";

import { useState, useEffect } from "react";
import * as client from "../../client";
import { updateQuiz, setQuizzes } from "../../reducer";
import { setQuestions, addQuestion, updateQuestion, deleteQuestion, } from "./reducer";
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../../store"; 
import { useRouter } from "next/navigation";
import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaRegCalendarAlt } from "react-icons/fa";
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

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const isEditing = (id: string) => editingQuestionId === id;
  const [originalQuestions, setOriginalQuestions] = useState<Question[]>([]);
  
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT"; 

  // fetches questions and initalizes draft questions
  const fetchQuestions = async () => {
    if (!qid) return;
    const questions = await client.findQuestionsForQuiz(qid as string);
    dispatch(setQuestions(questions));
    setDraftQuestions(questions);
    setOriginalQuestions(questions);
  };


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

  // QUIZ SAVE (commit to server)
  const handleSaveQuiz = async () => {
    if (!qid) return;

    // update quiz points based on sum of question points
    const totalPoints = calculateTotalPoints(draftQuestions);
    await client.updateQuiz({ ...quiz, points: totalPoints });
    console.log(`Total points: ${totalPoints}`);

    // create or update
    for (const q of draftQuestions) {
      const exists = originalQuestions.find(orig => orig._id === q._id);

      if (!exists) {
        await client.createQuestionForQuiz(qid, q);
      } else {
        await client.updateQuestion(qid, q);
      }
    }

    // deletions
    for (const orig of originalQuestions) {
      if (!draftQuestions.find(q => q._id === orig._id)) {
        await client.deleteQuestion(qid, orig._id);
      }
    }

    await fetchQuestions();
  };

  // QUIZ CANCEL (discard draft)
  const handleCancelQuiz = () => {
    setDraftQuestions(originalQuestions);
    setEditingQuestionId(null);
    setDraftQuizPoints(quiz?.points || 0);
  };

  const updateDraftQuestion = (id: string, field: string, value: any) => {
    setDraftQuestions(prev =>
      prev.map(q =>
        q._id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const updateChoice = (qid: string, cid: string, text: string) => {
    setDraftQuestions(prev =>
      prev.map(q => {
        if (q._id !== qid) return q;

        const updatedChoices = q.choices?.map(choice => {
          if (choice._id === cid) {
            return { ...choice, text };
          }
          return choice;
        });

        return {
          ...q,
          choices: updatedChoices,
        };
      })
    );
  };

  const addChoice = (qid: string) => {
    setDraftQuestions(prev =>
      prev.map(q => {
        if (q._id !== qid) return q;

        const newChoice = {
          _id: "temp-" + Date.now(),
          text: "",
          isCorrect: false,
        };

        return {
          ...q,
          choices: [...(q.choices ?? []), newChoice],
        };
      })
    );
  };

  const deleteChoice = (qid: string, cid: string) => {
    setDraftQuestions(prev =>
      prev.map(q => {
        if (q._id !== qid) return q;

        const updatedChoices = q.choices?.filter(
          choice => choice._id !== cid
        );

        return {
          ...q,
          choices: updatedChoices,
        };
      })
    );
  };

  const setCorrectChoice = (qid: string, cid: string) => {
    setDraftQuestions(prev =>
      prev.map(q => {
        if (q._id !== qid) return q;

        const updatedChoices = q.choices?.map(choice => {
          return {
            ...choice,
            isCorrect: choice._id === cid,
          };
        });

        return {
          ...q,
          choices: updatedChoices,
        };
      })
    );
  };

  const [draftQuizPoints, setDraftQuizPoints] = useState<number>(quiz?.points || 0);

  const calculateTotalPoints = (qs: Question[]) => {
    return qs.reduce((sum, q) => sum + (Number(q.points) || 0), 0);
  };

  useEffect(() => {
    if (quiz) {
      setDraftQuizPoints(quiz.points);
    }
  }, [quiz]);

  useEffect(() => {
    setDraftQuizPoints(calculateTotalPoints(draftQuestions));
  }, [draftQuestions]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  return ( 
    <>
      <div className="d-flex align-items-center justify-content-end mt-3 mb-3">
        <div className="me-2 fs-5">Points</div>
        <div className="me-5 fs-5">{draftQuizPoints}</div>
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
              <FormGroup className="mb-5">
                <Row>   
                  <Col sm={{ span: 10, offset: 1 }} className="border p-3">
                    <Row className="border-bottom pb-3 mb-2 align-items-center">
                      <Col md={6}>
                        <InputGroup>
                          <FormControl  disabled={isStudent || !isEditing(q._id)} 
                                        value={q.title} placeholder="Enter title of the question"
                                        onChange={(e) =>
                                          updateDraftQuestion(q._id, "title", e.target.value)
                                        }  
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <FormSelect
                          disabled={isStudent || !isEditing(q._id)}
                          value={q.type}
                          onChange={(e) =>
                            updateDraftQuestion(q._id, "type", e.target.value)
                          }
                        >
                          <option value="MULTIPLE CHOICE">Multiple Choice</option>
                          <option value="TRUE FALSE">True/False</option>
                          <option value="FILL IN THE BLANK">Fill in the Blank</option>
                        </FormSelect>
                      </Col>
                      <Col md={2} className="d-flex align-items-center justify-content-end">
                        <FormLabel className="fw-bold mb-0 me-2">pts:</FormLabel>
                          <FormControl value={q.points}
                            disabled={isStudent || !isEditing(q._id)}
                            placeholder="0" style={{ width: "60px" }}
                            onChange={(e) =>
                              updateDraftQuestion(q._id, "points", Number(e.target.value))
                            }
                          />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel column className="mb-1" >
                          Enter your question and multiple answers, then select the one correct answer.
                        </FormLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Question:
                        </FormLabel>
                      </Col>
                    </Row>

                    <Row>
                      {/* todo: need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG*/}
                      <FormGroup controlId="quiz-question">
                        <FormControl  disabled={isStudent || !isEditing(q._id)} as="textarea" 
                                      className="mb-4" rows={15} value={q.question}
                                      onChange={(e) =>
                                        updateDraftQuestion(q._id, "question", e.target.value)
                                      }
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Answers:
                        </FormLabel>
                      </Col>
                    </Row>

                    {q.choices?.map((c: Choice) => (
                      <Row key={c._id} className="align-items-center mb-2">

                        {/* radio */}
                        <Col sm={1} className="text-center">
                          <FormCheck
                            type="radio"
                            name={`correct-${q._id}`}
                            checked={c.isCorrect}
                            disabled={isStudent || !isEditing(q._id)}
                            onChange={() => setCorrectChoice(q._id, c._id)}
                          />
                        </Col>

                        {/* text input */}
                        <Col sm={9}>
                          <FormControl
                            disabled={isStudent || !isEditing(q._id)}
                            value={c.text}
                            onChange={(e) =>
                              updateChoice(q._id, c._id, e.target.value)
                            }
                            placeholder="Enter choice"
                          />
                        </Col>

                        {/* delete */}
                        <Col sm={2}>
                          <Button
                            size="sm"
                            variant="danger"
                            disabled={isStudent || !isEditing(q._id)}
                            onClick={() => deleteChoice(q._id, c._id)}
                          >
                            Delete
                          </Button>
                        </Col>

                      </Row>
                    ))}

                    {/* ADD CHOICE BUTTON */}
                    {isEditing(q._id) && !isStudent && (
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-2"
                        onClick={() => addChoice(q._id)}
                      >
                        + Add Choice
                      </Button>
                    )}

                    <Row className="mt-3">
                      {!isEditing(q._id) ? (
                        
                        // EDIT MODE START
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => setEditingQuestionId(q._id)}
                        >
                          Edit
                        </Button>

                      ) : (
                        <>
                          {/* CANCEL */}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="me-2"
                            onClick={() => {
                              setEditingQuestionId(null);
                              setDraftQuestions(questions); // revert changes
                            }}
                          >
                            Cancel
                          </Button>

                          {/* UPDATE QUESTION */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              setEditingQuestionId(null);
                            }}
                          >
                            Update Question
                          </Button>
                        </>
                      )}
                    </Row>
                  </Col>
                 
                </Row>
              </FormGroup>  
            }

            {q.type === "TRUE FALSE" && 
              <FormGroup className="mb-5">
                <Row>   
                  <Col sm={{ span: 10, offset: 1 }} className="border p-3">
                    <Row className="border-bottom pb-3 mb-2 align-items-center">
                      <Col md={6}>
                        <InputGroup>
                          <FormControl  disabled={isStudent || !isEditing(q._id)} 
                                        value={q.title} placeholder="Enter title of the question"
                                        onChange={(e) =>
                                          updateDraftQuestion(q._id, "title", e.target.value)
                                        }  
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <FormSelect
                          disabled={isStudent || !isEditing(q._id)}
                          value={q.type}
                          onChange={(e) =>
                            updateDraftQuestion(q._id, "type", e.target.value)
                          }
                        >
                          <option value="MULTIPLE CHOICE">Multiple Choice</option>
                          <option value="TRUE FALSE">True/False</option>
                          <option value="FILL IN THE BLANK">Fill in the Blank</option>
                        </FormSelect>
                      </Col>
                      <Col md={2} className="d-flex align-items-center justify-content-end">
                        <FormLabel className="fw-bold mb-0 me-2">pts:</FormLabel>
                          <FormControl value={q.points}
                            disabled={isStudent || !isEditing(q._id)}
                            placeholder="0" style={{ width: "60px" }}
                            onChange={(e) =>
                              updateDraftQuestion(q._id, "points", Number(e.target.value))
                            }
                          />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel column className="mb-1" >
                          Enter your question text, then select if True or False is the correct answer.
                        </FormLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Question:
                        </FormLabel>
                      </Col>
                    </Row>

                    <Row>
                      {/* todo: need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG*/}
                      <FormGroup controlId="quiz-question">
                        <FormControl  disabled={isStudent || !isEditing(q._id)} as="textarea" 
                                      className="mb-4" rows={15} value={q.question}
                                      onChange={(e) =>
                                        updateDraftQuestion(q._id, "question", e.target.value)
                                      }
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Answers:
                        </FormLabel>
                      </Col>
                    </Row>

                    <FormGroup className="mb-4">
                      <Row className="align-items-center mb-3">
                        <Col sm={{span: 2, offset: 1}} className="p-3"> 
                          <FormCheck  disabled={isStudent || !isEditing(q._id)} type="radio" 
                                      name={`tf-${q._id}`} value="true" label="TRUE" 
                                      className="mb-4 ms-3" checked={q.correctAnswer === true}
                                      onChange={() =>
                                        updateDraftQuestion(q._id, "correctAnswer", true)
                                      } 
                          />
                          <FormCheck  disabled={isStudent || !isEditing(q._id)} type="radio" 
                                      name={`tf-${q._id}`} value="false" label="FALSE" 
                                      className="mb-4 ms-3" checked={q.correctAnswer === false}
                                      onChange={() =>
                                        updateDraftQuestion(q._id, "correctAnswer", false)
                                      } 
                          />
                        </Col> 
                      </Row>
                    </FormGroup>
                    
                                        <Row className="mt-3">
                      {!isEditing(q._id) ? (
                        
                        // EDIT MODE START
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => setEditingQuestionId(q._id)}
                        >
                          Edit
                        </Button>

                      ) : (
                        <>
                          {/* CANCEL */}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="me-2"
                            onClick={() => {
                              setEditingQuestionId(null);
                              setDraftQuestions(questions); // revert changes
                            }}
                          >
                            Cancel
                          </Button>

                          {/* UPDATE QUESTION */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              setEditingQuestionId(null);
                            }}
                          >
                            Update Question
                          </Button>
                        </>
                      )}
                    </Row>
                  </Col>
                </Row>
              </FormGroup> 
            }

            {q.type === "FILL IN THE BLANK" && 
              <FormGroup className="mb-5">
                <Row>   
                  <Col sm={{ span: 10, offset: 1 }} className="border p-3">
                    <Row className="border-bottom pb-3 mb-2 align-items-center">
                      <Col md={6}>
                        <InputGroup>
                          <FormControl  disabled={isStudent || !isEditing(q._id)} 
                                        value={q.title} placeholder="Enter title of the question"
                                        onChange={(e) =>
                                          updateDraftQuestion(q._id, "title", e.target.value)
                                        }  
                          />
                        </InputGroup>
                      </Col>
                      <Col md={4}>
                        <FormSelect
                          disabled={isStudent || !isEditing(q._id)}
                          value={q.type}
                          onChange={(e) =>
                            updateDraftQuestion(q._id, "type", e.target.value)
                          }
                        >
                          <option value="MULTIPLE CHOICE">Multiple Choice</option>
                          <option value="TRUE FALSE">True/False</option>
                          <option value="FILL IN THE BLANK">Fill in the Blank</option>
                        </FormSelect>
                      </Col>
                      <Col md={2} className="d-flex align-items-center justify-content-end">
                        <FormLabel className="fw-bold mb-0 me-2">pts:</FormLabel>
                        <FormControl value={q.points}
                          disabled={isStudent || !isEditing(q._id)}
                          placeholder="0" style={{ width: "60px" }}
                          onChange={(e) =>
                            updateDraftQuestion(q._id, "points", Number(e.target.value))
                          }
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel column className="mb-1" >
                          Enter your question text, then define all possible correct answers for the blank.
                          Students will see the question followed by a small text box to type their answer.
                        </FormLabel>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Question:
                        </FormLabel>
                      </Col>
                    </Row>

                    <Row>
                      {/* todo: need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG need to update to WYSIWYG*/}
                      <FormGroup controlId="quiz-question">
                        <FormControl  disabled={isStudent || !isEditing(q._id)} as="textarea" 
                                      className="mb-4" rows={15} value={q.question}
                                      onChange={(e) =>
                                        updateDraftQuestion(q._id, "question", e.target.value)
                                      }
                        />
                      </FormGroup>
                    </Row>

                    <Row>
                      <Col>
                        <FormLabel className="fw-bold fs-5">
                          Answers:
                        </FormLabel>
                      </Col>
                    </Row>

                    <FormGroup className="mb-4">
                      <Row className="align-items-center mb-3">
                        <FormLabel column sm={{span: 2, offset: 1}} className="text-end mb-4"> Possible Answer</FormLabel> 
                        <Col sm={8} className="p-3">
                          <FormControl disabled={isStudent || !isEditing(q._id)} placeholder="Enter possible answer" className="mb-3" />
                        </Col>
                      </Row>
                    </FormGroup>
                    
                                        <Row className="mt-3">
                      {!isEditing(q._id) ? (
                        
                        // EDIT MODE START
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => setEditingQuestionId(q._id)}
                        >
                          Edit
                        </Button>

                      ) : (
                        <>
                          {/* CANCEL */}
                          <Button
                            size="sm"
                            variant="secondary"
                            className="me-2"
                            onClick={() => {
                              setEditingQuestionId(null);
                              setDraftQuestions(questions); // revert changes
                            }}
                          >
                            Cancel
                          </Button>

                          {/* UPDATE QUESTION */}
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              setEditingQuestionId(null);
                            }}
                          >
                            Update Question
                          </Button>
                        </>
                      )}
                    </Row>
                  </Col>
                </Row>
              </FormGroup> 
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