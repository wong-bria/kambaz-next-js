import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls"; 
import AssignmentControlButtons from "./AssignmentControlButtons";
import ControlButtons from "./ControlButtons";

export default function Assignments() { 
  return ( 
    <div id="wd-assignments"> 
      <AssignmentsControls /><br /><br /><br /><br />
      <ListGroup>
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> 
            <TbTriangleInvertedFilled className="me-1 fs-8" /> ASSIGNMENTS 
            <AssignmentControlButtons />
          </div>

          <ListGroup id="wd-assignments-list" className="rounded-0">
            <ListGroupItem id="wd-assignment-list-item" className="wd-assignment-list-item p-3 ps-1 align-items-center">
              <div className="wd-assignment-flex-row-container">
                <BsGripVertical className="me-2 fs-3" />
                <TfiWrite className="me-3 fs-3 text-success" />
                <div className="wd-assignment-flex-col-container">
                  <Link href="/courses/1234/assignments/123" 
                        className="wd-assignment-link mb-0 text-decoration-none text-black" > 
                        A1
                  </Link>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="text-danger me-2">Multiple Modules</div>
                      <div className="me-2 ms-2">|</div>
                      <div className="ms-2 me-1 fw-bold">Not available until</div>
                      <div className="me-2"> May 6 at 12:00am</div>
                      <div className="ms-2">|</div>
                    </div>
                  </div>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="fw-bold me-1">Due</div>
                      <div className="me-2">May 13 at 11:59pm</div>
                      <div className="ms-2 me-2">|</div>
                      <div className="ms-2">100pts</div>
                    </div>
                  </div>
                </div>
                <ControlButtons /> 
              </div>

            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="wd-assignment-flex-row-container">
                <BsGripVertical className="me-2 fs-3" />
                <TfiWrite className="me-3 fs-3 text-success" />
                <div className="wd-assignment-flex-col-container">
                  <Link href="/courses/1234/assignments/124"
                        className="wd-assignment-link mb-0 text-decoration-none text-black" >
                        A2
                  </Link>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="text-danger me-2">Multiple Modules</div>
                      <div className="me-2 ms-2">|</div>
                      <div className="ms-2 me-1 fw-bold">Not available until</div>
                      <div className="me-2"> May 13 at 12:00am</div>
                      <div className="ms-2">|</div>
                    </div>
                  </div>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="fw-bold me-1">Due</div>
                      <div className="me-2">May 20 at 11:59pm</div>
                      <div className="ms-2 me-2">|</div>
                      <div className="ms-2">100pts</div>
                    </div>
                  </div>
                </div>
                <ControlButtons /> 
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1">
              <div className="wd-assignment-flex-row-container">
                <BsGripVertical className="me-2 fs-3" />
                <TfiWrite className="me-3 fs-3 text-success" />
                <div className="wd-assignment-flex-col-container">
                  <Link href="/courses/1234/assignments/125"
                        className="wd-assignment-link mb-0 text-decoration-none text-black" >
                        A3
                  </Link>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="text-danger me-2">Multiple Modules</div>
                      <div className="me-2 ms-2">|</div>
                      <div className="ms-2 me-1 fw-bold">Not available until</div>
                      <div className="me-2"> May 20 at 12:00am</div>
                      <div className="ms-2">|</div>
                    </div>
                  </div>
                  <div className="assignment-item-text">
                    <div className="wd-assignment-flex-row-container">
                      <div className="fw-bold me-1">Due</div>
                      <div className="me-2">May 27 at 11:59pm</div>
                      <div className="ms-2 me-2">|</div>
                      <div className="ms-2">100pts</div>
                    </div>
                  </div>
                </div>
                <ControlButtons /> 
              </div>
            </ListGroupItem>
          </ListGroup>

        </ListGroupItem>
      </ListGroup>
    </div> 
);} 