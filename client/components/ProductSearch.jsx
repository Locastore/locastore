import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import './ProductSearch.css';

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
      <div className="productSearch">
        <h3 className="randomRenderTitle">Displaying Local Businesses In Your Neighborhood</h3>
        <hr />
        <Link to="/location">
          <button className="productButton" type="button" onClick={this.prodsearch.bind(this)}><img className="searchImg" src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'/></button>
        </Link>
        <input className="prodInputLayer" type="text" placeholder="Search Local Retailers" onChange={this.onChange.bind(this)}></input>
      </div>
    )
  }
}

export default ProductSearch;