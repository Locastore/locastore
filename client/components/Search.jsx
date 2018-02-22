import React from 'react';

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

  render () {
    return (
      <div>
        <button type="button" onClick={this.search.bind(this)}>Go Local!</button>
        <input type="text" value={this.state.locations}></input>
      </div>
    )
  }
}

export default Search;