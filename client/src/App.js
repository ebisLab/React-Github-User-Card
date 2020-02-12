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
    axios.get(`https://api.github.com/${this.state.userText}/ebisLab`),
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
        <h1>Data from API</h1>
        <form style={{margin: '20px'}} onSubmit={this.fetchUsers}>
          <input placeholder="Search User..."
          type="text"
        value={this.state.userText}
        onChange={this.handleChanges}
          />
          <button>Search</button>
        </form>
        <MyProfile users={this.state.users}/>
        <Followers followers={this.state.followers}/>
      </div>
    );
  }
  
}

export default App;
