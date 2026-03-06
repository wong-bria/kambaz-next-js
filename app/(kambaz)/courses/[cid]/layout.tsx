"use client";

import { ReactNode, useState } from "react"; 
import CourseNavigation from "./navigation"; 
import { useSelector } from "react-redux"; 
import { useParams } from "next/navigation"; 
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../database";
import Breadcrumb from "./breadcrumb";

// export default async function CoursesLayout( 
//   { children, params }: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) { 
//  const { cid } = await params; 
//  const course = courses.find((course) => course._id === cid); 
export default function CoursesLayout({ children }: { children: ReactNode }) { 
 const { cid } = useParams(); 
 const { courses } = useSelector((state: RootState) => state.coursesReducer); 
 const course = courses.find((course: any) => course._id === cid); 

 const [showNav, setShowNav] = useState(true);

 const toggleNav = () => {
    setShowNav(!showNav);
 }
 return ( 
    <div id="wd-courses">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1"
                          style={{ cursor: "pointer" }}
                          onClick={toggleNav} />
           {/* {course?.name} */}
          <Breadcrumb course={course} />
        </h2> <hr />
        <div className="d-flex">
          {/* <div className="d-none d-md-block"> */}
          <div className={`${showNav ? "d-none d-md-block" : "d-none"}`}>
            <CourseNavigation />
          </div>
          <div className="flex-fill">
            {children}
          </div>
        </div>
    </div>
);} 