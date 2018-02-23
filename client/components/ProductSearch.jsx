import React from 'react';
import { Link } from 'react-router-dom';

class ProductSearch extends React.Component {
  constructor(props) {
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

  prodsearch() {
    this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div>
        <Link to="/location">
          <button type="button" onClick={this.prodsearch.bind(this)}>Search Local Retailers</button>
        </Link>
        <input type="text" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }
}

export default ProductSearch;