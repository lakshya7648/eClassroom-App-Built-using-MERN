import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRequestedData } from "../../helpers/FetchData";
import { modifyStudentUrl } from "../../helpers/HandleURL";
import StudyMaterialCard from "../StudyMaterialCards/StudyMAterialCard";
import NotesShowCard from "../StudyMaterialCards/NotesShowCard";
import { initTabs } from "flowbite";
import EmptyItemsComp from "../EmptyItemsComp";


const StdStudyMaterial = () => {
  const { classroomId } = useParams();
  const [lectures, setLectures] = useState([]);
  const [notes, setNotes] = useState([]);


  const fetchStudyMaterial = async () => {
    const url = modifyStudentUrl(`study_material/${classroomId}`);
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("authToken"),
    };
    const studyMaterial = await fetchRequestedData(url, "GET", headers);
    console.log(studyMaterial);
    if (studyMaterial && studyMaterial.success && studyMaterial.study.length != 0) {
      setLectures(studyMaterial.study[0].video_links);
      setNotes(studyMaterial.study[0].notes_links);
    }
  };



  useEffect(() => {
    initTabs();

    fetchStudyMaterial();
  }, []);
  return (
    <>
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

    </>
  );
}

export default StdStudyMaterial
