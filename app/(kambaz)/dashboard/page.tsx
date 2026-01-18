import Link from "next/link"; 
import Image from "next/image"; 
export default function Dashboard() { 
  return ( 
    <div id="wd-dashboard"> 
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr /> 
      <h2 id="wd-dashboard-published">Published Courses (10)</h2> <hr /> 
      <div id="wd-dashboard-courses"> 
        <div className="wd-dashboard-course"> 
          <Link href="/courses/1234" className="wd-dashboard-course-link">
           <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />  {/* Dashboard Title */}
            <div>                                                                      {/* Published Courses */}
              <h5> CS1234 React JS </h5>                                               {/* Course 1 */}
              <p className="wd-dashboard-course-title"> 
                Full Stack software developer 
              </p> 
              <button> Go </button> 
            </div> 
          </Link> 
        </div> 
        <div className="wd-dashboard-course"> 
          <Link href="/courses/2345" className="wd-dashboard-course-link">
            <Image src="/images/cpppicture.png" width={200} height={150} alt="c++" />
              <div>
                <h5> CS3520 c++ </h5>                                                   {/* Course 2 */}
                <p className="wd-dashboard-course-title"> 
                  Intro to c++
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div> 
        <div className="wd-dashboard-course"> 
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <Image src="/images/oodpicture.jfif" width={200} height={150} alt="doom" />
              <div>
                <h5> CS3500 OOD </h5>                                                   {/* Course 3 */}
                <p className="wd-dashboard-course-title"> 
                  Object Oriented Design 
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/4567" className="wd-dashboard-course-link">
            <Image src="/images/systemspicture.png" width={200} height={150} alt="c language" />
              <div>
                <h5> CS3650 Systems </h5>                                                   {/* Course 4 */}
                <p className="wd-dashboard-course-title"> 
                  Computer Systems 
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <Image src="/images/logicandcomppicture.jfif" width={200} height={150} alt="brain" />
              <div>
                <h5> CS2800 Logic </h5>                                                   {/* Course 5 */}
                <p className="wd-dashboard-course-title"> 
                  Logic and Computation
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/6789" className="wd-dashboard-course-link">
            <Image src="/images/fundies1.png" width={200} height={150} alt="racket" />
              <div>
                <h5> CS2500 Fundies 1 </h5>                                                   {/* Course 6 */}
                <p className="wd-dashboard-course-title"> 
                  Fundamentals 1
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/7890" className="wd-dashboard-course-link">
            <Image src="/images/fundies2.png" width={200} height={150} alt="java" />
              <div>
                <h5> CS2510 Fundies 2 </h5>                                                  {/* Course 7 */}
                <p className="wd-dashboard-course-title"> 
                  Fundamentals 2
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/8901" className="wd-dashboard-course-link">
            <Image src="/images/networkpicture.jfif" width={200} height={150} alt="Servers, clouds, routers" />
              <div>
                <h5> CS4700 Network </h5>                                                  {/* Course 8 */}
                <p className="wd-dashboard-course-title"> 
                  Network Fundamentals 
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/9012" className="wd-dashboard-course-link">
            <Image src="/images/datasciencepicture.jfif" width={200} height={150} alt="hand touching data science" />
              <div>
                <h5> DS3000 Data Science </h5>                                                  {/* Course 9 */}
                <p className="wd-dashboard-course-title"> 
                  Foundations of Data Science
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div>
        <div className="wd-dashboard-course"> 
          <Link href="/courses/1001" className="wd-dashboard-course-link">
            <Image src="/images/writingpicture.jfif" width={200} height={150} alt="person writing" />
              <div>
                <h5> ENGW1111 Writing </h5>                                                  {/* Course 10 */}
                <p className="wd-dashboard-course-title"> 
                  First Year Writing
                </p> 
                <button> Go </button>
              </div>
          </Link>
        </div> 
      </div> 
    </div> 
);}