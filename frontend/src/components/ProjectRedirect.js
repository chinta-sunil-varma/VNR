import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Row, Col,Container, Fade, Button, ListGroup, Badge } from 'react-bootstrap';

function ProjectRedirect() {
    const navigate =useNavigate()
  return (
    <>
    <ListGroup.Item className='navList' onClick={()=> navigate('/home')}>
    <i className='fas fa-project-diagram'></i>
            {' '}
            Project Manager
    </ListGroup.Item> 
    

    </>
    
  )
}

export default ProjectRedirect