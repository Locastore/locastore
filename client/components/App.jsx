import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    }
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
    let username = signup.username;
    let email = signup.email;
    let password = signup.password;
    axios.post('/signup', {
      username: `${username}`,
      email: `${email}`,
      password: `${password}`
    })
    .then(res => {
      console.log(res.data);
      axios.get('/')
    })
    .catch((err) => {
      alert(err);  // <-- needs to be refined dep on situation.  Is it that the username/email already exists in db?
    })
  }


render() {
    return (
      <Router>
      <div>

        <Signup
        signupSubmit={this.signupSubmit.bind(this)}
        />
        {/*<Login
        loginSubmit={this.loginSubmit.bind(this)}
        />*/}

        <Route exact path="/" render={ () =>
          <div className="home">
            <div className="overlay">
              <Nav />
              <h1 className="live-well">live well</h1>
              <h1 className="shop-local">shop local</h1>
            </div>
              <Search onSearch={this.search.bind(this)}/>
          </div>
        } />
        {/*<Route exact path="/signup" render={ () =>
          <Signup signupSubmit={this.signupSubmit.bind(this)}/>
        } />*/}
        <Route path="/location" render={ () =>
          <ProductSearch onSearch={this.prodsearch.bind(this)}/>
        } />

        <Business businesses={this.state.stores} />

      </div>
      </Router>
    );
  }
}

export default App;