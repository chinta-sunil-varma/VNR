import React from 'react'
import '../stylesheets/navbar.css'
import { Row, Col,Container, Navbar, Nav, NavDropdown, Form, Image, Button, ListGroup, Offcanvas, InputGroup, Modal } from 'react-bootstrap';
import { UserContext } from '../App'
import { Paper } from '@mui/material';
import Home from './Home';
import ProjectRedirect from './ProjectRedirect';
import UserCard from './UserCard';
import '../stylesheets/usergallery.css'
import Profile from './Profile';

function Usergallery() {
  return (
    <>
        <Navbar expand="md" fixed="top"  className='userNav'>
        <Container fluid className="shadow-lg p-3 mb-5 bg-white rounded">
          <Navbar.Brand className='title' href="#home">CampusCollab</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggleBtn1'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navItems">
              <Nav.Link href=""><ProjectRedirect/></Nav.Link>   
              <Nav.Link href="#searchMembers"><Profile/></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className='users' >
        <UserCard/>
        <UserCard/>
        <UserCard/>
        <UserCard/>
        
        
      </div>
      
    </>
  )
}

export default Usergallery