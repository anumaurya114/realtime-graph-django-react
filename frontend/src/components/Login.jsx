import React, {Component} from "react";
import {connect} from "react-redux";

import {Link, Redirect} from "react-router-dom";

import {auth} from "../actions"

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  user: null,
  errors: {},
};




class Login extends Component {

  state = {
    username: "",
    password: "",

  }

  login = (username, password) => {

  

   
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({ username: this.state.username, password:this.state.password});
    this.setState({username:''});
    this.setState({password:''});




    try{
       fetch('http://127.0.0.1:8000/api/auth/login/',{headers:headers, body, method: "POST"})
      .then((response) => response.json())
      .then(response => {
 
             if(response.user!==undefined) {
                      console.log(username);
                    if(response.user.username===username){
                      console.log("Matched");
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
    this.login(this.state.username,this.state.password);
    //this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (localStorage.getItem('isAuthenticated')==='true') { //localStorage.getItem('isAuthenticated')==='true'
      return <Redirect to="/" />
    }

    return (
      <form onSubmit={this.onSubmit}>
        <fieldset>
          <legend>Login</legend>
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
            <button type="submit">Login</button>
          </p>

          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </fieldset>
      </form>
    )
  }
}

// const mapStateToProps = state => {
//   let errors = [];
//   console.log(state);
//   if (state.auth.errors) {
//     errors = Object.keys(state.auth.errors).map(field => {
//       return {field, message: state.auth.errors[field]};
//     });
//   }
//   return {
//     errors,
//     isAuthenticated: state.auth.isAuthenticated
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     login: (username, password) => {
//       return dispatch(auth.login(username, password));
//     }
//   };
// }

const mapStateToProps = state => {
  return {};
}

const mapDispatchToProps = dispatch => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);