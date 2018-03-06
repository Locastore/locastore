import React from 'react';
import { Route } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import '../styles/Search.css';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      address: ''
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  onChange(term) {
    this.setState({ term });
  }

  render() {

    const inputProps = {
      value: this.state.term,
      onChange: this.onChange,
      placeholder: 'Where do you live?',
    }

    const inputClasses = {
      input: 'search inputLayer input',
      autocompleteContainer: 'autocompleteBox'
    }

    return (
      <div className="search">
        <div>
          <PlacesAutocomplete
            classNames={inputClasses}
            onEnterKeyDown={this.search}
            inputProps={inputProps}
          />
          <button className="locationButton" type="button" onClick={this.search}>
            <img className="searchImg" src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'/>
          </button>
        </div>
      </div>
    )
  }
}

export default Search;