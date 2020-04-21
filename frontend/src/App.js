import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Link,Switch, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import DataHandler from "./components/datahandler";
import LineGraph from "./components/linegraph";
import LineGraphNew from "./components/linegraphnew";
import Login from './components/Login';
import Register from "./components/Register";
import { Provider, connect } from 'react-redux';
import NotFound from './components/NotFound';
import {createStore} from 'redux';


import Auth  from './reducers/auth';
import {auth} from "./actions";



function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const store = createStore(Auth, ['Use Redux'])
// const store = createStore(todos, ['Use Redux'])
let a;
// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'Read the docs'
// })

class RootContainerComponent extends Component {

  render() {
    let {PrivateRoute} = this;
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Register} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}





class App extends Component {



  constructor(props){
    super(props);
    let val = localStorage.getItem('isAuthenticated');
    val = typeof val !== 'undefined'?val:false;
    localStorage.setItem('isAuthenticated',val);


    this.state = {
      todos: [],
      data:{},
      sample:{},
      elements_data:[],
      elements_data1:[],

    }



    this.update_todo_list.bind(this);
  } 


  /*    This is where the magic happens*/
  // async componentDidMount() {
  //   try {
  //     // fetch('https://some-api.com/harry-potter')
  //     // .then((response) => response.json())
  //     // .then(todos => {
  //     //     this.setState({ todos: todos });
  //     // });


  //     const res =  await fetch('http://127.0.0.1:8000/api'); // fetching the data from api, before the page loaded
  //     console.log(res);
  //     const todos = await res.json();
  //     this.setState({
  //       todos
  //     });
  //   } catch (e) {
  //     console.log("Sory bro ");
  //     console.log(e);
  //   }
  // }

  PrivateRoute = ({component: ChildComponent, ...rest}) => {
    return <Route {...rest} render={props => {
      if (false) {
        return <em>Loading...</em>;
      } else if (true) {
        return <Redirect to="/login" />;
      } else {
        return <ChildComponent {...props} />
      }
    }} />
  }


  componentDidMount(){

    setInterval(()=> {
      this.update_todo_list();
    },300);
  }

  update_todo_list() {
    try {
      fetch('http://127.0.0.1:8000/api')
      .then((response) => response.json())
      .then(todos => {
          // this.setState({ todos: todos });
      });

      let headers =  {};//{'Authorization': "Token f7f7f95f0343579ba2ea438a9cecbe81c2c170ade8a59d58d514787f2b6ee55"} ;
      headers['Authorization'] = "Token "+localStorage.getItem("token");
      console.log(headers);
      fetch('http://127.0.0.1:8000/api/price1/',{headers:headers,method:"GET"})
      .then((response) => response.json())
      .then(sample => {

        
        this.setState({ sample: sample });
      });

      


      // const res =  await fetch('http://127.0.0.1:8000/api'); // fetching the data from api, before the page loaded
      // console.log(res);
      // const todos = await res.json();
      // this.setState({
      //   todos
      // });
    } catch (e) {
      console.log("Sory bro ");
      console.log(e);
    }

    let elements_data = [];

    Object.keys(this.state.sample).forEach((key,index)=>{
        let curr_data = this.state.sample[key];
        let label = key;
        let labels = Object.keys(curr_data);
        let values = Object.values(curr_data);
        let datasets = [{
          label:label,
          data:values,
        }]


        // elements.push(<LineGraphNew  key={index} labels={labels} datasets={datasets} />);
        elements_data.push({'key':index  ,'labels':labels , 'datasets':datasets});

      });
    this.setState({elements_data:elements_data});

    // console.log("Hello check");
    // if (this.state['elements_data'].length>0)
    // console.log(this.state['elements_data'][0]['labels']);



    // try {
    //   console.log("connecting price");
    //   fetch('http://127.0.0.1:8000/api/price')
    //   .then((response) => response.json())
    //   .then(data => {
    //       console.log(data);
    //   });


    //   // const res =  await fetch('http://127.0.0.1:8000/api'); // fetching the data from api, before the page loaded
    //   // console.log(res);
    //   // const todos = await res.json();
    //   // this.setState({
    //   //   todos
    //   // });
    // } catch (e) {
    //   console.log("Sory bro ");
    //   console.log(e);
    // }
  }

  logout(){
    localStorage.setItem('isAuthenticated',null);
    localStorage.setItem('token',null);
    localStorage.setItem('username',null);
    return (
     
      <Redirect to="/login" />
      
      );
  }


  render() {

    // let elements = [];

    // Object.keys(this.state.sample).forEach((key,index)=>{
    //     let curr_data = this.state.sample[key];
    //     let label = key;
    //     let labels = Object.keys(curr_data);
    //     let values = Object.values(curr_data);
    //     let datasets = [{
    //       label:label,
    //       data:values,
    //     }]


    //     elements.push(<LineGraphNew  key={index} labels={labels} datasets={datasets} />);
    //     // elements.push({'key':index  ,'labels':labels , 'datasets':datasets});

    //   });
    let {PrivateRoute}  = this;

    return (


      <div >
      {localStorage.getItem('isAuthenticated')!=='true' ?<Router> <Redirect to='/login' /> </Router>:null}


      <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route match="/login" component={Login} />

        </Switch>
      </ Router>
      </Provider>
      

      <div>
        {localStorage.getItem('isAuthenticated')==='true' ? <div>User: {localStorage.getItem('username')}</div>:null }
        {localStorage.getItem('isAuthenticated')==='true' ? <button onClick={this.logout} >Logout</button>:null }
        {localStorage.getItem('isAuthenticated')==='true' ? this.state.elements_data.map((item)=>
           (
          <div>
            <LineGraphNew key={item.key} labels={item.labels} datasets={item.datasets} />
          </div>)
        ):null }
        

      </div>

      
     

        { this.state.todos.map(item => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <span>{item.description}</span>
          </div>
        ))}
      
      </div>
    );
  }
}


// function App(){
//   return (
//     <React.Fragment>
//     <DataHandler/>
//     </React.Fragment>
//     )
// }


export default App;
