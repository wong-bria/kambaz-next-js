import { Modal, Button } from "react-bootstrap"; 
export default function QuizEditor({ show, handleClose, dialogTitle, deleteQuiz,}: { 
 show: boolean; handleClose: () => void; dialogTitle: string;
 deleteQuiz: () => void; }) { 
 return ( 
  <Modal show={show} onHide={handleClose}> 
   <Modal.Header closeButton> 
    <Modal.Title>{dialogTitle}</Modal.Title> 
   </Modal.Header> 
   <Modal.Body> 
    Are you sure you want to delete this quiz?
   </Modal.Body> 
   <Modal.Footer> 
    <Button variant="secondary" onClick={handleClose}> Cancel </Button> 
    <Button variant="primary" 
     onClick={() => { 
      deleteQuiz(); 
      handleClose(); 
     }} > Delete Quiz </Button> 
   </Modal.Footer> 
  </Modal> 
);}