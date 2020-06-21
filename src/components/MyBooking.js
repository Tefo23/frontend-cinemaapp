import  React, {Component} from 'react'
import NavbarTag from './NavbarTag'
import axios from 'axios'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Col, Row
} from 'reactstrap';
import {Redirect, Link } from 'react-router-dom';

class MyBooking extends Component{
 
  //state
  constructor(){
    super();
    this.state = {
     tickets : []
    }
  }

  //get all the movies 
  componentDidMount(){
    axios.get(`https://arcane-atoll-15973.herokuapp.com/mytickets`, {
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    }).then((res)=>{
        this.setState({
          tickets: res.data
        })
        console.log(this.state.tickets)
      }).catch((err)=>{
        console.log(err)
      })  
  }

  
  render(){
        // check whether admin is already login or not ....
        if(!localStorage.getItem("token")){
          return <Redirect to = '/login' />
        }
    
    return(
      <div>
      
      <NavbarTag />
      <div className="container">
        <h4>My Movie Tikets</h4>
      </div>
       <Row style={{marginLeft: '60px', marginTop: '30px'}}>
        {
          this.state.tickets && this.state.tickets.map((m)=>{
            return(
              
            <Col sm={3}>
              <Card>
            <h5>{`Ticket : ${m.movieName}`}</h5>
                <CardImg top width="100%" src={`https://arcane-atoll-15973.herokuapp.com/${m.image}`} style={{height: "200px", }} alt="Card image cap" />
                <CardBody>
                    <CardTitle>Movie Name : {m.movieName}</CardTitle>
                    <CardSubtitle>Timing : {m.timing}</CardSubtitle>
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

export default MyBooking