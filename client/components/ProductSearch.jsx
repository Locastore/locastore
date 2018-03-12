import React from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
import SmallNav from './SmallNav.jsx';
import ChipInput from 'material-ui-chip-input';
import YelpCategories from '../../helpers/yelpcategories.js';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip'

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      suggestions: []
    }
    this.onChange = this.onChange.bind(this);
    this.prodsearch = this.prodsearch.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  componentWillMount () {
    this.getSuggestions();
    let location = this.props.location;
    let cached = sessionStorage.getItem('location');
    if (cached && !location) {
      this.setState({
        location: cached
      });
    } else {
      sessionStorage.setItem('location', this.props.location);
      this.setState({
        location: this.props.location
      });
    }
  }

  onChange(chips) {
    this.setState({
      term: chips
    })
    this.props.onSearch(chips);
  }

  prodsearch() {
    this.props.onSearch(this.state.term);
  }

 getSuggestions () {
  const yelpCategories = YelpCategories.split(',\n');
  this.setState({
    suggestions: yelpCategories
  });
  }

  render() {
    return (
      <div>
        <SmallNav />
        <div className="productSearch">
          <h3 className="randomRenderTitle">{this.state.location}</h3>
          <div style={{width: '80%', margin: '0 auto'}}>
            <ChipInput
              onChange={this.onChange}
              style={{width: '50%', marginBottom: '20px'}}
              hintText="Search for local products and services"
              hintStyle={{ width: '100%', textAlign: 'center' }}
              dataSource={this.state.suggestions}
              />
           {
            // <Link to="/location">
            //   <FlatButton label="Search" onClick={this.prodsearch}/>
            // </Link>
          }
          {this.props.alertVisible && (
            <Alert
              align="center"
              color="danger"
              className="alert-box-product"
              isOpen={this.props.alertVisible}
              toggle={this.props.onDismiss}
            >
              Search term yielded no results
            </Alert>
          )}
          </div>
        </div>
      </div>
    )
  }
}

export default ProductSearch;
