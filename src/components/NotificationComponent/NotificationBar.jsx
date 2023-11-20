import React, { useState } from "react";


/*
    Notifications : 
    1. New Student Joining Requests
    2. New Chat when chat component added
*/



const NotificationBar = () => {
    const [hasNotifications, setHasNotifications] = useState(false);
    // const [loading, setLoading] = useState(false);

    const loadNotifications = ()=> {
        console.log("load notifications");
    }

  return (
    <>
      <button
        id="dropdownNotificationButton"
        data-dropdown-toggle="dropdownNotification"
        className="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
        type="button"
        onClick={loadNotifications}
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 14 20"
        >
          <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
        </svg>
        <div className="relative flex">
          <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-3 dark:border-gray-900"></div>
        </div>
      </button>

      {/* <!-- Dropdown menu --> */}
      <div
        id="dropdownNotification"
        className="z-80 hidden w-full max-w-sm border border-green-200 bg-white divide-y divide-green-100 rounded-lg shadow dark:bg-gray-800 dark:divide-gray-700"
        aria-labelledby="dropdownNotificationButton"
      >
        <div className="block px-4 py-2 font-medium text-center text-green-700 rounded-t-lg bg-green-50 dark:bg-gray-800 dark:text-white">
          Notifications
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {!hasNotifications && <div className="h-64 flex justify-center items-center">
                <span className="font-semibold text-gray-500 text-md">No Notifications</span> 
            </div>}
        </div>
        {/* <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white">
                    <div className="inline-flex items-center ">
                        <svg className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        View all
                    </div>
                </a> */}
      </div>
    </>
  );
};

export default NotificationBar;
