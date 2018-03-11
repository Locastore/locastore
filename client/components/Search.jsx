import React from 'react';
import { Route } from 'react-router-dom';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Alert } from 'reactstrap';
import '../styles/Search.css';

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      address: '',
      loading: false
    }
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  search(term) {
    this.props.onSearch(term);
  }

  onChange(term) {
    this.setState({ term });
  }

  handleSelect(term) {
    this.setState({
      term,
      loading: true
    });
    this.search(term);

  }

  render() {

    const inputProps = {
      value: this.state.term,
      onChange: this.onChange,
      placeholder: 'Where do you live?'
    }

    const cssClasses = {
      root: 'form-group',
      input: 'search-input',
      autocompleteContainer: 'autocomplete-container'
    }

    return (
      <div>
          <PlacesAutocomplete
            classNames={cssClasses}
            inputProps={inputProps}
            onEnterKeyDown={this.search}
            onSelect={this.handleSelect}

          />
          {this.state.loading && (
            <div className="spinner-container">
              <i className="fa fa-spinner fa-pulse fa-3x fa-fw spinner" />
            </div>
          )}
          {this.props.alertVisible && (
            <Alert
              align="center"
              color="danger"
              className="alert-box"
              isOpen={this.props.alertVisible}
              toggle={this.props.onDismiss}
            >
              Search term yielded no results
            </Alert>
          )}
      </div>
    )
  }
}

export default Search;