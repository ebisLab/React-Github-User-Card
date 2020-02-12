import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import MyProfile from './components/MyProfile';
import Followers from './components/Followers'

class App extends Component {

  state={
    users: [],
    followers: [],
    userText: '',
    error: ''
  }

//   componentDidMount(){
// axios
// .get(`https://api.github.com/users/ebisLab`)
// .then(res=>{
//   console.log(res, '<--res')
//   console.log('res -->', res.data)
//   this.setState({
//     users: res.data
//   })
// })
// .catch(err=> console.log(err))
//   }

componentDidMount(){
  axios.all([
    axios.get('https://api.github.com/users/ebisLab'),
    axios.get('https://api.github.com/users/ebisLab/followers')
  ])
  .then(axios.spread((myRes, followRes) => {
    this.setState({
          users: myRes.data,
          followers: followRes.data
        })
  }))
  .catch(err => console.log(err))
}

handleChanges = e => {
  console.log(e.target.value)
  this.setState({
    userText: e.target.value
  });
  console.log(e.target.value)
};

fetchUsers = e =>{
  console.log('Users are being fetched')
  e.preventDefault();
  axios.all([
    axios.get(`https://api.github.com/users/${this.state.userText}`),
    axios.get(`https://api.github.com/users/${this.state.userText}/followers`)
  ])
  .then(axios.spread((myRes, followRes) => {
    this.setState({
          users: myRes.data,
          followers: followRes.data, 
          error: ''
        })
  }))
  .catch(err => {
    this.setState({
      error: 'Looks like we could not find that user. Please try again'
    })
  })
}

  render(){
    // console.log('inside app followers', this.state.followers)
    return (
      <div className="App">
        <h1>GitHub Card Profile</h1>
        <form style={{margin: '20px'}} onSubmit={this.fetchUsers}>
          <input placeholder="Search User..."
          type="text"
        value={this.state.userText}
        onChange={this.handleChanges}
        style={{border: '1px solid black', padding: '5px', width: '18%', height: '25px' , margin: '10px'}}
          />
          <button onClick={this.fetchUsers} 
          style={{ 
            width: '100px',
            border: '1px solid black',
            boxShadow: '5px 10px',
            padding: '5px',
            verticalAlign: 'super'
            }}>Search</button>
        </form>

        {this.state.error && <p style={{color: 'red'}}>{this.state.error}</p>}
        {!this.state.error && (
          <>
        <MyProfile error={this.state.error} users={this.state.users}/>
        <Followers error={this.state.error} followers={this.state.followers}/>
        </>
        )}
      </div>
    );
  }
  
}

export default App;
