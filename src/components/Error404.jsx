import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Error404() {
  const nav = useNavigate();
  useEffect(() => {
    document.title = "Oops... Page Not Found"
  }, [])
  
  const goBackToHome = ()=>{
    nav("/");
  }
  return (
    <div className="container flex flex-col justify-center items-center">
        <img src="./src/assets/404.avif" alt="404 Not Found" className="h-96" />
        <button className="transition-all px-3 py-2 w-60 my-10 bg-gradient-to-r from-green-400 via green-500 via green-600 via green-700 to-green-800 text-white rounded-3xl font-semibold text-2xl hover:bg-gradient-to-r hover:from-green-800 hover:via green-700 hover:via green-600 hover:via green-500 hover:to-green-400 active:bg-gradient-to-b active:from-green-700 active:via green-600 active:via green-500 active:to-green-400 ease-in-out" onClick={goBackToHome}>Go to home</button>
    </div>
  )
}

export default Error404
