"use client";

import { FormControl, FormLabel, FormSelect, FormCheck, Row, Col } from "react-bootstrap";
import { Form, FormGroup, Button } from "react-bootstrap";
import InputGroup from 'react-bootstrap/InputGroup';
import InputGroupText from 'react-bootstrap/InputGroupText';
import { FaRegCalendarAlt } from "react-icons/fa";

export default function AssignmentEditor() { 
  return ( 
    <Form>
      <FormGroup controlId="wd-name">
        <FormLabel>Assignment Name</FormLabel> 
        <FormControl className="mb-4" placeholder="A1"/> 
      </FormGroup>

      <FormGroup controlId="wd-description">
        <FormControl as="textarea" className="mb-4" rows={15} 
                     defaultValue={  
`
The assignment is available online

Submit a link to the landing page of your Web application running on 
Netlify. 

The landing page should include the following: 

• Your full name and section 
• Links to each of the lab assignments 
• Link to the Kanbas application 
• Links to all relevant source code repositories 

The Kanbas application should include a link to navigate back to the landing 
page.`} />
      </FormGroup>

      <FormGroup controlId="wd-points" className="mb-4">
        <Row className="mb-4" controlId="formGroupPoints"> 
            <FormLabel column sm={{span: 1, offset: 3}} className="text-end"> Points</FormLabel> 
            <Col sm={8}> 
              <FormControl type="number" defaultValue="100" /> 
            </Col> 
        </Row> 
      </FormGroup>

      <FormGroup controlId="wd-group">
        <Row>
          <FormLabel column sm={{span: 2, offset: 2}} className="text-end mb-4"> Assignment Group</FormLabel> 
            <Col sm={8}> 
              <FormSelect defaultValue="ASSIGNMENTS">
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
              <FormSelect defaultValue="PERCENTAGE">
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
                <FormSelect id="wd-submission-type" defaultValue="Online">
                  <option value="Online">Online</option>
                  <option value="On Paper">On Paper</option>
                  <option value="External Tool">External Tool</option>
                </FormSelect> 
            </Col> 
            <FormLabel column className="mb-4 fw-bold">Online Entry Options</FormLabel>
            <FormCheck type="checkbox" id="wd-text-entry" label="Text Entry" className="mb-4 ms-3" />
            <FormCheck defaultChecked type="checkbox" id="wd-website-url" label="Website URL" className="mb-4 ms-3" />
            <FormCheck type="checkbox" id="wd-media-recordings" label="Media Recordings" className="mb-4 ms-3" />
            <FormCheck type="checkbox" id="wd-student-annotation" label="Student Annotation" className="mb-4 ms-3" />
            <FormCheck type="checkbox" id="wd-file-upload" label="File Uploads" className="mb-4 ms-3" />
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
                <FormSelect id="wd-assign-to" defaultValue="Online">
                  <option value="Online">change</option>
                  <option value="On Paper">change</option>
                  <option value="External Tool">change</option>
                </FormSelect> 
              </Col> 
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="wd-due-date" column className="mb-1 fw-bold">Due</FormLabel>
              </Col>
              <InputGroup className="mb-3" > 
                <FormControl id="wd-due-date" defaultValue="May 13, 2024, 11:59 PM"/> 
                <InputGroupText>
                  <FaRegCalendarAlt />
                </InputGroupText> 
              </InputGroup>
            </Row>
            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from" column className="mb-1 fw-bold">Available From</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl id="wd-available-from" defaultValue="May 6, 2024, 12:00 AM"/> 
                    <InputGroupText>
                      <FaRegCalendarAlt />
                    </InputGroupText> 
                </InputGroup>
              </Col>
              <Col>
                <FormLabel htmlFor="wd-available-until" column className="mb-1 fw-bold">Until</FormLabel>
                <InputGroup className="mb-3" > 
                    <FormControl id="wd-available-until"/> 
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
          <Button variant="danger" size="lg" className="me-1 float-end"> 
            Save
          </Button>
          <Button variant="secondary" size="lg" className="me-1 float-end">
            Cancel
          </Button>
        </Col>
      </Row>
    </Form>
);} 