"use client";

import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaRegCalendarAlt } from "react-icons/fa";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../database";


export default function AssignmentEditor() { 
  const { cid, aid } = useParams();
  const assignments = db.assignments.filter((assignment: any) => assignment.course === cid);
  const assignment = assignments.find((assignment: any) => assignment._id === aid);
  return ( 
    <Form>
      <FormGroup controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel> 
        <FormControl className="mb-4" defaultValue={assignment?.title}/> 
      </FormGroup>

      <FormGroup controlId="wd-description">
        <FormControl as="textarea" className="mb-4" rows={15} 
                     defaultValue={assignment?.description} />
      </FormGroup>

      <FormGroup controlId="wd-points" className="mb-4">
        <Row className="mb-4" controlId="formGroupPoints"> 
            <FormLabel column sm={{span: 1, offset: 3}} className="text-end"> Points</FormLabel> 
            <Col sm={8}> 
              <FormControl type="number" defaultValue={assignment?.points} /> 
            </Col> 
        </Row> 
      </FormGroup>

      <FormGroup controlId="wd-group">
        <Row>
          <FormLabel column sm={{span: 2, offset: 2}} className="text-end mb-4"> Assignment Group</FormLabel> 
            <Col sm={8}> 
              <FormSelect defaultValue={assignment?.assignmentGroup}>
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
              <FormSelect defaultValue={assignment?.display}>
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
                <FormSelect id="wd-submission-type" defaultValue={assignment?.type}>
                  <option value="Online">Online</option>
                  <option value="On Paper">On Paper</option>
                  <option value="External Tool">External Tool</option>
                </FormSelect> 
            </Col> 
            <FormLabel column className="mb-4 fw-bold">Online Entry Options</FormLabel>
            <FormCheck defaultChecked={assignment?.options === "Text Entry"} type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-4 ms-3" />
            <FormCheck defaultChecked={assignment?.options === "Website URL"} type="checkbox" id="wd-website-url" label="Website URL" className="mb-4 ms-3" />
            <FormCheck defaultChecked={assignment?.options === "Media Recordings"} type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-4 ms-3" />
            <FormCheck defaultChecked={assignment?.options === "Student Annotation"} type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-4 ms-3" />
            <FormCheck defaultChecked={assignment?.options === "File Uploads"} type="checkbox" id="wd-file-upload" label="File Uploads" className="mb-4 ms-3" />
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
                <FormSelect id="wd-assign-to" defaultValue={assignment?.assign}>
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
                <FormControl id="wd-due-date" defaultValue={assignment?.due}/> 
                <InputGroupText>
                  <FaRegCalendarAlt />
                </InputGroupText> 
              </InputGroup>
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from" column className="mb-1 fw-bold">Available From</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl id="wd-available-from" defaultValue={assignment?.available}/> 
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText> 
                </InputGroup>
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until" column className="mb-1 fw-bold">Until</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl id="wd-available-until" defaultValue={assignment?.until}/> 
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
          <Link href={`/courses/${cid}/assignments/`} className="text-decoration-none">
            <Button variant="danger" size="lg" className="me-1 float-end"> 
              Save
            </Button>
          </Link>
          <Link href={`/courses/${cid}/assignments/`} className="text-decoration-none">
            <Button variant="secondary" size="lg" className="me-1 float-end">
              Cancel
            </Button>
          </Link>
        </Col>
      </Row>
    </Form>
);} 