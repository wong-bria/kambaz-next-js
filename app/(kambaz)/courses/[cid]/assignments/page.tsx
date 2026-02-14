"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { TfiWrite } from "react-icons/tfi";
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControls"; 
import AssignmentControlButtons from "./AssignmentControlButtons";
import ControlButtons from "./ControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() { 
  const { cid } = useParams();
  const assignments = db.assignments.filter((assignment: any) => assignment.course === cid);
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
            {assignments.map((assignment: any) => (
              <ListGroupItem key={assignment._id}
                id="wd-assignment-list-item" 
                className="wd-assignment-list-item p-3 ps-1 align-items-center">
                  <div className="wd-assignment-flex-row-container">
                    <BsGripVertical className="me-2 fs-3" />
                    <TfiWrite className="me-3 fs-3 text-success" />
                    <div className="wd-assignment-flex-col-container">
                      <Link href={`/courses/${cid}/assignments/${assignment._id}`}
                            className="wd-assignment-link mb-0 text-decoration-none text-black" > 
                            {assignment.title}
                      </Link>
                      <div className="assignment-item-text">
                        <div className="wd-assignment-flex-row-container">
                          <div className="text-danger me-2">Multiple Modules</div>
                          <div className="me-2 ms-2">|</div>
                          <div className="ms-2 me-1 fw-bold">Not available until</div>
                          <div className="me-2">{assignment.available}</div>
                          <div className="ms-2">|</div>
                        </div>
                      </div>
                      <div className="assignment-item-text">
                        <div className="wd-assignment-flex-row-container">
                          <div className="fw-bold me-1">Due</div>
                          <div className="me-2">{assignment.due}</div>
                          <div className="ms-2 me-2">|</div>
                          <div className="ms-2">{assignment.points} pts</div>
                        </div>
                      </div>
                    </div>
                    <ControlButtons />
                  </div>
                </ListGroupItem>
            ))}
            </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div> 
);} 