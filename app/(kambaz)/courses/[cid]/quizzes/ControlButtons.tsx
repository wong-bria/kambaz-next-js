import { IoEllipsisVertical } from "react-icons/io5"; 
import GreenCheckmark from "../modules/GreenCheckmark"; 
import { CiNoWaitingSign } from "react-icons/ci";
import { useState } from "react";
import DeleteQuizDialog from "./quizeditor";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function ControlButtons(
  { isStudent, quizID, deleteQuiz, published, togglePublish }: 
  {isStudent: boolean, quizID: string, deleteQuiz: (quizID: string) => void, published: boolean, togglePublish: () => void}
) { 

  const { cid } = useParams();
  const [show, setShow] = useState(false); 
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true);
  const [menuOpen, setMenuOpen] = useState(false);

  return ( 
    
    <div className="d-flex align-items-center float-end"> 
      <div
        style={{ cursor: !isStudent ? "pointer" : "default" }}
        onClick={() => {
          if (isStudent) return;
          togglePublish();
        }}
      >
        {published ? (
          <GreenCheckmark />
        ) : (
          <CiNoWaitingSign className="text-danger" />
        )}
      </div>

      <IoEllipsisVertical style={{ cursor: !isStudent ? "pointer" : "default" }}
                          className="ms-4 fs-4"
        onClick={() => setMenuOpen((prev) => !prev)}/> 
      {!isStudent && menuOpen && (
        <div  className="position-absolute bg-white border rounded shadow-sm"
              style={{ right: 0, zIndex: 1000, minWidth: "150px" }}>
          <Link href={`/courses/${cid}/quizzes/${quizID}`}
                            className="wd-assignment-link mb-0 text-decoration-none text-black">
                <div  className="dropdown-item p-2"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setMenuOpen(false);
                }}>
              Edit
            </div>
          </Link>

          <div  className="dropdown-item p-2 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  if (isStudent) return;
                  setSelectedQuiz(quizID);
                  handleShow();
                  setMenuOpen(false);
                }}>
            Delete
          </div>

          <div
            className="dropdown-item p-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (isStudent) return;
              togglePublish();
              setMenuOpen(false);
            }}
          >
            {published ? "Unpublish" : "Publish"}
          </div>

          <div className="dropdown-item p-2">
            Copy
          </div>

          <div className="dropdown-item p-2">
            Sort
          </div>
        </div>
      )}


      <DeleteQuizDialog
        show={show}
        handleClose={handleClose}
        dialogTitle="Delete Quiz"
        deleteQuiz={() => deleteQuiz(selectedQuiz)}
      />
    </div> 
);}