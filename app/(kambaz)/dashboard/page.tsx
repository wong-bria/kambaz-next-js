"use client";

import * as client from "../courses/client";
import * as enrollmentClient from "./client";
import { RootState } from "../store"; 

import { useDispatch, useSelector } from "react-redux"; 
import { addNewCourse, deleteCourse, updateCourse, setCourses } from "../courses/reducer"; 
import { setEnrollments, enroll, unenroll } from "../dashboard/reducer";

import { useEffect, useState } from "react";
import Link from "next/link"; 
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

type Enrollment = {
  _id: string;
  user: string;
  course: string;
};

export default function Dashboard() { 
  const { courses } = useSelector((state: RootState) => state.coursesReducer); 
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any; 
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer) as { enrollments: Enrollment[] };
  const dispatch = useDispatch(); 

  const role = currentUser?.role;
  const isStudent = role === "STUDENT";

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [allCourses, setAllCourses] = useState<any[]>([]);

  const [course, setCourse] = useState<any>({ 
    _id: "0", name: "New Course", number: "New Number", 
    startDate: "2023-09-10", endDate: "2023-12-15", 
    image: "/images/reactjs.jpg", description: "New Description" 
  });  

  const onAddNewCourse = async () => { 
    const newCourse = await client.createCourse(course); 
    dispatch(setCourses([ ...courses, newCourse ])); 

    dispatch(setEnrollments([
      ...enrollments,
      { _id: uuidv4(), user: currentUser._id, course: newCourse._id }
    ]));

    const allCourses = await client.fetchAllCourses();
    setAllCourses(allCourses);
    fetchCourses();
  };

  const onDeleteCourse = async (courseId: string) => { 
    const status = await client.deleteCourse(courseId); 
    dispatch(setCourses(courses.filter((course) => course._id !== courseId))); 
    const allCourses = await client.fetchAllCourses();
    setAllCourses(allCourses);
    fetchCourses();
  };

  const onUpdateCourse = async () => { 
    await client.updateCourse(course); 
    dispatch(setCourses(courses.map((c) => { 
        if (c._id === course._id) { return course; } 
        else { return c; } 
    })));
    const allCourses = await client.fetchAllCourses();
    setAllCourses(allCourses);
    fetchCourses();
  }; 

  const displayedCourses = showAllCourses
  ? allCourses
  : courses.filter((course) =>
      enrollments?.some(
        (e: Enrollment) => e?.user === currentUser._id && e?.course === course._id
      )
    );

  // const displayedCourses = showAllCourses
  // ? allCourses
  // : courses.filter((course) => {
  //     return enrollments?.some((e: Enrollment) => {
  //       const match =
  //         e?.user === currentUser?._id &&
  //         e?.course === course?._id;
  //       return match;
  //     });
  //   });

  const fetchEnrollments = async () => {
    const enrollments = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
    dispatch(setEnrollments(enrollments));
  }

  const handleEnrollments = async (courseId: string) => { 
    await client.enrollIntoCourse(currentUser._id, courseId);

    const updated = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
    dispatch(setEnrollments(updated));

    const allCourses = await client.fetchAllCourses();
    setAllCourses(allCourses);
    fetchCourses();
  }; 

  const handleUnenrollments = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);

    const updated = await enrollmentClient.findEnrollmentsForUser(currentUser._id);
    dispatch(setEnrollments(updated));

    const allCourses = await client.fetchAllCourses();
    setAllCourses(allCourses);
    fetchCourses();
  }

  const toggleShowAllCourses = async () => {
    setShowAllCourses(!showAllCourses);
  };

  useEffect(() => { 
    fetchEnrollments(); 
  }, []); 

  const fetchCourses = async () => { 
    try { 
      const courses = await client.findMyCourses(); 
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(courses)); 
      setAllCourses(allCourses);
    } catch (error) { 
      console.error(error); 
    } 
  }; 

  useEffect(() => { 
    fetchCourses(); 
  }, [currentUser]); 

  return ( 
    <div id="wd-dashboard"> 
      <div className="d-flex align-items-center justify-content-between">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <button 
          onClick={toggleShowAllCourses} className="btn btn-danger" 
          > 
                Enrollments 
        </button>
      </div>
      <hr /> 
      <h5>New Course 
          <button disabled={isStudent} className="btn btn-primary float-end" 
                  id="wd-add-new-course-click" 
                  onClick={onAddNewCourse} > Add </button> 
          <button disabled={isStudent} className="btn btn-warning float-end me-2" 
                onClick={onUpdateCourse} id="wd-update-course-click"> 
          Update </button>
      </h5><br/>
      <FormControl disabled={isStudent} value={course.name} className="mb-2" 
                   onChange={(e) => setCourse({ ...course, name: e.target.value }) }/> 
      <FormControl disabled={isStudent} as="textarea" value={course.description} rows={3}
                   onChange={(e) => setCourse({ ...course, description: e.target.value }) }/> 
      <hr/>
      <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2> <hr /> 
      <div id="wd-dashboard-courses"> 

        <Row xs={1} md={5} className="g-4">
          {displayedCourses
            .map((course) => {
                const isEnrolled = enrollments?.some(
                  (e: Enrollment) => e?.user === currentUser._id && e?.course === course._id
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
                                  onDeleteCourse(course._id);  
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
                        onClick={async (event) => {
                          event.preventDefault();

                          if (isEnrolled) {
                            await handleUnenrollments(course._id);
                            // dispatch(unenroll({ user: currentUser._id, course: course._id }))
                          } else {
                            await handleEnrollments(course._id);
                            // dispatch(enroll({ user: currentUser._id, course: course._id }))
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