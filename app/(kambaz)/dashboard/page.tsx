import Link from "next/link"; 
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button } from "react-bootstrap";
import * as db from "../database";

export default function Dashboard() { 
  const courses = db.courses;
  return ( 
    <div id="wd-dashboard"> 
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr /> 
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr /> 
      <div id="wd-dashboard-courses"> 

        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}> 
              <Card> 
              <Link href={`/courses/${course._id}/home`} 
                className="wd-dashboard-course-link text-decoration-none text-dark" > 
                <CardImg src={course.image} variant="top" width="100%" height={160} /> 
                <CardBody className="card-body"> 
                <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden"> 
                  {course.name} </CardTitle> 
                <CardText className="wd-dashboard-course-description overflow-hidden" style={{height:"100px"}}> 
                  {course.description} </CardText> 
                <Button variant="primary"> Go </Button> 
                </CardBody> 
              </Link> 
              </Card> 
            </Col>
          ))}
          {/* <Col className="wd-dashboard-course" style={{ width: "300px" }}> 
            <Card> 
              <Link href="/courses/1234/home" 
                    className="wd-dashboard-course-link text-decoration-none text-dark"> 
                <CardImg variant="top" src="/images/reactjs.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS1234 React JS</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Full Stack software developer
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody> 
              </Link> 
            </Card> 
          </Col> 

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/2345"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/cpppicture.png" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3520 C++</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Intro to C++
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card>
          </Col> 

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/3456"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/oodpicture.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3500 OOD</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Object Oriented Design
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card> 
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/4567"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/systemspicture.png" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS3650 Systems</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Computer Systems
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card> 
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/5678"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/logicandcomppicture.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2800 Logic</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Logic and Computation
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card> 
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/6789"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/fundies1.png" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2500 Fundies 1</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Fundamentals 1
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card> 
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/7890"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/fundies2.png" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS2510 Fundies 2</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Fundamentals 2
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/8901"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/networkpicture.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">CS4700 Network</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Network Fundamentals
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/9012"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/datasciencepicture.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">DS3000 Data Science</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    Foundations of Data Science
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card>
          </Col>

          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card> 
              <Link href="/courses/1001"
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                <CardImg variant="top" src="/images/writingpicture.jpg" width="100%" height={160}/> 
                <CardBody> 
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">ENGW1111 Writing</CardTitle> 
                  <CardText  className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}> 
                    First Year Writing
                  </CardText> 
                  <Button variant="primary">Go</Button> 
                </CardBody>
              </Link>
            </Card>
          </Col> */}
        </Row>
      </div> 
    </div> 
);}