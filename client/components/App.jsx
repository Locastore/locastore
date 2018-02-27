import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
import Signup from './Signup.jsx';
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

  retrieveDetail(placeId, history) {
    axios.get('/business', {
      params: {
        id: placeId
      }
    })
    .then((res) => {
      console.log(res.data);
      for (let i = 0; i < this.state.stores.length; i++) {
        let store = this.state.stores[i];
        if (store.place_id === placeId) {
          store.hours = res.data.hours;
          store.extra_photos = res.data.photos;
          history.push(`/location/${placeId}`);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

render() {
    return (
      <Router>
      <div className="app">
        {/*<Signup signupSubmit={this.signupSubmit.bind(this)}/> */}
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

        <Route path="/location" render={ () =>
          <ProductSearch onSearch={this.prodsearch.bind(this)}/>
        } />

        <Business handleDetail={this.retrieveDetail.bind(this)}
                  businesses={this.state.stores} />

      </div>
      </Router>
    );
  }
}

export default App;