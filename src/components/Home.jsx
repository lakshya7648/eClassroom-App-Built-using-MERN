import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  

  const teacher = ()=>{
    nav("/teacher/login");
  }
  const student = ()=>{
    nav("/student/login");
  }

  useEffect(() => {
    document.title = "E-Class Learning Platform"
  }, [])

  return (
    <>
    <div className="w-full">
      <div className="w-full h-64 md:h-[500px] p-8 backdrop-blur-sm flex justify-center items-center">
        <div className="p-2 bg-transparent my-auto">
        <h1 className="text-center my-5 md:py-4 text-5xl md:text-7xl font-bold text-slate-900">Get Started</h1>
        <button type="button" className="p-2 w-20 md:w-32 outline-none box-border rounded-sm text-md md:text-xl text-white bg-gradient-to-tr from-green-500 via-green-600 to-green-700 transition-transform hover:scale-110 hover:-translate-y-1" onClick={student}>Student</button>
        <button type="button" className="p-2 w-20 md:w-32 outline-none box-border rounded-sm text-md md:text-xl text-red-700 border border-red-700 hover:bg-red-700 hover:text-white mx-4" onClick={teacher}>Teacher</button>
        </div>
        <div className="p-2 mx-10 bg-transparent my-auto hidden md:block">
          <img src="../gifs/6M8G.gif" className="w-20 h-20 hidden md:block md:w-80 md:h-80 rounded-full md:rounded-full" alt="education_gif" />
        </div>
      </div>
      <div className="w-full h-64 p-3 bg-gradient-to-br from-green-300 via-green-400 to-green-600 md:h-[500px] flex items-center justify-center flex-wrap space-x-2 md:space-x-10">
        <div>
          <h1 className="text-3xl font-extrabold mb-2 text-center md:text-left text-white w-64 md:text-5xl">Your Favorite Class In Your Home</h1>
        </div>
        <img src="./src/assets/pngwing.com.png" className="w-60 md:w-1/2" />
      </div>
      <div className="w-full h-64 mb-10 py-10 bg-white flex flex-wrap md:h-96 justify-center md:space-x-16 md:space-y-10">
          <img src="./src/assets/videos_home.png" className="w-1/3 my-2 mx-2"/>
          <div className="feature1 flex flex-col space-x-4">
            <h1 className="text-center my-4 text-xl text-gray-600 font-extrabold md:text-4xl">Class Recordings</h1>
            <p className="text-left w-52 md:w-96 text-gray-500 text-sm md:text-2xl">Be in Sync with your classes with class recordings feature. Class recording feature enables you to quick revise the concepts told by the teacher in online class. Available classes uploaded by your teacher will remain till you exist on this app.</p>
          </div>
      </div>
      <div className="w-full h-72 py-10 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-wrap md:h-[500px] justify-center md:space-x-16 md:space-y-10">
          <div className="feature1 flex flex-col space-x-4">
            <h1 className="text-center my-4 text-xl text-gray-800 font-extrabold md:text-4xl">Study Material</h1>
            <p className="text-left w-52 md:w-96 text-gray-700 text-sm md:text-2xl">No hectic task of creating your own notes, focus directly on studies with our available Study Material Feature. Teacher uploaded notes are more credible and a good resource of learning during exams</p>
          </div>
          <img src="./src/assets/notesimg.png" className="w-1/3 my-2 mx-2"/>
      </div>
      <div className="w-full p-10 md:p-32 bg-green-200 flex flex-wrap justify-between">
        <ul className="text-black font-semibold text-sm md:text-xl space-y-6">
          <li><Link to="/" className="hover:border-b-2 hover:border-b-black">Home</Link></li>
          <li><Link to="/about" className="hover:border-b-2 hover:border-b-black">About</Link></li>
          <li><Link to="/contact" className="hover:border-b-2 hover:border-b-black">Contact</Link></li>
        </ul>
        <p className = "text-xl md:text-2xl font-light text-black">All Rights Reserved</p>
      </div>
      </div>
    </>
  )
}

export default Home;