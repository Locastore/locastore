import React from 'react';

class BusinessDetail extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Business Details</h1>
        <h2>{this.props.business.name}</h2>
        <h4>{this.props.business.phone}</h4>
        <h4>{this.props.business.address}</h4>
        {this.props.business.hours.map((openTime, index) =>
          <h4 key={index}>{openTime}</h4>
        )}
        <h4><a href={`http://${this.props.business.website}`}>{this.props.business.website}</a></h4>
      </div>
    );
  }
}

export default BusinessDetail;