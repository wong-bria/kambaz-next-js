import { IoEllipsisVertical } from "react-icons/io5"; 
import GreenCheckmark from "../modules/GreenCheckmark"; 

export default function ControlButtons() { 
  return ( 
    <div className="float-end"> 
      <GreenCheckmark /> 
      <IoEllipsisVertical className="ms-4 fs-4" /> 
    </div> 
);}