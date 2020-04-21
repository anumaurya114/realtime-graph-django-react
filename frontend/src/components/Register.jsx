import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions";

class Register extends Component {

  state = {
    username: "",
    password: "",
  }
  
  register = (username, password) => {

  

   
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({ username: this.state.username, password:this.state.password});




    try{
       fetch('http://127.0.0.1:8000/api/auth/register/',{headers:headers, body, method: "POST"})
      .then((response) => response.json())
      .then(response => {
 
             if(response.user!==undefined) {
                      console.log(username);
                    if(response.user.username===username){
                      console.log("Done register");
                      localStorage.setItem('token',response.token);
                      localStorage.setItem('isAuthenticated','true');
                      localStorage.setItem('username',username);
                      return (
     
                          <Redirect to="/" />
                          
                          );
          
              }

            }

      });
   
   }
  catch (e) {
      console.log("Sory bro ");
      console.log(e);
    };


 
}

  onSubmit = e => {
    e.preventDefault();
    this.register(this.state.username, this.state.password);
  }

  render() {
    if (localStorage.getItem('isAuthenticated')==='true') { //localStorage.getItem('isAuthenticated')==='true'
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Register</legend>
          
          <p>
            <label htmlFor="username">Username</label>
            <input
              type="text" id="username"
              onChange={e => this.setState({username: e.target.value})} />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              type="password" id="password"
              onChange={e => this.setState({password: e.target.value})} />
          </p>
          <p>
            <button type="submit">Register</button>
          </p>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);