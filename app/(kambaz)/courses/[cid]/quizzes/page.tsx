"use client";

import { useEffect } from "react";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux"; 
import { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes } from "./reducer";
import { RootState } from "../../../store"; 

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import Link from "next/link";
import { useParams } from "next/navigation";
import QuizzesControls from "./QuizzesControls";
import { IoRocketOutline } from "react-icons/io5";


export default function Quizzes() {
  const { cid } = useParams();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer); 
  const { currentUser } = useSelector((state: RootState) => state.accountReducer); 
  const role = (currentUser as any).role;
  const isStudent = role === "STUDENT";
  const dispatch = useDispatch();

  const fetchQuizzes = async () => { 
      const quizzes = await client.findQuizzesForCourse(cid as string); 
      dispatch(setQuizzes(quizzes)); 
  }; 

  useEffect(() => { 
      fetchQuizzes(); 
    }, []); 
  return (
      <div>
        <QuizzesControls isStudent={isStudent} cid={cid as string} /><br />
        <ListGroup>
          <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
            <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
              <TbTriangleInvertedFilled className="me-1 fs-8" /> Assignment Quizzes 
            </div>

            <ListGroup className="rounded-0"> 
              {quizzes.map((quiz: any) => (
                <ListGroupItem key={quiz.id} className="wd-assignment-list-item p-3 ps-1 align-items-center">
                  <div className="wd-assignment-flex-row-container">
                    <IoRocketOutline className="me-3 fs-3 text-success" />

                    <div className="wd-assignment-flex-col-container">
                      <Link href={`/courses/${cid}/quizzes/${quiz._id}`}
                            className="wd-assignment-link mb-0 text-decoration-none text-black" > 
                            {quiz.title}
                      </Link>
                    </div>
                  </div>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
);}