import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import { useNavigate } from 'react-router-dom';

function Navbarpage() {
    let navigate=useNavigate()
    let user=localStorage.getItem("user")
    let handlelogout=()=>{
      sessionStorage.clear()
      navigate('/')
    }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Navbar.Brand onClick={()=>navigate("/dashboard")}>E-Commerce</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link onClick={()=>navigate("/dashboard/cart")}>Cart</Nav.Link>
          <span style={{ marginTop: "10px",color:"green" }}>
            {user ? `Welcome ${user}` : "Welcome Guest"}
          </span>
          <Nav.Link onClick={handlelogout}>Logout</Nav.Link>
         
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navbarpage;
