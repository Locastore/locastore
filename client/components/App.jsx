import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import ProfileWithRouter from './Profile.jsx';
import $ from 'jquery';
import '../styles/App.css';
import cookie from 'react-cookie'
import { Alert } from 'reactstrap';
import { withRouter } from 'react-router';
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
      stores: [],
      alertVisible: false,
      loading: false,
      loggedIn: false
    }

    this.onDismiss = this.onDismiss.bind(this);
  }

  componentDidMount() {
    if (cookie.load('loggedIn') === 'true' && this.state.loggedIn === false) {
      this.setState({
        loggedIn: true
      });
    }
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  search(location) {
    axios.post('/location', {
      text: `${location}`
    })
    .then(res => {
      if (res.status === 204) {
        console.log(`No results found for: ${location}`);
        this.setState({ alertVisible: true });
      } else {
        const stores = res.data;
        console.log(stores);
        this.setState({stores});
        this.props.history.push('/location');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  prodsearch(product) {
    this.setState({
      loading: true
    });

    axios.post('/product', {
      text: `${product}`
    })
    .then(res => {
      if (res.status === 204) {
        console.log(`No results found for: ${product}`);
        this.setState({
          stores: [],
          loading: false
        });
      } else {
        const stores = res.data;
        console.log(stores);
        this.setState({
          stores: stores,
          loading: false
        });
      }
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
      this.props.history.push('/login');
    })
    .catch((err) => {
      alert(err);
    })
  }


  retrieveDetail(placeId) {
    this.setState({
      loading: true
    });

    axios.get('/business', {
      params: {
        id: placeId
      }
    })
    .then((res) => {
      console.log(res.data);
      // TODO: Refactor this to use the index property of businesses instead
      // of this for loop
      for (let i = 0; i < this.state.stores.length; i++) {
        let store = this.state.stores[i];
        if (store.place_id === placeId) {
          store.hours = res.data.hours;
          store.extra_photos = res.data.photos;
          store.website = res.data.website;
          this.setState({
            loading: false
          });
          this.props.history.push(`/location/${placeId}`);

        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  loginSubmit(login) {
    let username = login.username;
    let password = login.password;
    axios.post('/login', {
      username: `${username}`,
      password: `${password}`
    })
    .then(res => {
      if (res.status === 200 ) {
        this.setState({
          loggedIn: true
        });
        this.props.history.push('/');
      };
    })
    .catch((err) => {
      console.log(err);
      alert('The username and/or password do match the records we have on file. Please check your spelling and try again.');
    })
  }

  handleLogout() {
    axios.get('/logout');
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={ () =>
          <div className="home">
            <div className="overlay">
              <Nav loginStatus={this.state.loggedIn} />
              <h1 className="live-well">live well</h1>
              <h1 className="shop-local">shop local</h1>
            </div>
              <div className='col-sm-4 offset-sm-5'>
                <Alert align='center' color="danger" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                  Search term yielded no results
                </Alert>
              </div>
              <Search onSearch={this.search.bind(this)}/>
          </div>
        } />

        <Route exact path="/signup" render={ () =>
          <Signup signupSubmit={this.signupSubmit.bind(this)}/>
        } />

        <Route exact path="/login" render={ () =>
          <Login loginSubmit={this.loginSubmit.bind(this)} />
        } />

        <Route exact path="/location" render={ () =>
          <ProductSearch onSearch={this.prodsearch.bind(this)}/>
        } />

        <Route exact path='/about' component={About} />

        <Route path='/profile' render={ () =>
          <ProfileWithRouter loginStatus={this.state.loggedIn} />
        } />

        <Business handleDetail={this.retrieveDetail.bind(this)}
                  businesses={this.state.stores}
                  loading={this.state.loading}
                  loginStatus={this.state.loggedIn}
        />

      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;