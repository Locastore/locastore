import React from 'react';
import BusinessListEntry from './BusinessListEntry.jsx';

class BusinessList extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let businesses = null;

    if (this.props.businesses.length === 0) {
      businesses = <NoBusinesses />;
    } else {
        businesses =
          this.props.businesses.map((business, index) => {
            return (
              <BusinessListEntry
                handleDetail={this.props.handleDetail}
                key={index}
                business={business}
                loginStatus={this.props.loginStatus}
                favorites={this.props.favorites}
                favorited={this.props.favorited}
              />
            )
          });
      }

    return (
      <div className="row">
        {businesses}
      </div>
  );
  }
}

// Barebones 0 results component, will add styling at a later point
function NoBusinesses(props) {
  return (
    <h4>Search term yielded 0 results</h4>
  )
}

export default BusinessList;