import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
  constructor(){
    super();
  this.state = {
    users: [],
    userTypes: 'users'
  }
  }


  render(){

   return (
    <div className="App">
    <h1>Populate Users Here</h1>
    </div>
  );
}
}

export default App;

