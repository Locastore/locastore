import React from 'react';
import { Route } from 'react-router-dom';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: ''
    }
    this.search = this.search.bind(this);
  }

  onChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  search(history) {
    this.props.onSearch(this.state.term, history);
  }

  render() {
    return (
      <div>
        <div className="search">
          <Route render={({history}) => (
            <button type="button" onClick={() => { this.search(history) }}>
              <img className="searchImg" src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'/>
            </button>
          )}>
          </Route>
          <input className="input" className="inputLayer" type="text" placeholder="Where do you live?" onChange={this.onChange.bind(this)}></input>
        </div>
      </div>
    )
  }
}

export default Search;