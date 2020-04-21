import React, {Component} from "react";

class DataHandler extends Component{
	state = {
		todos: []
	}

	componentDidMount() {
    try {
      fetch('http://127.0.0.1:8000/api')
      .then((response) => response.json())
      .then(todos => {
          this.setState({ todos: todos });
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
  }

    update_data(){

    	console.log("started update");
	    setInterval(function() {
	    	  console.log("inside update");
		      this.componentDidMount();
		  }, 200);

	}



	render(){
		return (
			<React.Fragment>
			<div onLoad={this.update_data}>Hello world</div>
			</React.Fragment>
		)
	}	
}

export default DataHandler;

//   state = {
//     todos: []
//   };
//   /*    This is where the magic happens*/
//   // async componentDidMount() {
//   //   try {
//   //     // fetch('https://some-api.com/harry-potter')
//   //     // .then((response) => response.json())
//   //     // .then(todos => {
//   //     //     this.setState({ todos: todos });
//   //     // });


//   //     const res =  await fetch('http://127.0.0.1:8000/api'); // fetching the data from api, before the page loaded
//   //     console.log(res);
//   //     const todos = await res.json();
//   //     this.setState({
//   //       todos
//   //     });
//   //   } catch (e) {
//   //     console.log("Sory bro ");
//   //     console.log(e);
//   //   }
//   // }
//   componentDidMount() {
//     try {
//       fetch('http://127.0.0.1:8000/api')
//       .then((response) => response.json())
//       .then(todos => {
//           this.setState({ todos: todos });
//       });


//       // const res =  await fetch('http://127.0.0.1:8000/api'); // fetching the data from api, before the page loaded
//       // console.log(res);
//       // const todos = await res.json();
//       // this.setState({
//       //   todos
//       // });
//     } catch (e) {
//       console.log("Sory bro ");
//       console.log(e);
//     }
//   }





//   update_data(){


//     setInterval(function() {

//       this.componentDidMount();
//   }, 2000);

//   }



//   render() {
//     return (
//       <div onLoad={this.update_data}>
//         { this.state.todos.map(item => (
//           <div key={item.id}>
//             <h1>{item.title}</h1>
//             <span>{item.description}</span>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }