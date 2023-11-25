import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import TeacherLogin from "./components/teacher/TeacherLogin";
import StudentLogin from "./components/student/StudentLogin";
import TopLoadingBar from "./components/TopLoadingBar";
import { useState } from "react";
import TeacherHome from "./components/teacher/TeacherHome";
import Alert from "./components/Alert";
import Classrooms from "./components/teacher/Classrooms";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import CircleSpinner from "./components/CircleSpinner";
import StudyMaterial from "./components/teacher/StudyMaterial";
import EnrolledStudents from "./components/teacher/EnrolledStudents";
import StudentHome from "./components/student/StudentHome";
import StudentDashboard from "./components/student/StudentDashboard";
import StudentClassrooms from "./components/student/StudentClassrooms";
import StdStudyMaterial from "./components/student/StdStudyMaterial";

function App() {
  const [progress, setProgress] = useState(0);
  // setting the alert
  const [status, setStatus] = useState(null);
  const setAlert = (textColor, bgColor, message) => {
    setStatus({
      textColor,
      bgColor,
      message,
    });
    setTimeout(() => {
      setStatus(null);
    }, 5000);
  };

  return (
    <>
      <Router>
        <Navbar setProgress={setProgress} />
        <TopLoadingBar progress={progress} setProgress={setProgress} />
        <Alert status={status} />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Teacher Part */}
          <Route
            path="/teacher/login"
            element={
              <TeacherLogin setProgress={setProgress} setAlert={setAlert} />
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              <ProtectedRoute Component={TeacherHome} type={"teacher"} />
            }
          >
            <Route
              path="/teacher/dashboard"
              loader={<CircleSpinner />}
              element={<ProtectedRoute Component={TeacherDashboard} />}
            />
            <Route
              path="/teacher/dashboard/classrooms"
              element={
                <ProtectedRoute Component={Classrooms} setAlert={setAlert} />
              }
            />
            <Route
              path="/teacher/dashboard/classrooms/:classroomId"
              element={<ProtectedRoute Component={StudyMaterial} />}
            />
            <Route
              path="/teacher/dashboard/students"
              element={<ProtectedRoute Component={EnrolledStudents} />}
            />
          </Route>

          {/* Student Part */}
          <Route path="/student/login" element={<StudentLogin setProgress={setProgress} setAlert={setAlert}/>} />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute Component={StudentHome} setAlert={setAlert} />
            }
          >
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute
                  Component={StudentDashboard}
                  setAlert={setAlert}
                />
              }
            />
            <Route
              path="/student/dashboard/classrooms"
              element={
                <ProtectedRoute
                  Component={StudentClassrooms}
                  setAlert={setAlert}
                />
              }
            />
            <Route
              path="/student/dashboard/classrooms/:classroomId"
              element={
                <ProtectedRoute
                  Component={StdStudyMaterial}
                  setAlert={setAlert}
                />
              }
            />
          </Route>

          {/* If someone enters url which does not exist */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
