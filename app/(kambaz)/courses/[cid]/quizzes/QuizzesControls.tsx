import { Button, InputGroup, FormControl } from "react-bootstrap"; 
import Link from "next/link";
import { FaPlus } from "react-icons/fa6"; 
import { TfiSearch } from "react-icons/tfi";
import InputGroupText from 'react-bootstrap/InputGroupText';
import { VscKebabVertical } from "react-icons/vsc";

export default function QuizzesControls({ isStudent, cid }: { isStudent: boolean, cid: string }) { 
 return ( 
   <div id="wd-modules-controls" className="text-nowrap"> 
      <Button variant="secondary" size="lg" className="me-1 float-end " id="wd-add-quiz-group"> 
        <VscKebabVertical  />
      </Button>

      <Link href={`/courses/${cid}/quizzes/new/edit`}>
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-quiz"
                disabled={isStudent}> 
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} /> 
          Quiz 
        </Button>
      </Link>

      <InputGroup className="mb-3" style={{ maxWidth: "280px" }}> 
            <InputGroupText className="border-end-0 bg-white">
              <TfiSearch />
            </InputGroupText> 
            <FormControl className="border-start-0" id="wd-search-quiz" placeholder="Search..."/> 
      </InputGroup> 
      
      <hr className="mt-5" />
   </div> 
);} 
