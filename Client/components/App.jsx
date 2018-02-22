import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {

    // }
    this.search = this.search.bind(this);
  }

  search(event) {
    // listen for form submit event
    console.log(event);
    // grab search term (location) from event obj
    // do axios post request to '/location' endpoint with search term as body.
    // server should serve up /
  }

  render() {
    return (
      <div>
        <div>
          <h1>Test, does this render to DOM?</h1>
          <SearchView
          search={this.search}
          />

        </div>
      </div>
    );
  }
}