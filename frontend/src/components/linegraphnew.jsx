import React, { Component } from 'react'
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

export default class LineGraphNew extends Component {
   constructor(props){
    super(props);
    this.state = {
        labels:this.props.labels?this.props.labels:this.state.labels,
        datasets:this.props.datasets?this.props.datasets:this.state.datasets,

    }

    

  } 



    chartRef = React.createRef();

    update_state(){
        this.setState({labels:this.props.labels});
        this.setState({datasets:this.props.datasets});
    }
    
    update_graph() {

        const options = {
            // animation: {
            //     rotate: true,
            //     scale: false
            // },
            animation:true,
            //Boolean - If we want to override with a hard coded scale
            scaleOverride: false,
            //** Required if scaleOverride is true **
            //Number - The number of steps in a hard coded scale
            // scaleSteps: 10,
            //Number - The value jump in the hard coded scale
            // scaleStepWidth: 10,
            //Number - The scale starting value
            // scaleStartValue: 0,
            responsive: false,
            maintainAspectRatio: false,
          };
        if(this.chartRef.current===null || this.chartRef.current.getContext("2d")==null){
            return;
        }
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: this.state.labels,
                datasets: this.state.datasets,
            },
            options: options
        });
    }

    componentDidMount(){

    setInterval(()=> {
      this.update_state();
      this.update_graph();

    },300);
  }


    render() {
        return (
            <div >
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}