import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: ''
    }
  }

  onChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="search">
        <Link to="/location">
          <button type="button" onClick={this.search.bind(this)}>Go Local!</button>
        </Link>
        <input type="text" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }
}

export default Search;