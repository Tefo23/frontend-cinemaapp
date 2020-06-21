import React, {Component}from 'react';
import {Redirect, Link } from 'react-router-dom';
import '../utils/css/stylex.css'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'react-bootstrap';


class NavbarTag extends Component{
  
  
  logoutuser=()=>{
    alert("User is logging logout")
    localStorage.removeItem("token")
  }

 render(){
  return(
    <React.Fragment>
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/" style={{marginLeft: "50px"}}>Movie Booking</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link href ='/allmovies'>Movies</Nav.Link>

    <Nav.Link href ='/mybookings'>My Tickets</Nav.Link>

    <Nav.Link href ='/login'>Login</Nav.Link>
    <Nav.Link href ='/signup'>SignUp</Nav.Link>
 
   <Nav.Link href ='/login' onClick={(e)=>this.logoutuser(e)}>Logout</Nav.Link>  
   
     
    </Nav>
   
  </Navbar.Collapse>
</Navbar>
    </React.Fragment>
  );
 }
    
  }



export default NavbarTag;