import React from "react";
import { Link } from "react-router-dom";

const Cards = ({
  classroomId,
  urlTo,
  classroomName,
  classroomLevel,
  showCode,
  setAlert,
}) => {
  const copyClassroomCode = () => {
    navigator.clipboard.writeText(classroomId);
    setAlert(
      "text-green-900",
      "bg-green-200",
      "Classroom code copied, now you can share the code to the students"
    );
  };

  return (
    <div className="flex flex-col md:w-[600px] m-2 px-5 py-2 bg-white border border-green-200 rounded-lg shadow mx-auto hover:bg-green-100 hover:text-green-300 dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700">
      <Link to={urlTo}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-green-600 dark:text-white">
          {classroomName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-green-600">
          {classroomLevel}
        </p>
      </Link>
      {showCode && (
        <button
          className="px-3 py-1 bg-green-300 text-green-800 font-semibold text-sm rounded-lg hover:shadow-md hover:shadow-green-200 hover:drop-shadow-md transition-all"
          onClick={copyClassroomCode}
        >
          Share Classroom code
        </button>
      )}
    </div>
  );
};

export default Cards;
