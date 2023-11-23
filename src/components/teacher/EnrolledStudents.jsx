import React from "react";
import { useEffect, useState, useRef } from "react";
import { fetchRequestedData } from "../../helpers/FetchData";
import { modifyTeacherUrl } from "../../helpers/HandleURL";
import EmptyItemsComp from "../EmptyItemsComp";
import Search from "./Search";

const EnrolledStudents = () => {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const filteredStudents = useRef([]);

  const fetchEnrolledStudents = async () => {
    const url = modifyTeacherUrl("students");
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    };

    const studentsEnrolled = await fetchRequestedData(url, "GET", headers);

    filteredStudents.current = studentsEnrolled.students;
    setEnrolledStudents(studentsEnrolled.students);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return (
    <>
      <div className="search-box fixed z-0 right-2 overflow-hidden">
        <Search
          enrolledStudents={
            filteredStudents.current != 0 ? filteredStudents.current : []
          }
          setEnrolledStudents={setEnrolledStudents}
        />
      </div>

      {enrolledStudents.length == 0 && (
        <EmptyItemsComp
          message={"No Students in the list"}
          subMessage={
            "No Students enrolled right now. Kindly enroll students to view above."
          }
        />
      )}

      {enrolledStudents.length != 0 && (
        <div className="mt-20 md:mt-0 mb-5 p-2">
          <h1 className="text-center text-6xl my-2 font-bold font-Young-Serif">
            Students
          </h1>
          <ul className="students-list w-full list-none p-2">
            {enrolledStudents.map((student) => {
              return (
                <li key={student._id} classroom="student-detail-card">
                  <div className="student-name block w-full md:w-[700px] m-2 px-5 py-2 bg-white border border-green-200 rounded-lg shadow mx-auto hover:bg-green-100 cursor-pointer dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700">
                    <div className="primary-student-details flex justify-between">
                      <h5 className="mb-1 text-start text-xl font-bold tracking-wide text-gray-900 hover:text-green-600 dark:text-white">
                        {student.name}
                      </h5>
                      <span className="student-rollno block  my-auto font-normal text-end text-gray-800 hover:text-green-600">
                        <b>Roll No : </b>
                        {student.rollno}
                      </span>
                    </div>

                    <span className="student-email block mb-3 font-light tracking-tight text-gray-700 hover:text-green-600 dark:text-gray-400">
                      {student.email}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default EnrolledStudents;
