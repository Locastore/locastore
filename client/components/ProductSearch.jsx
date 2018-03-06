import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import '../styles/ProductSearch.css';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.prodsearch = this.prodsearch.bind(this);
  }

  onChange(event) {
    this.setState({
      term: event.target.value
    })
  }

  prodsearch() {
    this.props.onSearch(this.state.term);
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.props.onSearch(this.state.term);
    }
  }

  render() {
    return (
      <div className="productSearch">
        <h3
          className="randomRenderTitle"
        >
          Displaying Local Businesses In Your Neighborhood
        </h3>
        <hr />
        <Link
          to="/location"
        >
          <button
            className="productButton"
            type="button"
            onClick={this.prodsearch}
          >
            <img
              className="searchImg"
              src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'
            />
          </button>
        </Link>
        <input className="prodInputLayer"
               type="text"
               placeholder="Search Local Retailers"
               onChange={this.onChange}
               onKeyPress={this.handleKeyPress}>
        </input>
      </div>
    )
  }
}

export default ProductSearch;