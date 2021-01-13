import React, { Component } from 'react';
import './App.css';
import ParticularZip from './PartCity';
import axios from 'axios';

class CityInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      getSuccess: true,
      firstPage: true,
      zipcode: ["Can't find this city"] ,
      city: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchCityData(city){
    axios.get("https://ctp-zip-api.herokuapp.com/city/" + city)
    .then(response => {
      let result = response.data;
      this.setState({zipcode:result, getSuccess:true});
    })
    .catch(err => {
      console.log(err);
      this.setState({getSuccess:false});
    });
  }

  handleClick() {
    let upperCaseCity = this.state.city.toUpperCase();
    if (!this.state.firstPage) {
      upperCaseCity = "Try New York"
    };
      this.setState ({
          firstPage : !this.state.firstPage,
          city: upperCaseCity,
      });
  }
  handleChange (event) {
    
    this.setState({
        city:  event.target.value
    });
}
  render() {
    if (this.state.firstPage == true) {
      return (
          <div >
            <h1 className = "App-header">City Search </h1>
            <h2  className = "App-subheader">City: <input className="inputLine" type='text' value = {this.state.city} onChange={this.handleChange}/></h2>
              
              <button className= "button" onClick={this.handleClick}>Submit</button>
          </div>
      );
  } else {
      this.fetchCityData(this.state.city);
      var zipcode = (<p>City Not Found</p>);
      if(this.state.getSuccess){
        zipcode = this.state.zipcode.map((zipcode)=>
        <ParticularZip data={zipcode}/>
        );
      }; 
    let correctCity = this.state.city.toLowerCase();
    correctCity = correctCity.charAt(0).toUpperCase() + correctCity.slice(1);
    return(
      <div>
        <h1 className = "App-header">City Search Results</h1>
        <h2 className = "App-subheader">City: {correctCity}</h2>
        <ul className = "zipList">{zipcode}</ul>
        <button className= "button" onClick={this.handleClick}>Try Again</button>
      </div>

    );
  }
  }
}

class App extends Component {
  render() {
      return (
          <div>
            <CityInfo />
          </div>

      );
  }
}


export default App