import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoute({Component, type}) {
    const [allow, setAllow] = useState(false);
    const nav = useNavigate();
    useEffect(() => {
      if(!localStorage.getItem("authToken")){
            const url = `/${type}/login`;
            nav(url);
      } else {
        setAllow(true);
      }
    }, [])
    
  return (
    
    <>
      {allow && <Component/>}
    </>
    
  )
}

export default ProtectedRoute
