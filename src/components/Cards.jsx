import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ classroomId, classroomName, classroomLevel }) => {

  return (

    <Link to={`/teacher/dashboard/classrooms/${classroomId}`} className="block w-full md:w-[600px] m-2 px-5 py-2 bg-white border border-green-200 rounded-lg shadow mx-auto hover:bg-green-100 hover:text-green-300 dark:border-green-700 dark:bg-green-800 dark:hover:bg-green-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-green-600 dark:text-white">{classroomName}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 hover:text-green-600">{classroomLevel}</p>
    </Link>

  )

}

export default Cards