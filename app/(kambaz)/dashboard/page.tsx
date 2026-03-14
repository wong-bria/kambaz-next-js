"use client";

import * as db from "../database"; 
import { RootState } from "../store"; 

import { useDispatch, useSelector } from "react-redux"; 
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer"; 
import { enroll, unenroll } from "../dashboard/reducer";

import { useState } from "react";
import Link from "next/link"; 
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

export default function Dashboard() { 
  const { courses } = useSelector((state: RootState) => state.coursesReducer); 
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any; 
  // const { enrollments } = db; 
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch(); 

  // const role = (currentUser as any).role;
  const role = currentUser?.role;
  const isStudent = role === "STUDENT";

  const [showAllCourses, setShowAllCourses] = useState(false);

  const filteredCourses = courses.filter((course) => 
    currentUser &&
    enrollments.some( 
      (enrollment) => 
        enrollment.user === currentUser._id && 
        enrollment.course === course._id 
      ));

  const [course, setCourse] = useState<any>({ 
    _id: "0", name: "New Course", number: "New Number", 
    startDate: "2023-09-10", endDate: "2023-12-15", 
    image: "/images/reactjs.jpg", description: "New Description" 
  });  

  return ( 
    <div id="wd-dashboard"> 
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button 
          onClick={() => { 
                  setShowAllCourses(!showAllCourses); 
                }} className="btn btn-danger" 
          > 
                Enrollments 
        </button>
      </div>
      <hr /> 
      <h5>New Course 
          <button disabled={isStudent} className="btn btn-primary float-end" 
                  id="wd-add-new-course-click" 
                  onClick={() => dispatch(addNewCourse(course))} > Add </button> 
          <button disabled={isStudent} className="btn btn-warning float-end me-2" 
                onClick={() => dispatch(updateCourse(course))} id="wd-update-course-click"> 
          Update </button>
      </h5><br/>
      <FormControl disabled={isStudent} value={course.name} className="mb-2" 
                   onChange={(e) => setCourse({ ...course, name: e.target.value }) }/> 
      <FormControl disabled={isStudent} as="textarea" value={course.description} rows={3}
                   onChange={(e) => setCourse({ ...course, description: e.target.value }) }/> 
      <hr/>
      <h2 id="wd-dashboard-published">Published Courses ({showAllCourses ? courses.length : filteredCourses.length})</h2> <hr /> 
      <div id="wd-dashboard-courses"> 

        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) => {
              if (showAllCourses) return true;

              return (
                currentUser &&
                enrollments.some( 
                  (enrollment) => 
                    enrollment.user === currentUser._id && 
                    enrollment.course === course._id 
                )
              )
            }) 
        
            .map((course) => {
                const isEnrolled = enrollments.some(
                  (e) => e.user === currentUser._id && e.course === course._id
                );

              return (
                <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}> 
                  <Card> 
                  <Link href={`/courses/${course._id}/home`} 
                    className="wd-dashboard-course-link text-decoration-none text-dark" > 
                    <CardImg src={course.image} variant="top" width="100%" height={160} /> 
                    <CardBody className="card-body d-flex flex-column"> 
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> 
                        {course.name} </CardTitle> 
                      <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}> 
                        {course.description} </CardText> 

                      <div className="mt-auto mb-2">
                        <Button variant="primary"> Go </Button> 
                        
                        <button 
                          disabled={isStudent}
                          onClick={(event) => { 
                                  event.preventDefault(); 
                                  dispatch(deleteCourse(course._id)); 
                                }} className="btn btn-danger float-end" 
                                id="wd-delete-course-click"> 
                                Delete 
                        </button>
                        <button id="wd-edit-course-click" 
                                disabled={isStudent}
                                onClick={(event) => { 
                                  event.preventDefault(); 
                                  setCourse(course); 
                                }} 
                                className="btn btn-warning me-2 float-end" > 
                                Edit 
                        </button>
                      </div>
                      <Button variant={isEnrolled ? "danger" : "success"}
                        onClick={(event) => {
                          event.preventDefault();

                          if (isEnrolled) {
                            dispatch(unenroll({ user: currentUser._id, course: course._id }))
                          } else {
                            dispatch(enroll({ user: currentUser._id, course: course._id }))
                          }
                        }}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </Button>
                    </CardBody> 
                  </Link> 
                  </Card> 
                </Col>
              )
            })
          }
        </Row>
      </div> 
    </div> 
);}