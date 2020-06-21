import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios'

class AddMovie extends Component{
  constructor(){
    super();
    this.state = {
      image: '',
      movieName: '',
      avaiableSeats: '',
      timing:''
    }
  }

//Add movies
add(e){
  e.preventDefault()  
  if(this.state.movieName !== '' && this.state.avaiableSeats !== '' && this.state.timing !== '' ){
    let formdata = new FormData()
    formdata.append('movieName', this.state.movieName)
    formdata.append('avaiableSeats', this.state.avaiableSeats)
    formdata.append('timing', this.state.timing)

    if(this.state.image){

      formdata.append('image', this.state.image)
    
    }
    console.log(formdata)
    axios.post(`https://arcane-atoll-15973.herokuapp.com/movie`, formdata, {
      headers: {
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }
  }).then((res)=>{
    
      console.log(res.data)
      alert("Successfully! Added the Movie.")
      window.location.reload();

    }).catch((err)=>{
      alert("All the Fields must be filled!")
    })  
  }

  
}

  render(){
    return(
      <div>
        <Form>
        <Input type="file" name="file" id="imgUpload"
         accept="image/*"
         onChange = { (e)=>this.setState({image: e.target.files[0]})}
         />

          <Label>Movie Name</Label>
          <Input type="text" id ='movieName' placeholder="Enter Movie Name"  onChange={(e)=>this.setState({movieName: e.target.value})} />

          <Label>Total Seats</Label>
          <Input type="number" placeholder="Enter Total Seats " id ='availableSeats' 
           onChange={(e)=>this.setState({avaiableSeats: e.target.value})} />

          <Label>Timing Slot</Label>
          <Input type="text" placeholder="9:00Am-12:00Am" id ='timing'
           onChange={(e)=>this.setState({timing: e.target.value})}
          />
          <div style={{display: "flex"}}>
            <Button class="btn btn-primary" id="addMovie" onClick={(e)=>this.add(e)} >Add</Button>
          </div>
        </Form>
      </div>
    )
  }
}
export default AddMovie