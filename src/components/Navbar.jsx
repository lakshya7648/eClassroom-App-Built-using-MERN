import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { setType } from "../state/AuthType/authTypeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initFlowbite, initCollapses, initDropdowns } from 'flowbite';
import { removeUser } from '../state/UserSlicer/UserSlicer';
import NotificationBar from './NotificationComponent/NotificationBar';

function Navbar({ setProgress }) {

    const dispatch = useDispatch();
    const UserState = useSelector(state => state.User.user);
    const nav = useNavigate();

    const toTeacherLogin = () => {
        nav("/teacher/login");
    }

    const toStudentLogin = () => {
        nav("/student/login");
    }

    const handleLogout = () => {
        setProgress(30);

        localStorage.removeItem("authToken");
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        dispatch(removeUser());

        setProgress(100);

        nav(`/${localStorage.getItem("type")}/login`);
    }

    useEffect(() => {
        initFlowbite();
        initCollapses();
    }, [UserState])

    return (
        <>
            <nav className="md:backdrop-blur-md bg-white/30 dark:bg-gray-900  sticky w-full top-0 left-0 z-10 md:z-10 border-b border-gray-200 dark:border-gray-600 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center">
                        <span className="text-green-700 my-1 font-Young-Serif self-center text-4xl font-bold whitespace-nowrap dark:text-white">E Class</span>
                    </Link>
                    <div className="flex md:order-2 md:space-x-4">
                        {!UserState.authToken && <button type="button" className="student-login flex space-x-1 items-center text-white font-Young-Serif bg-gradient-to-tr from-red-400 via-red-500 to-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-red-600 dark:hover:bg-red-500 dark:focus:ring-red-800" onClick={toStudentLogin}>
                            <span>I'm a Student</span>
                            <span className="material-symbols-outlined">
                                login
                            </span>
                        </button>}

                        {!UserState.authToken && <button type="button" className="teacher-login flex space-x-1 items-center text-white font-Young-Serif bg-gradient-to-tr from-green-500 via-green-600 to-green-700  hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-500 dark:focus:ring-green-800" onClick={toTeacherLogin}>
                            <span>I'm a Teacher</span>
                            <span className="material-symbols-outlined">
                                login
                            </span>
                        </button>}



                        {UserState.authToken &&
                            <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-slate-900 bg-white hover:bg-white focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center dark:bg-white dark:hover:bg-white dark:focus:ring-white" type="button">{UserState.name} <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                            </button>}

                        {UserState.authToken && <div id="dropdownInformation" className="z-40 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{UserState.name}</div>
                                <div className="font-medium truncate">{UserState.email}</div>
                            </div>
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                <li>
                                    <Link to={`/${localStorage.getItem("type")}/dashboard`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                </li>
                            </ul>
                            <div className="py-2">
                                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                            </div>
                        </div>
                        }
                        {UserState.authToken && <NotificationBar />}


                        <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div id="navbar-sticky" className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" className="flex space-x-1 items-center text-2xl font-Young-Serif py-2 pl-3 pr-4 text-white bg-green-700 rounded md:bg-transparent md:text-gray-900 md:p-0 md:hover:text-green-700 md:dark:text-green-500" aria-current="page">
                                    <span className="material-symbols-outlined">
                                        home
                                    </span>
                                    <span>Home</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="/about" className="text-2xl font-Young-Serif flex space-x-1 items-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700  md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    <span className="material-symbols-outlined">
                                        groups
                                    </span>
                                    <span>About</span>
                                </Link>
                            </li>
                            <li >
                                <Link to="/contact" className="text-2xl font-Young-Serif flex space-x-1 items-center py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700  md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                    <span className="material-symbols-outlined">
                                        contact_support
                                    </span>
                                    <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
