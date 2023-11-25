import React, { useEffect, useState } from 'react';
import CircleSpinner from '../CircleSpinner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/UserSlicer/UserSlicer';
import { Outlet } from 'react-router-dom';
import { fetchRequestedData } from '../../helpers/FetchData';
import { modifyStudentUrl } from '../../helpers/HandleURL';
import StudentSidebar from './StudentSidebar';

const StudentHome = () => {
  const [loading, setLoading] = useState(true);
  const [studentDet, setStudentDet] = useState({});
  const [teachers, setTeachers] = useState([]);
  const dispatch = useDispatch();



  const fetchStudentDetails = async () => {
    const url = modifyStudentUrl("");
    const result = await fetchRequestedData(url,
     "GET",
      {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken"),
      }
    );

    setStudentDet(result);

    // setting global state to be accessed by other components such as Navbar for showing credentials
    dispatch(setUser({
      authToken: JSON.stringify(localStorage.getItem("authToken")),
      name: result.student.name,
      email: result.student.email,
    }))

    document.title = `${result.student.name} - Dashboard`;

  }

  const fetchTeachers = async () => {
    const url = modifyStudentUrl("teachers");
    const teachersEnrolled = await fetchRequestedData(url, "GET", {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    });

    setTeachers(teachersEnrolled);
    setLoading(false);
  }

  useEffect(() => {
    fetchStudentDetails();
    fetchTeachers();

  }, [])

  return (
    <div className="flex">
      <div className="sidebar-component absolute md:relative md:w-64">
        <StudentSidebar />
      </div>
      <div className="md:block w-full md:relative right-0 px-1 py-2">
        {loading && <CircleSpinner />}
        {!loading && <Outlet
          context={{
            totalClassrooms: studentDet.student.classrooms ? studentDet.student.classrooms : [],
            teachersEnrolled: teachers.teacher? teachers.teacher : [],
          }} />}
      </div>
    </div>
  )
}

export default StudentHome
