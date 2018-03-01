import React from 'react';
import { Route } from 'react-router-dom';
import '../styles/Search.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      address: ''
    }
    this.search = this.search.bind(this);
    this.onChange = (term) => this.setState({ term })
  }

  search(history) {
    this.props.onSearch(this.state.term, history);
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
        <Route render={({history}) => (
          <div>
            <PlacesAutocomplete
              classNames={inputClasses}
              onEnterKeyDown={() => this.search(history)}
              inputProps={inputProps}
            />
            <button className="locationButton" type="button" onClick={() => { this.search(history) }}>
              <img className="searchImg" src='https://d30y9cdsu7xlg0.cloudfront.net/png/5592-200.png'/>
            </button>
          </div>
        )}>
        </Route>
      </div>
    )
  }
}

export default Search;