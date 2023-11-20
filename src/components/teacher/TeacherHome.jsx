import React from 'react'
import { useEffect, useState } from 'react';
import CircleSpinner from '../CircleSpinner';
import { useDispatch } from 'react-redux';
import { setUser } from '../../state/UserSlicer/UserSlicer';
import { Link, Outlet } from 'react-router-dom';
import TSidebar from './TSidebar';
import { fetchRequestedData } from '../../helpers/FetchData';

const TeacherHome = () => {

  const [loading, setLoading] = useState(true);
  const [teacherDet, setTeacherDet] = useState({});
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();

  const url = "http://localhost:5000/api/teacher/";


  const fetchTeacherDetails = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("authToken"),
      }
    });
    const result = await response.json();
    console.log(result);
    setTeacherDet(result);

    // setting global state to be accessed by other components such as Navbar for showing credentials
    dispatch(setUser({
      authToken: JSON.stringify(localStorage.getItem("authToken")),
      name: result.user.name,
      email: result.user.email,
    }))

    document.title = `${result.user.name} - Dashboard`;

  }

  const fetchStudents = async () => {

    const studentsEnrolled = await fetchRequestedData(url + "students", "GET", {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    });

    setStudents(studentsEnrolled);
    setLoading(false);
  }

  useEffect(() => {
    fetchTeacherDetails();
    fetchStudents();

  }, [])

  return (
    <div className="flex">
      <div className="sidebar-component absolute md:relative md:w-64">
        <TSidebar />
      </div>
      <div className="md:block w-full md:relative right-0 px-1 py-2">
        {loading && <CircleSpinner />}
        {!loading && <Outlet
          context={{
            totalClassrooms: teacherDet.user.classrooms,
            studentsEnrolled: students.students,
          }} />}
      </div>
    </div>
  )
}

export default TeacherHome
