import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
import './App.css';
import Signup from './Signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    }
    // this.userFormSubmit=this.userFormSubmit.bind(this);
  }

  search(location) {
    axios.post('/location', {
      text: `${location}`
    })
    .then(res => {
      const stores = res.data;
      console.log(stores);
      this.setState({stores});
    })
    .catch(err => {
      console.log(err);
    })
  }

  prodsearch(product) {
    axios.post('/product', {
      text: `${product}`
    })
    .then(res => {
      const stores = res.data;
      console.log(stores);
      this.setState({stores})
    })
    .catch(err => {
      console.log(err);
    })
  }

  signupSubmit(signup) {
    console.log(signup.target, '<-this is the signup.target');
    let username = signup.target.username;
    let email = signup.target.email;
    let password = signup.target.password;
    axios.post('/signup', {
      username: `${username}`,
      email: `${email}`,
      password: `${password}`
    })
    .then(res => {
      axios.get('/')
    })
    .catch((err) => {
      alert(err);  // <-- needs to be refined dep on situation.  Is it that the username/email already exists in db?
    })
  }

  render() {
    return (
      <div className="App">
        <Signup signupSubmit={this.signupSubmit.bind(this)}/>
        <Search onSearch={this.search.bind(this)}/>
        <ProductSearch onSearch={this.prodsearch.bind(this)}/>
        <Business businesses={this.state.stores} />
        <h2>Live Well, Shop Locally-Owned</h2>
      </div>
    );
  }
}

export default App;