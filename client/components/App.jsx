import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search.jsx';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    }
  }

  search(location) {
    axios.post('/locations', {
      text: `${location}`
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
      <div className="App">
        <Search onSearch={this.search.bind(this)}/>
        <h2>Live Well, Shop Locally-Owned</h2>
      </div>
    );
  }
}

export default App;