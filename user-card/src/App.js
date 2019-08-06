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
    .then(folks => { 
      this.setState({data: folks})
      return console.log('There', folks)})
   
   .catch(err => {
     console.log(err);
   })
  }
  
  render(){

   return (
    <div className="App">
      <div className="inside">
    <h1>Populate Users Here</h1>
    {this.state.data.map(peep =>{
      return <div className="cards">
        <div className="long">
        <div className="avi">
          <img className="avicircle"src={peep.avatar_url} />
        </div>
        <div>
        <h3>{peep.login}</h3>
      <p>
        <div className="btn" onClick={peep.url}>More</div>
      </p>
      </div>
      </div>
      </div>
    })}
    </div>
    </div>
  );
}
}

export default App;

