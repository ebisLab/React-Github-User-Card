import React from "react";
import ReactDOM from "react-dom";


class App extends React.Component {
  constructor(){
    super();
  this.state = {
    data: []
  };
  }

  //2.set to state
  componentDidMount(){
    this.fetchUsers();
  }
//1. Fetch 
  fetchUsers = () =>{
    
    fetch(`https://api.github.com/users`)
    .then(res=>  res.json())
      //{
      //console.log('res', res.json())
      
      // return console.log('There', res.json())

   // })
    .then(folks => { 
      this.setState({data: folks})
      return console.log('There', folks)})
      
  //  return console.log('There')
   
   .catch(err => {
     console.log(err);
   })
  }
  
  render(){

   return (
    <div className="App">
    <h1>Populate Users Here</h1>
    {this.state.data.map(peep =>{
      return <p>{peep.login}</p>
    })}
    </div>
  );
}
}

export default App;

