import { Button, InputGroup, FormControl } from "react-bootstrap"; 
import { FaPlus } from "react-icons/fa6"; 
import { TfiSearch } from "react-icons/tfi";
import InputGroupText from 'react-bootstrap/InputGroupText';

export default function AssignmentsControls() { 
 return ( 
   <div id="wd-modules-controls" className="text-nowrap"> 
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment"> 
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> 
        Assignment 
      </Button>

      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group"> 
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> 
        Group 
      </Button>

      <InputGroup className="mb-3" style={{ maxWidth: "280px" }}> 
            <InputGroupText className="border-end-0 bg-white">
              <TfiSearch />
            </InputGroupText> 
            <FormControl className="border-start-0" id="wd-search-assignment" placeholder="Search..."/> 
      </InputGroup> 
   </div> 
);} 
