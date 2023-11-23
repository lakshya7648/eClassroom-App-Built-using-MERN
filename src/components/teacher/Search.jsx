import React from 'react'

const Search = ({ enrolledStudents, setEnrolledStudents }) => {
    
    const getSearchBoxElement = () => {
        const searchExpandBox = document.getElementById("search-expand-box").childNodes[1];
        const searchInput = searchExpandBox.firstElementChild;

        return { searchExpandBox, searchInput }
    }

    const openSearchBox = () => {
        const { searchExpandBox, searchInput } = getSearchBoxElement();


        searchExpandBox.style.display = "block";
        searchExpandBox.style.width = "200px";
        searchInput.style.width = "200px";
        searchInput.style.transition = "width 400ms";

    }

    const closeSearchBox = () => {
        const { searchExpandBox, searchInput } = getSearchBoxElement();

        searchExpandBox.style.width = "0px";
        searchInput.style.width = "0px";
    }

    const searchForStudent = (event) => {
        const searchInputValue = event.target.value.toLowerCase();
        if (searchInputValue === "") {
            setEnrolledStudents(enrolledStudents);
        } else {
            const requiredStudent = enrolledStudents.filter((student) => { return student.name.toLowerCase() === searchInputValue });

            setEnrolledStudents(requiredStudent);
        }
    }

    return (
        <div id="search-expand-box" className="search-box flex px-4 py-3 rounded-lg bg-white text-green-600 border border-green-600 font-Young-Serif cursor-pointer items-center justify-center" onMouseOver={openSearchBox} onMouseLeave={closeSearchBox}>
            <span className="material-symbols-outlined">
                search
            </span>

            <div className="search-input block border-none w-0 focus:outline-none" style={{ transition: "width 400ms ease-in-out 0s" }}>
                {/* <input type="text" className="search-input bg-white focus:ring-0 px-2 py-0 outline-none border-none text-green-600 focus:outline-none transition ease-in-out duration-1000" style={{display:"none"}} placeholder="Enter Student Name"/> */}
                <input type="text" className="search-input inline-block w-0 bg-white focus:ring-0 px-2 py-0 outline-none border-none text-green-600 focus:outline-none" onChange={searchForStudent} placeholder="Enter Student Name" />
            </div>

            <span className="font-normal text-center text-lg" >Search</span>
        </div>
    )
}

export default Search
