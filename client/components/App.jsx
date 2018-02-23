import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
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

  render() {
    return (
      <Router>
      <div className="App">
        <Route exact path="/" render={ () =>
          <Search onSearch={this.search.bind(this)}/>
        } />
        <Route path="/location"
               render={ () =>
                <ProductSearch onSearch={this.prodsearch.bind(this)}/>
               } />
        <Business businesses={this.state.stores} />
        <h2>Live Well, Shop Locally-Owned</h2>
      </div>
      </Router>
    );
  }
}

export default App;