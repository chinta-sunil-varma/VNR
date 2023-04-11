import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';


function BasicExample() {
  return (
    <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#home">Campus-Collab</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/app">Create Blog</Nav.Link>
        <Nav.Link href="/homepage">View Blogs</Nav.Link>
    
      </Nav>
    </Container>
  </Navbar>
  );
}

export default BasicExample;