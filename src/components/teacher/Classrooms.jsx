import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EmptyItemsComp from "../EmptyItemsComp";
import { useRef } from "react";
import { initModals } from "flowbite";
import { fetchRequestedData } from "../../helpers/FetchData";
import { modifyTeacherUrl } from "../../helpers/HandleURL";
import Cards from "../Cards";

const Classrooms = () => {
  const [classroomDetails, setClassroomDetails] = useState({
    classroomName: "",
    classroomLevel: "",
  });
  const [classrooms, setClassrooms] = useState([]);

  const modalRef = useRef();

  const updateClassroomDetails = (event) => {
    setClassroomDetails({
      ...classroomDetails,
      [event.target.name]: event.target.value,
    });
  };

  const openClassroomAdditionModal = () => {
    modalRef.current.click();
  };

  const createClassroom = async (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    };
    const body = {
      class_name: classroomDetails.classroomName,
      class_type: classroomDetails.classroomLevel,
    };

    const url = modifyTeacherUrl("classrooms");
    const result = await fetchRequestedData(url, "POST", headers, body);

    setClassrooms([...classrooms, result]);
    console.log(result);
  };

  const fetchAllClassrooms = async () => {
    const url = modifyTeacherUrl("classrooms");
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    };

    const result = await fetchRequestedData(url, "GET", headers);

    setClassrooms(result.classroom);
    console.log(classrooms);
  };

  useEffect(() => {
    // To make modals work : flowbite
    initModals();

    fetchAllClassrooms();
  }, []);

  return (
    <>
      <button
        type="button"
        className="add-classroom fixed z-0 right-2 text-center px-5 py-3 bg-white border border-green-900 text-green-900 rounded-full  hover:bg-green-900 hover:text-white font-Young-Serif overflow-hidden"
        onClick={openClassroomAdditionModal}
      >
        Add Classroom
      </button>

      {classrooms.length == 0 && (
        <EmptyItemsComp
          message={"No Classrooms"}
          subMessage={"Add classrooms to show here...."}
        />
      )}

      {classrooms.length != 0 && (
        <div className="mt-20 md:mt-0 mb-5 p-2">
          <h1 className="text-center text-4xl my-2 font-bold font-Young-Serif">
            Classrooms
          </h1>
          <ul className="classrooms-list w-full list-none p-2">
            {classrooms.map((classroom) => {
              return (
                <li key={classroom._id} className="">
                  <Cards
                    classroomId={classroom._id}
                    classroomName={classroom.class_name}
                    classroomLevel={classroom.class_type}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Modal for creating a new classroom */}
      {/* <!-- Modal toggle --> */}
      <button
        ref={modalRef}
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="hidden"
        type="button"
      ></button>

      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl text-center font-semibold text-gray-900 dark:text-white">
                Create a new classroom
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* <!-- Modal body --> */}

            <form onSubmit={createClassroom}>
              <div className="p-6 space-y-6">
                <div className="mb-6">
                  <label
                    htmlFor="classroom-name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Classrom Name
                  </label>
                  <input
                    type="text"
                    id="classroom-name"
                    name="classroomName"
                    value={classroomDetails.classroomName}
                    minLength={3}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="DBMS Class or Science Class"
                    onChange={updateClassroomDetails}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="classroom-level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <input
                    type="text"
                    id="classroom-level"
                    name="classroomLevel"
                    value={classroomDetails.classroomLevel}
                    minLength={2}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    placeholder="12th or 10th or Graduation - BCA, BTech, etc"
                    onChange={updateClassroomDetails}
                    required
                  />
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Create
                </button>

                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Classrooms;
