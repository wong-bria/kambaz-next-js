"use client";

import { ReactNode, useState, useEffect } from "react"; 
import CourseNavigation from "./navigation"; 
import { useSelector } from "react-redux"; 
import { useParams, useRouter } from "next/navigation"; 
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./breadcrumb";
 
export default function CoursesLayout({ children }: { children: ReactNode }) { 
  const { cid } = useParams(); 
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.coursesReducer); 
  const course = courses?.find((course: any) => course && course._id === cid); 

  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer) as any;

  if (!currentUser || !enrollments) {
    return null;
  }

  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser._id && e.course === cid
  );

  useEffect(() => {
    if (currentUser && !isEnrolled) {
      router.push("/dashboard");
    }
  }, [currentUser, isEnrolled, router]);

  const [showNav, setShowNav] = useState(true);

  const toggleNav = () => {
      setShowNav(!showNav);
  }

  if (!isEnrolled) return null;

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