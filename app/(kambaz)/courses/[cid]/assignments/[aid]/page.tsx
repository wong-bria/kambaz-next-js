"use client";

import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../../store"; 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { addAssignment, updateAssignment } from "../reducer";
import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../database";


export default function AssignmentEditor() { 
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: RootState) => state.assignmentsReducer);
  const assignment = assignments.find((assignment: any) => assignment._id === aid);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isStudent = (currentUser as any)?.role === "STUDENT";

  const dispatch = useDispatch();
  const router = useRouter();

  const [assignmentState, setAssignmentState] = useState({
    _id: aid,
    title: assignment?.title || "",
    course: cid,
    available: assignment?.available || "",
    due: assignment?.due || "",
    points: assignment?.points || 0,
    description: assignment?.description || "",

    assignmentGroup: assignment?.assignmentGroup || "ASSIGNMENTS",
    display: assignment?.display || "PERCENTAGE",
    type: assignment?.type || "ONLINE",
    options: assignment?.options || "Website URL",
    assign: assignment?.assign || "Everyone",

    until: assignment?.until || ""
  });

  return ( 
    <Form>
      <FormGroup controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel> 
        <FormControl disabled={isStudent} className="mb-4" value={assignmentState.title} 
          onChange={(e) => setAssignmentState({...assignmentState, title: e.target.value})} /> 
      </FormGroup>

      <FormGroup controlId="wd-description">
        <FormControl disabled={isStudent} as="textarea" className="mb-4" rows={15} 
                     value={assignmentState.description}
                     onChange={(e) => setAssignmentState({...assignmentState, description: e.target.value})} />
      </FormGroup>

      <FormGroup controlId="wd-points" className="mb-4">
        <Row className="mb-4" controlId="formGroupPoints"> 
            <FormLabel column sm={{span: 1, offset: 3}} className="text-end"> Points</FormLabel> 
            <Col sm={8}> 
              <FormControl disabled={isStudent} type="number" value={assignmentState.points}
                onChange={(e) => setAssignmentState({...assignmentState, points: parseInt(e.target.value) || 0})} /> 
            </Col> 
        </Row> 
      </FormGroup>

      <FormGroup controlId="wd-group">
        <Row>
          <FormLabel column sm={{span: 2, offset: 2}} className="text-end mb-4"> Assignment Group</FormLabel> 
            <Col sm={8}> 
              <FormSelect disabled={isStudent} defaultValue={assignment?.assignmentGroup}
                onChange={(e) => {
                  setAssignmentState({
                        ...assignmentState,
                        assignmentGroup: e.target.value
                      });
                  }}>
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECTS">PROJECTS</option>
              </FormSelect> 
            </Col> 
        </Row>
      </FormGroup>

      <FormGroup controlId="wd-display-grade-as">
        <Row>
          <FormLabel column sm={{span: 2, offset: 2}} className="text-end mb-4"> Display Grade as</FormLabel> 
            <Col sm={8}> 
              <FormSelect disabled={isStudent} defaultValue={assignment?.display}
                onChange={(e) => {
                  setAssignmentState({
                        ...assignmentState,
                        display: e.target.value
                      });
                  }}>
                <option value="PERCENTAGE">PERCENTAGE</option>
                <option value="DECIMAL">DECIMAL</option>
                <option value="LETTER">LETTER</option>
              </FormSelect> 
            </Col> 
        </Row>
      </FormGroup>

      <FormGroup className="mb-4">
        <Row>
          <Col sm={{span: 2, offset: 2}} className="text-end">
            <FormLabel htmlFor="wd-submission-type" className="text-end mb-4"> Submission Type</FormLabel> 
          </Col>          
          <Col sm={8} className="border p-3">
            <Col className="mb-4"> 
                <FormSelect disabled={isStudent} id="wd-submission-type" defaultValue={assignment?.type} 
                  onChange={(e) => {
                    setAssignmentState({
                          ...assignmentState,
                          type: e.target.value
                        });
                    }}>
                  <option value="Online">Online</option>
                  <option value="On Paper">On Paper</option>
                  <option value="External Tool">External Tool</option>
                </FormSelect> 
            </Col> 
            <FormLabel column className="mb-4 fw-bold">Online Entry Options</FormLabel>
            <FormCheck disabled={isStudent} defaultChecked={assignment?.options === "Text Entry"} type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-4 ms-3" />
            <FormCheck disabled={isStudent} defaultChecked={assignment?.options === "Website URL"} type="checkbox" id="wd-website-url" label="Website URL" className="mb-4 ms-3" />
            <FormCheck disabled={isStudent} defaultChecked={assignment?.options === "Media Recordings"} type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-4 ms-3" />
            <FormCheck disabled={isStudent} defaultChecked={assignment?.options === "Student Annotation"} type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-4 ms-3" />
            <FormCheck disabled={isStudent} defaultChecked={assignment?.options === "File Uploads"} type="checkbox" id="wd-file-upload" label="File Uploads" className="mb-4 ms-3" />
          </Col>
        </Row>
      </FormGroup>



      <FormGroup className="mb-4">
        <Row>
          <FormLabel column sm={{span: 2, offset: 2}} className="text-end mb-4"> Assign</FormLabel> 
          <Col sm={8} className="border p-3">
            <Row>
              <Col>
                <FormLabel htmlFor="wd-assign-to" column className="mb-1 fw-bold">Assign To</FormLabel>
              </Col>
            </Row>
            <Row>
              <Col className="mb-3"> 
                <FormSelect disabled={isStudent} id="wd-assign-to" defaultValue={assignment?.assign}
                  onChange={(e) => {
                    setAssignmentState({
                        ...assignmentState,
                        assign: e.target.value
                      });
                  }}>
                  <option value="Everyone">Everyone</option>
                  <option value="Students">Students</option>
                  <option value="TAsTeachers">TAs/Teacher</option>
                  <option value="None">None</option>
                </FormSelect> 
              </Col> 
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="wd-due-date" column className="mb-1 fw-bold">Due</FormLabel>
              </Col>
              <InputGroup className="mb-3" > 
                <FormControl disabled={isStudent} id="wd-due-date" value={assignmentState.due}
                  onChange={(e) => setAssignmentState({...assignmentState, due: e.target.value})} /> 
                <InputGroupText>
                  <FaRegCalendarAlt />
                </InputGroupText> 
              </InputGroup>
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from" column className="mb-1 fw-bold">Available From</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl disabled={isStudent} id="wd-available-from" value={assignmentState.available}
                      onChange={(e) => setAssignmentState({...assignmentState, available: e.target.value})} /> 
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText> 
                </InputGroup>
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until" column className="mb-1 fw-bold">Until</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl disabled={isStudent} id="wd-available-until" value={assignmentState.until}
                      onChange={(e) => setAssignmentState({...assignmentState, until: e.target.value})} /> 
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText> 
                  </InputGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </FormGroup>

      <Row>
        <Col>
          <hr></hr>
        </Col>
      </Row>
      <Row>
        <Col>
            <Button variant="danger" size="lg" className="me-1 float-end"
              onClick={() => {
                if (aid === "new") {
                  dispatch(addAssignment(assignmentState));
                } else {
                  dispatch(updateAssignment(assignmentState));
                }

                router.push(`/courses/${cid}/assignments`);
              }}>
              Save
            </Button>
            <Button variant="secondary" size="lg" className="me-1 float-end"
              onClick={() => {
                router.push(`/courses/${cid}/assignments`);
              }}>
              Cancel
            </Button>
        </Col>
      </Row>
    </Form>
);} 