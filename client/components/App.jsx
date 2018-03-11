import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
import Signup from './Signup.jsx';
import Login from './Login.jsx';
import About from './About.jsx';
import ProfileWithRouter from './Profile.jsx';
import SmallNav from './SmallNav.jsx';
import $ from 'jquery';
import '../styles/App.css';
import cookie from 'react-cookie'
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
      favorites: [],
      alertVisible: false,
      hasNew: true,
      loading: false,
      imgLoading: false,
      loggedIn: false,
      location: ''
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.search = this.search.bind(this);
    this.signupSubmit = this.signupSubmit.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.prodsearch = this.prodsearch.bind(this);
    this.retrieveDetail = this.retrieveDetail.bind(this);
    this.cacheBusiness = this.cacheBusiness.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.setNew = this.setNew.bind(this);
  }


  componentWillMount() {
    console.log('willmount')
    this.checkLogin();
    this.cacheBusiness();
  }

  componentDidMount() {
    console.log('didmount')
    this.getFavorites();
  }

  componentWillReceiveProps() {
    console.log('receiveprops')
    this.checkLogin();
    this.getFavorites();
    this.cacheBusiness();
  }

  cacheBusiness() {
    console.log('cache business')
    let businesses = JSON.stringify(this.state.stores);
    let cached = sessionStorage.getItem('businesses');
    if (cached && !JSON.parse(businesses).length) {
      this.setState({
        stores: JSON.parse(cached)
      });
    } else {
      sessionStorage.setItem('businesses', businesses);
      this.setState({
        stores: JSON.parse(businesses)
      });
    }
  }

  getFavorites() {
    console.log('getting favorited called', this.state.loggedIn, this.state.hasNew)
    if (this.state.loggedIn && this.state.hasNew) {
      console.log('getting favorites')
      axios.get('/favorite')
      .then((res) => {
        this.setState({
          favorites: res.data,
          hasNew: false
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  checkLogin() {
    if (cookie.load('loggedIn') === 'true' && this.state.loggedIn === false) {
      console.log('checking loggin');
      this.setState({
        loggedIn: true
      });
    }
  }

  setNew() {
    console.log('favorite update')
    this.setState({
      hasNew: true
    });
  }

  onDismiss() {
    this.setState({ alertVisible: false });
  }

  search(location) {
    let city = location.split(',').splice(0,2).join(',');

    this.setState({
      location: city
    });

    axios.post('/postlocation', {
      text: `${location}`
    })
    .then(res => {
      if (res.status === 204) {
        console.log(`No results found for: ${location}`);
        this.setState({ alertVisible: true });
      } else {
        const stores = res.data;
        this.setState({stores});
        this.props.history.push('/location');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  prodsearch(product) {
     if (!product) {
      this.setState({
        alertVisible: true
      });
      return;
    }
    let query;
    if  (product.length > 1) {
      query = product.join(' ');
    } else {
      query = product[0];
    }

    this.setState({
      loading: true
    });

    axios.post('/product', {
      text: `${query}`
    })
    .then(res => {
      if (res.status === 204) {
        console.log(`No results found for: ${product}`);
        this.setState({
          stores: [],
          loading: false,
          alertVisible: false
        });
      } else {
        const stores = res.data;
        this.setState({
          stores: stores,
          loading: false,
          alertVisible: false
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
      imgLoading: true
    });
    this.props.history.push(`/location/${placeId}`);

    axios.get('/business', {
      params: {
        id: placeId
      }
    })
    .then((res) => {
      for (let i = 0; i < this.state.stores.length; i++) {
        let store = this.state.stores[i];
        if (store.place_id === placeId) {
          store.hours = res.data.hours;
          store.extra_photos = res.data.photos;
          store.website = res.data.website;
          store.latitude = res.data.latitude;
          store.longitude = res.data.longitude;
          this.setState({
            imgLoading: false
          });

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
    axios.post('/postlogin', {
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
    this.setState({
      loggedIn: false
    });
    axios.get('/logout');
  }


  render() {
    return (
      <MuiThemeProvider>
      <div className="app">
        <Switch>
          <Route
            exact path="/"
            render={ () =>
              <div className="home">
                <div className="overlay">
                  <Nav loginStatus={this.state.loggedIn} logout={this.handleLogout}/>
                </div>
                <div className="searchcol">
                  <Search onSearch={this.search} alertVisible={this.state.alertVisible} onDismiss={this.onDismiss}/>
                </div>
              </div>
            }
          />

          <Route
            path="/signup"
            render={ () =>
              <Signup signupSubmit={this.signupSubmit}/>
            }
          />

          <Route
            path="/login"
            render={ () =>
              <Login loginSubmit={this.loginSubmit} />
            }
          />

          <Route
            exact path="/location"
            render={ () =>
              <ProductSearch
                onSearch={this.prodsearch}
                alertVisible={this.state.alertVisible}
                onDismiss={this.onDismiss}
                location={this.state.location}
              />
            }
          />

          <Route
            path="/location"
          />

          <Route
            path='/about'
            component={About}
          />

          <Route
            path='/profile'
            render={ () =>
              <ProfileWithRouter
                loginStatus={this.state.loggedIn}
                handleDetail={this.retrieveDetail}
                favorites={this.state.favorites}
                loading={this.state.loading}
                imgLoading={this.state.imgLoading}
                favorites={this.state.favorites}
                setNew={this.setNew}
              />
            }
          />

          <Route
            path="/logout"
            render={ () => {
              this.handleLogout();
              return (
                <Redirect to="/login"/>
              )
            }}

          />

          <Redirect to="/"/>

        </Switch>

        <Business
          handleDetail={this.retrieveDetail}
          businesses={this.state.stores}
          loading={this.state.loading}
          loginStatus={this.state.loggedIn}
          imgLoading={this.state.imgLoading}
          favorites={this.state.favorites}
          setNew={this.setNew}
        />

      </div>
      </MuiThemeProvider>
    );
  }
}

const AppWithRouter = withRouter(App);

export default AppWithRouter;