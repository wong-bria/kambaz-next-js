"use client";

import { useEffect } from "react";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux"; 
import { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } from "./reducer";
import { RootState } from "../../../store"; 
import { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import Link from "next/link";
import { useParams } from "next/navigation";
import QuizzesControls from "./QuizzesControls";
import { IoRocketOutline } from "react-icons/io5";
import ControlButtons from "./ControlButtons";
import "../assignments/index.css";


export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer) as { quizzes: any[] };
  const { currentUser } = useSelector((state: RootState) => state.accountReducer); 

  const role = (currentUser as any).role;
  const isStudent = role === "STUDENT";
  const dispatch = useDispatch();
  // must make faculty the only role able to perform CRUD on quizzes 
  const isFaculty = role === "FACULTY";

  const [latestAttempts, setLatestAttempts] = useState<Record<string, any>>({});

  const fetchQuizzes = async () => { 
      const quizzes = await client.findQuizzesForCourse(cid as string); 
      dispatch(setQuizzes(quizzes)); 
  }; 

  const onRemoveQuiz = async (quizId: string) => { 
    if (!isFaculty) return;
    await client.deleteQuiz(quizId); 
    dispatch(setQuizzes(quizzes.filter((q: any) => q._id !== quizId))); 
  };

  const togglePublish = async (quiz: any) => {
    if (!isFaculty) return;
    const updatedQuiz = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updatedQuiz);
    dispatch(updateQuiz(updatedQuiz));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const parseQuizDate = (dateStr: string) => {
    if (!dateStr) return null; // Return null if no date string is provided
    
    const date = new Date(dateStr); // Convert the string to a Date object
    return date; // Return the Date object directly (no formatting here)
  };

  const getQuizStatus = (quiz: any) => {
    const now = new Date();

    const availableDate = parseQuizDate(quiz.available);
    const untilDate = parseQuizDate(quiz.until);

    if (!availableDate || !untilDate) {
      return "Unknown";
    }

    if (availableDate && now < availableDate) {
      return `Not available until ${formatDate(availableDate)}`;
    }

    if (availableDate && untilDate && now >= availableDate && now <= untilDate) {
      return `Available ${formatDate(availableDate)}`;
    }

    if (availableDate && now > untilDate) {
      return "Closed";
    }

    return "Unknown";
  };

  useEffect(() => { 
      fetchQuizzes(); 
    }, []); 

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!isStudent || !currentUser?._id) return;

      const attemptsMap: Record<string, any> = {};

      for (const quiz of quizzes) {
        const attempt = await client.findLatestAttempt(
          quiz._id,
          currentUser._id
        );
        if (attempt) {
          attemptsMap[quiz._id] = attempt;
        }
      }

      setLatestAttempts(attemptsMap);
    };

    fetchAttempts();
  }, [quizzes, currentUser]);

  return (
      <div>

        <div> 
          {/* // Show pop-up message if there are no quizzes */}
          {quizzes.length === 0 && (
            <div className="alert alert-info">
              Click &quot;Add Quiz&quot; to create a new quiz.
            </div>
          )}
        </div>

        <QuizzesControls isStudent={isStudent} cid={cid as string} /><br />
        <ListGroup>
          <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
            <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
              <TbTriangleInvertedFilled className="me-1 fs-8" /> Assignment Quizzes 
            </div>

            <ListGroup className="rounded-0"> 
              {quizzes
              .map((quiz: any) => (
                <ListGroupItem 
                  key={quiz._id} 
                  className="wd-assignment-list-item p-3 ps-1 align-items-center">
                  <div className="wd-assignment-flex-row-container">
                    <IoRocketOutline className="ms-3 me-3 fs-3 text-success" />

                    <div className="wd-assignment-flex-col-container">
                      <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                            className="wd-assignment-link mb-0 text-decoration-none text-black" > 
                            {quiz.title}
                      </Link>

                      <div className="assignment-item-text">
                        <div className="wd-assignment-flex-row-container">
                          <div className="me-2 fw-bold">
                            {getQuizStatus(quiz)}
                          </div>
                          <div className="me-2 ms-2">|</div>
                          <div className="ms-2 me-2 fw-bold">Due {quiz.due && formatDate(new Date(quiz.due))}</div>
                          <div className="me-2 ms-2"> | </div>
                          <div className="ms-2 me-2">{quiz.points} pts</div>
                          <div className="me-2 ms-2">|</div>
                          <div className="ms-2 me-2">{quiz.questions.length} Questions</div>
                          <div className="ms-2 me-2">|</div>
                          <div className="ms-2">
                            {isStudent
                              ? latestAttempts[quiz._id]
                                ? `${latestAttempts[quiz._id].score} / ${latestAttempts[quiz._id].totalPoints}`
                                : "score"
                              : "score"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <ControlButtons isStudent={isStudent} quizID={quiz._id}
                                    deleteQuiz={(quizID) => onRemoveQuiz(quizID)}
                                    published={quiz.published}
                                    togglePublish={() => togglePublish(quiz)} />
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
);}