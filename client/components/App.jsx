import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Nav from './Nav.jsx';
import Search from './Search.jsx';
import ProductSearch from './ProductSearch.jsx';
import Business from './Business.jsx';
//import logo from './logo.svg';
import './App.css';

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
      <div className="app">

        <div className="overlay">
        {/*<img src={logo} alt="Locastore"/>*/}
        <Nav />
         <h1 className="live-well">live well</h1>
         <h1 className="shop-local">shop local</h1>
        </div>


        {/*<div className="search">
          <Search onSearch={this.search.bind(this)}/>
          <ProductSearch onSearch={this.prodsearch.bind(this)}/>
          <Business businesses={this.state.stores} />
        </div>*/}
      </div>
    );
  }
}

export default App;