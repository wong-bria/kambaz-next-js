"use client";

import { useState, useEffect } from "react"; 
import * as client from "../../client"; 
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid"; 
import { FormControl } from "react-bootstrap";
import { setModules, addModule, editModule, updateModule, deleteModule } 
  from "./reducer"; 
import { useSelector, useDispatch } from "react-redux"; 
import { RootState } from "../../../store"; 

export default function Modules() { 
  // const { cid } = useParams();
  const params = useParams();
  const cid = Array.isArray(params.cid) ? params.cid[0] : params.cid;

  const [moduleName, setModuleName] = useState(""); 
  const { modules } = useSelector((state: RootState) => state.modulesReducer); 
  const dispatch = useDispatch(); 

  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any; 
  const role = (currentUser as any).role;
  const isStudent = role === "STUDENT";

  const fetchModules = async () => { 
    const modules = await client.findModulesForCourse(cid as string); 
    dispatch(setModules(modules)); 
  };

  const onCreateModuleForCourse = async () => { 
    if (!cid) return; 
    const newModule = { name: moduleName, course: cid }; 
    const module = await client.createModuleForCourse(cid, newModule); 
    dispatch(setModules([...modules, module])); 
  }; 

  const onRemoveModule = async (moduleId: string) => { 
    await client.deleteModule(moduleId); 
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId))); 
  }; 

  const onUpdateModule = async (module: any) => { 
    await client.updateModule(module); 
    const newModules = modules.map((m: any) => m._id === module._id ? module : m ); 
    dispatch(setModules(newModules)); 
  }; 

  useEffect(() => { 
    fetchModules(); 
  }, []);

  return ( 
    <div className="wd-modules"> 
      <ModulesControls isStudent={isStudent}
                       setModuleName={setModuleName}
                       moduleName={moduleName} 
                       addModule={onCreateModuleForCourse} /><br /><br /><br /><br />
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .map((module: any ) => (
            <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary"> 
              <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name} 
                  { module.editing && ( 
                    <FormControl className="w-50 d-inline-block" 
                          onChange={(e) => dispatch(
                                updateModule({ ...module, name: e.target.value }))
                                   } 
                          onKeyDown={(e) => { 
                            if (e.key === "Enter") { 
                              onUpdateModule({ ...module, editing: false });
                            } 
                          }} 
                          defaultValue={module.name}/> 
                  )}  
                  <ModuleControlButtons isStudent={isStudent}
                                        moduleId={module._id} 
                                        deleteModule={(moduleId) => { 
                                           onRemoveModule(moduleId) 
                                        }}  
                                        editModule={(moduleId) => dispatch(editModule(moduleId))}/> 
              </div> 
            {module.lessons && ( 
              <ListGroup className="wd-lessons rounded-0"> 
                {module.lessons.map((lesson: any) => ( 
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1"> 
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </ListGroupItem>
                   ))}</ListGroup>)}</ListGroupItem>
        ))}
      </ListGroup>
    </div> 
);}