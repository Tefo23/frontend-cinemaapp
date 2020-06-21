import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import SignUp from './components/UserSignUp'
import LoginForm from './components/UserLogin';
import AdminLogin from './components/AdminLogin';
import AllMovies from './components/AllMovies'
import MyBooking from './components/MyBooking'

import MoviesED from './components/MoviesED'

function App() {
  return (
    <Router>
      <div className= "App">
        <Route exact path='/' component={AllMovies} />
        <Route exact path='/allmovies' component={AllMovies} />

        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={LoginForm} /> 
        <Route exact path='/adminLogin' component={AdminLogin} /> 
        
        <Route exact path='/mybookings' component={MyBooking} /> 
        
        <Route exact path='/adminPanel' component={MoviesED} /> 
        
        


      </div>
    </Router>
  );
}

export default App;
