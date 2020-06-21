import React, {Component} from 'react'
import { 
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row, Label, Input} 
  from 'reactstrap';

import { Redirect, Link } from 'react-router-dom'

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


import AddMovie from './AddMovie'
import '../utils/css/stylex.css'
import axios from 'axios'

class MoviesED extends Component{
  
  //default state of this component
  constructor(){
    super();
    this.state = {
      movies : [],
      movieName: '',
      avaiableSeats: '',
      timing:''
    }
  }

  componentDidMount(){
    axios.get(`https://arcane-atoll-15973.herokuapp.com/movie`).then((res)=>{
        this.setState({
          movies: res.data
        })
        console.log(this.state.movies)
      }).catch((err)=>{
        console.log(err)
      })  
  }

  //edit method
  //movies
  edit(e, val){

    e.preventDefault()

    // Movie object 
    let movie={
      movieName : this.state.movieName,
      avaiableSeats: this.state.avaiableSeats,
      timing : this.state.timing
    }
    
    //Edit movie api called here.
    axios.patch(`https://arcane-atoll-15973.herokuapp.com/movie/edit/${val}`, movie, {
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      console.log(res.data)
      alert("Successfully! Modified...")
      window.location.reload()

    }).catch((err)=>{
      alert("Something is worng...")
    })  
    
  }


  // delete the apartment
  del(e, val){
    // alert(val)
    e.preventDefault()

    //delete movie api called here.
    axios.delete(`https://arcane-atoll-15973.herokuapp.com/movie/del/${val}`, '', {
      headers: {

          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
      console.log(res.data)
      alert("Successfully! Deleted the Movie...")
      window.location.reload()

    }).catch((err)=>{
      alert("Something is wrong...")
    })  
  }
  
  //logoutadmin method
  logoutadmin=(e)=>{
      e.preventDefault()

      localStorage.removeItem("admintoken")
      alert("Admin is logging out...")
      window.location.reload();
      // return <Redirect to = '/adminLogin' />
  }

  componentDidUpdate(){

    if(!localStorage.getItem("admintoken")){
      return <Redirect to = '/adminLogin' />
    }

  }

  render(){

        // check whether admin is already login or not ....
      if(!localStorage.getItem("admintoken")){
          return <Redirect to = '/adminLogin' />
        }
    

    return(
      <div>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/" style={{marginLeft: "50px"}}>Movie Booking App (Admin Panel)</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
       <Nav className="mr-auto">

   <Nav.Link href ='/adminLogin' onClick={(e)=>this.logoutadmin(e)}>Logout</Nav.Link>  
   
     
    </Nav>
   
  </Navbar.Collapse>
</Navbar>

        <div className="container">
      
        <Row style={{marginTop:"20px"}}>
          <Col lg={4}>
            <h5>Add Movies</h5>
            <AddMovie /> 
          </Col>
        </Row>
      
        <h5>Movies Records</h5>
        {/* <p>Note: All the fields must be retype...</p> */}
          <Row style={{ marginTop: '30px'}}>
          
        {
          
          this.state.movies && this.state.movies.map((m)=>{
            return(
            <Col sm={3}>
              <Card style={{marginBottom: "10px"}}>
                <CardImg top width="100%" src={`https://arcane-atoll-15973.herokuapp.com/${m.image}`} style={{height: "150px", }} alt="Card image cap" />
                <CardBody>
                <Label>Movie Name</Label>
                <Input type="text" id ='movieName' placeholder="Enter Movie Name" placeholder={m.movieName} defaultValue={m.movieName} onChange={(e)=>this.setState({movieName: e.target.value})} />

                <Label>Total Seats</Label>
                <Input type="number" placeholder="Enter Total Seats " id ='availableSeats' placeholder={m.avaiableSeats} defaultValue={m.avaiableSeats}
                onChange={(e)=>this.setState({avaiableSeats: e.target.value})} />

                <Label>Timing Slot</Label>
                <Input type="text" placeholder="9:00Am-12:00Am" id ='timing'
                placeholder={m.timing} defaultValue={m.timing}
                onChange={(e)=>this.setState({timing: e.target.value})}
                /> 

                <div style={{display: 'flex', margin: "3px"}}>
                <Button onClick={(e)=>this.edit(e, m._id)}>Edit</Button>
                <Button onClick={(e)=>this.del(e, m._id)}>Delete</Button>
                </div>
                
                </CardBody>
              </Card>
              </Col>
            
              )   
          })
        }
        </Row>
        </div>
          
      </div>
  )
}}
export default MoviesED