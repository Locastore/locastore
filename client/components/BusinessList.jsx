import React from 'react';
import BusinessListEntry from './BusinessListEntry.jsx';

class BusinessList extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.businesses.map((business, index) => {
        return (
          <BusinessListEntry handleDetail={this.props.handleDetail} key={index} business={business} />
        )
      })}
    </div>
  );
  }
}

export default BusinessList;