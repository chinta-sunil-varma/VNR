import React from 'react'
import { useNavigate } from "react-router-dom";
import '../stylesheets/landing.css'

function Landing() {
    const navigate = useNavigate();
  return (
    <>
        <div className='background'>
        
        <p className='welcome'>Welcome to CampusCollab - a collaborative platform for students at CBIT to connect,<br/>
         share their skills, and work on projects together.</p>
         <button type="submit" className='signin' onClick={()=>navigate('/login')}>Signin</button>
        </div>
        
        
    </>
    
  )
}

export default Landing