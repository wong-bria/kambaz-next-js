"use client";

import Link from "next/link"; 
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() { 
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    "Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"
  ]; 

  return ( 
    <div id="wd-courses-navigation"  className="wd list-group fs-5 rounded-0"> 
      <Link href={`/courses/${cid}/home`} id="wd-course-home-link"
            className={`list-group-item border-0 
            ${pathname.includes("home") ? "active": "text-danger"}`}>
        Home
      </Link> 
      <Link href={`/courses/${cid}/modules`} id="wd-course-modules-link"
            className={`list-group-item border-0 
            ${pathname.includes("modules") ? "active": "text-danger"}`}>
        Modules 
      </Link> 
      <Link href={`/courses/${cid}/piazza`} id="wd-course-piazza-link"
            className={`list-group-item border-0 
            ${pathname.includes("piazza") ? "active": "text-danger"}`}>
        Piazza</Link>
      <Link href={`/courses/${cid}/zoom`} id="wd-course-zoom-link"
            className={`list-group-item border-0 
            ${pathname.includes("zoom") ? "active": "text-danger"}`}>
        Zoom
      </Link> 
      <Link href={`/courses/${cid}/assignments`} id="wd-course-assignments-link"
            className={`list-group-item border-0 
            ${pathname.includes("assignments") ? "active": "text-danger"}`}>
        Assignments
      </Link>
      <Link href={`/courses/${cid}/quizzes`} id="wd-course-quizzes-link"
            className={`list-group-item border-0 
            ${pathname.includes("quizzes") ? "active": "text-danger"}`}>
        Quizzes 
      </Link>
      <Link href={`/courses/${cid}/projects`} id="wd-course-projects-link"
            className={`list-group-item border-0 
            ${pathname.includes("projects") ? "active": "text-danger"}`}>
        Projects 
      </Link>
      <Link href={`/courses/${cid}/exams`} id="wd-course-exams-link"
            className={`list-group-item border-0 
            ${pathname.includes("exams") ? "active": "text-danger"}`}>
        Exams 
      </Link>
      <Link href={`/courses/${cid}/grades`} id="wd-course-grades-link"
            className={`list-group-item border-0 
            ${pathname.includes("grades") ? "active": "text-danger"}`}>
        Grades
      </Link>
      <Link href={`/courses/${cid}/people/table`} id="wd-course-people-link"
            className={`list-group-item border-0 
            ${pathname.includes("people") ? "active": "text-danger"}`}>
        People
      </Link>
    </div> 
  );} 