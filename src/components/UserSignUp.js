import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input,Row, Col, FormText } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom'

import '../utils/css/AllStyles.css'
import NavbarTag from './NavbarTag'
import axios from 'axios'


class UserSignUp extends Component{
  constructor(){
    super();
    this.state = {
      username : '',
      email: '',
      password : '',
      token : '',
      usernameError : '',
      emailError: '',
      passwordError: '',
      data : ''
    }
  }
  
  //validtions of the user sign up form fields 
  //user cant able to enter the invalid email address
  //***@****.com
  validation=(e)=>{
    e.preventDefault();
    let emailRegex = /\w+@\w+[.]com/
    if(this.state.username == ''){
      this.setState({
        usernameError:"Username must not be empty"
      })
    }
    if(this.state.email == ''){
      this.setState({
        emailError:"Empty email"
      })
    }
    if(!emailRegex.test(this.state.email)){
      this.setState({
        emailError: 'Invalid Email'
      })
    }
    if(this.state.password == '' ){
      this.setState({
        passwordError:"Password must be 8 characters long"
      })
    }

    this.callSignUp()
  }

  callSignUp(){ 
    if(this.state.usernameError === "" && this.state.emailError === "" && this.state.passwordError === ""){
      let user = {
        username: this.state.username,
        email : this.state.email,
        password : this.state.password
      }
      axios.post(`https://arcane-atoll-15973.herokuapp.com/user`, user).then((res)=>{
        this.setState({
          data : res.data.user._id,
          token: res.data.token
        })
        
        console.log(res.data.user)
      })  
    }
  }

// get the value of users signup page 
// getting username field value
  userChange = (e) =>{
    document.getElementById('usernameInput').innerHTML =""
    this.setState({
      username: e.target.value,
      usernameError: ""
    })
  }

// getting email field value
  emailChange = (e) =>{
    document.getElementById('emailInput').innerHTML = ""
    this.setState({
      email: e.target.value,
      emailError: ""
    })
  }

// getting username field value
  passwordChange = (e) =>{
    document.getElementById('passwordInput').innerHTML = ""
    this.setState({
      password: e.target.value,
      passwordError: ""
    })
  }

  render(){
    if(this.state.token){
      
      localStorage.setItem("data", this.state.data );
      localStorage.setItem("token", this.state.token );
      return <Redirect to = '/allmovies' />
    }
    else if(localStorage.getItem("token")){
      return <Redirect to = '/allmovies' />
    }
    return(

        <div>
    
      <NavbarTag />
      <Row>
        <Col sm={4} ></Col>
        <Col sm={4}>
      <div className="signupformStyle">
      <h5>User SignUp</h5>

      <Form>
        <Label>Username</Label>
        <Input
         type="text" id="username" placeholder="Type your name"
         onChange = {(e)=>this.userChange(e)}
         />
         <span id= "usernameInput">{this.state.usernameError}</span>
        <Label>Email</Label>
        <Input
         type="email" placeholder="Enter your email"  name="email" 
         onChange = {(e)=>this.emailChange(e)}
        />
        <span id= "emailInput">{this.state.emailError}</span>
        <Label>Password</Label>
        <Input
         type="password" placeholder="*******"
         name= "password"
         id = "password"
         onChange = {(e)=>this.passwordChange(e)}
        />
        <span id= "passwordInput">{this.state.passwordError}</span>
        <Button color="primary" onClick={ (e)=>{this.validation(e)}} >SignUp Now</Button>
      </Form>

      </div>
      </Col>    
    </Row>
    </div>
     
    )
  }
}

export default UserSignUp