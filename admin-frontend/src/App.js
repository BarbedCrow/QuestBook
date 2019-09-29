import React from 'react';
import './App.css';
import MyGraph from "./graph";

class App extends React.Component{

  render(){
    return(
        <div style ={this.getStyle()}>
          <MyGraph />
        </div>
    )
  }

  getStyle(){
    return {
      backgroundColor: "#e3dac9",
      height:"100%"
    };
  }

}
export default App;
