import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchRequestedData } from "../../helpers/FetchData";
import { modifyTeacherUrl } from "../../helpers/HandleURL";
import StudyMaterialCard from "../StudyMaterialCards/StudyMAterialCard";
import NotesShowCard from "../StudyMaterialCards/NotesShowCard";
import { initTabs, initModals } from "flowbite";
import EmptyItemsComp from "../EmptyItemsComp";

const StudyMaterial = () => {
  const { classroomId } = useParams();
  const modalRef = useRef();
  const [lectures, setLectures] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false); //incase a new material is added we need refetching of study material from the database

  const fetchStudyMaterial = async () => {
    const url = modifyTeacherUrl(`study_material/${classroomId}`);
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    };
    const studyMaterial = await fetchRequestedData(url, "GET", headers);
    // console.log(studyMaterial);
    if (studyMaterial && studyMaterial.success && studyMaterial.studyMaterial.length != 0) {
      setLectures(studyMaterial.studyMaterial[0].video_links);
      setNotes(studyMaterial.studyMaterial[0].notes_links);
    }
  };

  const openMaterialAddModal = () => {
    modalRef.current.click();
  };

  const addStudyMaterial = async (event) => {
    event.preventDefault();
    setLoading(true);

    const addMatBut = document.getElementsByClassName("add-study-material")[0];
    addMatBut.setAttribute("disabled", true);

    const url = modifyTeacherUrl(`study_material/${classroomId}`);
    const form = event.target;
    const formData = new FormData(form);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "auth-token": localStorage.getItem("authToken"),
      },
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      setReload(true);
    } else {
      console.log("Some error occurred!!");
    }
    setLoading(false);
    addMatBut.removeAttribute("disabled");
  };

  useEffect(() => {
    initTabs();
    initModals();

    fetchStudyMaterial();
  }, [reload]);
  return (
    <>
      <button
        type="button"
        className="add-study-material flex justify-center items-center fixed z-0 right-2 text-center px-5 py-3 bg-white border border-green-900 text-green-900 rounded-full  hover:bg-green-900 hover:text-white font-Young-Serif overflow-hidden transition-colors duration-300"
        onClick={openMaterialAddModal}
      >
        {!loading && <span className="material-symbols-outlined">add</span>}
        {!loading && "Study Material"}
        {loading && "Loading..."}
      </button>

      {/* Tabs for showing notes - videos and notes */}
      <div className="md:px-32 py-2 mt-10 md:mt-0">
        <h1 className="py-2 mb-4 text-center text-4xl font-Young-Serif font-bold">
          Study Materials
        </h1>
        <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
          <ul
            className="flex flex-wrap -mb-px text-sm font-medium text-center"
            id="default-tab"
            data-tabs-toggle="#default-tab-content"
            role="tablist"
          >
            <li className="mr-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2"
                id="video-tab"
                data-tabs-target="#video"
                type="button"
                role="tab"
                aria-controls="video"
                aria-selected="true"
              >
                Videos
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className="inline-block p-4 border-b-2 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                id="notes-tab"
                data-tabs-target="#notes"
                type="button"
                role="tab"
                aria-controls="notes"
                aria-selected="false"
              >
                Notes
              </button>
            </li>
          </ul>
        </div>
        <div id="default-tab-content">
          <div
            className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="video"
            role="tabpanel"
            aria-labelledby="video-tab"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {lectures.length == 0 && (
                <EmptyItemsComp
                  message={"No Lectures Added"}
                  subMessage={"No lectures added yet, please add to view."}
                />
              )}

              {lectures.length != 0 &&
                lectures.map((lecture) => {
                  return (
                    <StudyMaterialCard
                      key={Math.random() * 10000}
                      itemSource={`/material_uploads/${lecture.link}`}
                      itemName={lecture.title}
                    />
                  );
                })}
            </div>
          </div>
          <div
            className="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
            id="notes"
            role="tabpanel"
            aria-labelledby="notes-tab"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
              {notes.length == 0 && (
                <EmptyItemsComp
                  message={"No Notes Added"}
                  subMessage={"No notes added yet, please add to view."}
                />
              )}

              {notes.length != 0 &&
                notes.map((note) => {
                  return (
                    <NotesShowCard
                      key={Math.random() * 10000}
                      itemSource={`/material_uploads/${note.link}`}
                      itemName={note.title}
                      thumbnail={"/images/pdfthumbnail.webp"}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding a new Study Material */}
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
                Add Study Material
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

            <form onSubmit={addStudyMaterial}>
              <div className="p-6 space-y-6">
                <div className="mb-6">
                  <label
                    htmlFor="lecture-upload"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Lecture Title
                  </label>
                  <input
                    type="text"
                    id="lecture-upload"
                    name="videotitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="lecture-upload"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Recorded Lecture (.mp4, etc)
                  </label>
                  <input
                    type="file"
                    id="lecture-upload"
                    name="videolink"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="lecture-upload"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Notes Title
                  </label>
                  <input
                    type="text"
                    id="lecture-upload"
                    name="notestitle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="notes-upload"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Upload Notes PDF
                  </label>
                  <input
                    type="file"
                    id="notes-upload"
                    name="noteslink"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                    required
                  />
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="submit"
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition-colors duration-200"
                >
                  Add
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

export default StudyMaterial;
