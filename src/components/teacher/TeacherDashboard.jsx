import React from 'react'
import { useOutletContext } from 'react-router-dom';

const TeacherDashboard = () => {
    const { totalClassrooms, studentsEnrolled } = useOutletContext();
    
    return (
        <div className="dashboard">
            <h1 className="py-2 px-20 text-center text-4xl font-bold">Personalized Dashboard</h1>
            <div className="container p-10 md:p-16 grid grid-rows-1 md:grid-cols-2 gap-20">
                <div className="block max-w-sm w-60 font-Young-Serif p-5 border border-green-500 rounded-lg hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-xl text-center font-semibold tracking-tight text-green-900 dark:text-white">Total Students</h5>
                    <p className="font-semibold text-4xl text-center text-green-900 dark:text-green-400">{studentsEnrolled.length}</p>
                </div>
                <div className="block max-w-sm w-60 font-Young-Serif p-5 border border-green-500 rounded-lg hover:bg-green-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-xl text-center font-semibold tracking-tight text-green-900 dark:text-white">Total Classrooms</h5>
                    <p className="font-semibold text-4xl text-center text-green-900 dark:text-green-400">{totalClassrooms.length}</p>
                </div>

            </div>
        </div>
    )
}

export default TeacherDashboard
