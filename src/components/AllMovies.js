import  React, {Component} from 'react'
import NavbarTag from './NavbarTag'
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';
import {Redirect, Link } from 'react-router-dom';


class AllMovies extends Component{
 
  //state
  constructor(){
    super();
    this.state = {
      movies : []
    }
  }

  //get all the movies 
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
  bookNow=(val)=>{
    if(localStorage.getItem("token")){
        // alert("Movie Booking Proceeding...") 
        // api route /movie/book/:id 
        axios.post(`https://arcane-atoll-15973.herokuapp.com/movie/book/${val}`, '' , {
          headers: {
              'Authorization': localStorage.getItem("token"),
              'Accept' : 'application/json',
              'Content-Type': 'application/json'
          }
      }).then((res)=>{
          console.log(res.data)
          alert("Successfully! Booked...")
          window.location.reload()
        }).catch((err)=>{
          // alert("Something is wrong...")
        }) 
    }
    else{
      alert("You must have to be logged in...")
      // return(<Redirect to = '/login' />) 
      }
  }
  
  render(){
    return(
      <div>
      
      <NavbarTag />
       <Row style={{marginLeft: '60px', marginTop: '30px'}}>
        {
          this.state.movies && this.state.movies.map((m)=>{
            return(
              
            <Col sm={3}>
              <Card>
                <CardImg top width="100%" src={`https://arcane-atoll-15973.herokuapp.com/${m.image}`} style={{height: "200px", }} alt="Card image cap" />
                <CardBody>
                    <CardTitle>Movie Name : {m.movieName}</CardTitle>
                    <CardSubtitle>Timing : {m.timing}</CardSubtitle>
                    <CardText>Available Seats : {m.avaiableSeats}</CardText>  
                  <Button onClick={()=>this.bookNow(m._id)}>Book Now</Button>
                </CardBody>
              </Card>
              </Col>
            
              )   
          })
        }
        </Row>
      </div>
    )
  }
}

export default AllMovies