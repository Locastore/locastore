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
          <button type="button" onClick={this.prodsearch.bind(this)}><img className="searchImg" src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'/></button>
        </Link>
        <input className="input" className="inputLayer" type="text" placeholder="Search Local Retailers" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }
}

export default ProductSearch;