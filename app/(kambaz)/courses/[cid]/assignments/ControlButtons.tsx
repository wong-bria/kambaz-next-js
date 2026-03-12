import { IoEllipsisVertical } from "react-icons/io5"; 
import GreenCheckmark from "../modules/GreenCheckmark"; 
import { FaTrash } from "react-icons/fa"; 
import { useState } from "react";
import DeleteAssignmentDialog from "./assignmenteditor";


export default function ControlButtons(
  { isStudent, assignmentID, deleteAssignment }: 
  {isStudent: boolean, assignmentID: string, deleteAssignment: (assignmentID: string) => void}
) { 

  const [show, setShow] = useState(false); 
  const [selectedAssignment, setSelectedAssignment] = useState("");
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  return ( 
    <div className="float-end"> 
      <GreenCheckmark /> 
      <IoEllipsisVertical className="ms-4 fs-4" /> 
      <FaTrash style={{ cursor: "pointer" }} className="text-danger ms-4 me-2 mb-1" 
        onClick={() => {
          if (isStudent) return;
          setSelectedAssignment(assignmentID);
          handleShow();
        }}/>

      <DeleteAssignmentDialog
        show={show}
        handleClose={handleClose}
        dialogTitle="Delete Assignment"
        deleteAssignment={() => deleteAssignment(selectedAssignment)}
      />
    </div> 
);}