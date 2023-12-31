import React from "react";
import SidebarItems from "../SidebarItems";

const StudentSidebar = () => {
  // required variables for sidebaritems
  const path = "/student/dashboard";
  const className =
    "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700 group";
  const imgClassName =
    "w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white";

  const sidebarItems = [
    {
      title: "Dashboard",
      url: path,
      className: className,
      img: {
        src: "/images/dashboard.png",
        className: imgClassName,
      },
    },
    {
      title: "Classrooms",
      url: `${path}/classrooms`,
      className: className,
      img: {
        src: "/images/blackboard.png",
        className: imgClassName,
      },
    },
    // {
    //   title: "Students",
    //   url: `${path}/students`,
    //   className: className,
    //   img: {
    //     src: "/images/audience.png",
    //     className: imgClassName,
    //   },
    // },
    // {
    //   title: "Products",
    //   url: `${path}`,
    //   className: className,
    //   img: {
    //     src: "/images/dashboard.png",
    //     className: imgClassName,
    //   },
    // },
  ];

  return (
    <>
      <button
        data-drawer-target="separator-sidebar"
        data-drawer-toggle="separator-sidebar"
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-green-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="separator-sidebar"
        className="fixed top-0 md:top-auto left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-green-50 dark:bg-green-800">
          <ul className="space-y-2 font-medium">
            {sidebarItems.map((items, index) => {
              const { title, url, className, img } = items;
              return (
                <li key={index}>
                  <SidebarItems
                    title={title}
                    url={url}
                    className={className}
                    img={img}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default StudentSidebar;
